import { NextResponse } from "next/server";
import { z } from "zod";
import {
  AIRTABLE_BASE_ID,
  AIRTABLE_LEADS_TABLE_ID,
  CONTACT_FIELD_IDS,
  FUNNEL_STEPS,
} from "@/lib/funnel-config";

const payloadSchema = z.object({
  answers: z.record(z.string(), z.string()),
  contact: z.object({
    name: z.string().min(2),
    firstname: z.string().min(1),
    lastname: z.string().optional().default(""),
    email: z.string().email(),
    website: z.string().url(),
  }),
});

export async function POST(req: Request) {
  const token = process.env.AIRTABLE_PAT;

  let parsed;
  try {
    const body = await req.json();
    parsed = payloadSchema.parse(body);
  } catch {
    return NextResponse.json(
      { error: "Ungültige Daten." },
      { status: 400 },
    );
  }

  const { answers, contact } = parsed;

  const fields: Record<string, string> = {
    [CONTACT_FIELD_IDS.fullName]: contact.name,
    [CONTACT_FIELD_IDS.firstname]: contact.firstname,
    [CONTACT_FIELD_IDS.lastname]: contact.lastname,
    [CONTACT_FIELD_IDS.email]: contact.email,
    [CONTACT_FIELD_IDS.website]: contact.website,
  };

  for (const step of FUNNEL_STEPS) {
    const value = answers[step.id];
    if (value) fields[step.fieldId] = value;
  }

  if (!token) {
    console.warn("[api/lead] AIRTABLE_PAT missing — logging payload only", {
      fields,
      contact,
    });
    return NextResponse.json({ ok: true, mock: true });
  }

  const airtableRes = await fetch(
    `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${AIRTABLE_LEADS_TABLE_ID}`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "content-type": "application/json",
      },
      body: JSON.stringify({
        records: [{ fields }],
        typecast: true,
      }),
    },
  );

  if (!airtableRes.ok) {
    const text = await airtableRes.text();
    console.error("[api/lead] airtable error", airtableRes.status, text);
    return NextResponse.json(
      { error: "Konnte Lead nicht speichern." },
      { status: 502 },
    );
  }

  const json = await airtableRes.json();
  return NextResponse.json({ ok: true, id: json.records?.[0]?.id });
}
