import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { LegalShell } from "@/components/sections/legal-shell";
import blocks from "@/lib/datenschutz-content.json";
import type { Locale } from "@/i18n/routing";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (locale === "en") {
    return {
      title: "Privacy Policy | BilderAds",
      description:
        "Privacy policy for BilderAds — information about how we process personal data.",
    };
  }
  return {
    title: "Datenschutz | BilderAds",
    description:
      "Datenschutzerklärung der BilderAds — Informationen zur Verarbeitung personenbezogener Daten.",
  };
}

type Block = { tag: string; text: string };

const LAST_UPDATED_DE = "01. Dezember 2025";
const LAST_UPDATED_EN = "December 01, 2025";

export default async function DatenschutzPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  if (locale === "en") {
    return <PrivacyEN />;
  }
  return <DatenschutzDE />;
}

function DatenschutzDE() {
  const data = blocks as Block[];
  return (
    <LegalShell
      title="Datenschutz"
      kicker="Sichere Daten bei uns"
      updated={LAST_UPDATED_DE}
    >
      {data.map((b, i) => {
        if (b.tag === "H1") return null;
        if (b.text.startsWith("Zuletzt aktualisiert")) return null;
        if (b.tag === "H2") {
          if (/^[a-z]\)\s/.test(b.text)) return <h3 key={i}>{b.text}</h3>;
          return <h2 key={i}>{b.text}</h2>;
        }
        if (b.tag === "H3" || b.tag === "H4") return <h3 key={i}>{b.text}</h3>;
        return <p key={i}>{b.text}</p>;
      })}
    </LegalShell>
  );
}

function PrivacyEN() {
  return (
    <LegalShell
      title="Privacy Policy"
      kicker="Your data is safe with us"
      updated={LAST_UPDATED_EN}
    >
      <p>
        <em>
          Note: BilderAds is a German business operating under the GDPR and German
          data protection law (BDSG). The legally binding privacy policy is the
          German version available at{" "}
          <a href="/datenschutz">bilderads.de/datenschutz</a>. This English
          summary is provided for your convenience.
        </em>
      </p>

      <h2>1. Controller</h2>
      <p>
        BilderAds
        <br />
        Kevin Zahn
        <br />
        An der Glasfachschule 44
        <br />
        53359 Rheinbach
        <br />
        Germany
        <br />
        Email: <a href="mailto:info@bilderads.de">info@bilderads.de</a>
      </p>

      <h2>2. What data we collect</h2>
      <p>
        When you use this website, we may process the following personal data:
      </p>
      <ul>
        <li>
          <strong>Form submissions:</strong> name, email, phone, company,
          website URL, and your answers to the questions in our funnel. Used to
          prepare your free analysis and respond to your request.
        </li>
        <li>
          <strong>Booking data:</strong> when you book a call via Calendly, your
          name, email, and selected time are stored by Calendly (a US service)
          and synced to our calendar.
        </li>
        <li>
          <strong>Server log data:</strong> IP address, browser type, referring
          page, and timestamp. Stored for up to 30 days for security and to
          troubleshoot technical issues.
        </li>
      </ul>

      <h2>3. Legal basis</h2>
      <p>
        We process your data based on Art. 6 (1)(b) GDPR (steps prior to
        entering into a contract you requested) and Art. 6 (1)(f) GDPR
        (legitimate interest in running and securing this website).
      </p>

      <h2>4. Third-party services we use</h2>
      <ul>
        <li>
          <strong>Vercel</strong> — website hosting (data may be processed in
          the EU and the US).
        </li>
        <li>
          <strong>Airtable</strong> — CRM where your form data is stored (US,
          processed under Standard Contractual Clauses).
        </li>
        <li>
          <strong>Calendly</strong> — appointment booking (US, processed under
          Standard Contractual Clauses).
        </li>
        <li>
          <strong>Google Fonts</strong> — fonts served via{" "}
          <code>next/font</code>, self-hosted at build time, no data is sent to
          Google.
        </li>
      </ul>

      <h2>5. Your rights</h2>
      <p>Under the GDPR you have the right to:</p>
      <ul>
        <li>access the data we hold about you (Art. 15 GDPR)</li>
        <li>have inaccurate data corrected (Art. 16 GDPR)</li>
        <li>have your data deleted (Art. 17 GDPR)</li>
        <li>restrict the processing of your data (Art. 18 GDPR)</li>
        <li>data portability (Art. 20 GDPR)</li>
        <li>object to processing (Art. 21 GDPR)</li>
        <li>
          file a complaint with a data protection authority (Art. 77 GDPR)
        </li>
      </ul>
      <p>
        To exercise any of these rights, please email us at{" "}
        <a href="mailto:info@bilderads.de">info@bilderads.de</a>.
      </p>

      <h2>6. Data retention</h2>
      <p>
        Form submissions are kept as long as needed to handle your request and
        for legal record-keeping (in Germany up to 6-10 years for business
        communications). Server logs are deleted after 30 days.
      </p>

      <h2>7. Cookies</h2>
      <p>
        This website does not use any tracking cookies. Only strictly necessary
        cookies (for example, for the locale switch) are stored on your device.
      </p>

      <h2>8. Changes to this policy</h2>
      <p>
        We may update this policy from time to time. The most current version
        with the German legal binding is always at{" "}
        <a href="/datenschutz">bilderads.de/datenschutz</a>.
      </p>
    </LegalShell>
  );
}
