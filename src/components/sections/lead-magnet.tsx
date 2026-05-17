"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Check, CircleCheckBig } from "lucide-react";
import { Section } from "@/components/ui/section";
import { cn } from "@/lib/utils";

const BENEFITS: string[] = [
  "Audit deiner aktuellen Website (was hält Kunden ab?)",
  "Check deiner Google Ads (verbrennst du Geld?)",
  "3 konkrete Hebel die sofort mehr Anfragen bringen",
  "Schriftlicher Report per E-Mail",
];

const BRANCHEN = [
  "Gebäudereinigung",
  "Schlüsseldienst",
  "Sanitär",
  "Entrümpelung",
  "Glaserei",
  "Elektriker",
  "Ungezieferbekämpfung",
  "Andere",
] as const;

const schema = z.object({
  firma: z.string().min(1, "Firmenname fehlt."),
  website: z
    .string()
    .min(1, "Website fehlt.")
    .url("Gib eine gültige URL ein (z.B. https://beispiel.de)."),
  email: z
    .string()
    .min(1, "E-Mail fehlt.")
    .email("Gib eine gültige E-Mail ein."),
  branche: z.enum(BRANCHEN, {
    error: "Wähle eine Branche.",
  }),
});

type FormValues = z.infer<typeof schema>;

/**
 * Lead-Magnet section. 2-column on desktop. Left: copy + benefits.
 * Right: form (react-hook-form + zod). Submit logs to console + shows
 * success state. Wire to backend later.
 */
export function LeadMagnet() {
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormValues) => {
    // eslint-disable-next-line no-console
    console.log("Marketing-Analyse Anfrage:", data);
    await new Promise((r) => setTimeout(r, 400));
    setSubmitted(true);
  };

  return (
    <Section id="analyse" className="bg-[#0a0a0a]">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="mx-auto max-w-3xl text-center"
      >
        <h2 className="text-3xl leading-[1.05] font-semibold tracking-tight text-white md:text-5xl">
          Lieber erst mal gucken?
        </h2>
        <p className="mt-5 text-base text-[#a1a1aa] md:text-lg">
          Wir analysieren deine Website und deine Google Ads. Kostenlos. 0
          Verpflichtung.
        </p>
      </motion.div>

      <div className="mt-14 grid grid-cols-1 items-start gap-10 md:mt-20 md:grid-cols-2 md:gap-14">
        {/* Left: copy */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.55, ease: "easeOut" }}
        >
          <div className="inline-flex items-center rounded-full border border-[#7c3aed]/30 bg-[#7c3aed]/10 px-3.5 py-1.5 text-xs font-medium tracking-wider text-[#c4b5fd] uppercase">
            Kostenlose Marketing-Analyse
          </div>

          <h3 className="mt-6 text-2xl font-semibold tracking-tight text-white md:text-3xl">
            Du bekommst:
          </h3>

          <ul className="mt-6 space-y-3.5">
            {BENEFITS.map((b) => (
              <li
                key={b}
                className="flex items-start gap-3 text-[15px] leading-snug text-white md:text-base"
              >
                <Check
                  className="mt-0.5 h-5 w-5 shrink-0 text-[#a78bfa]"
                  strokeWidth={2.5}
                />
                <span>{b}</span>
              </li>
            ))}
          </ul>

          <div className="mt-8 grid grid-cols-3 gap-3 md:gap-4">
            <Tile label="Dauer" value="48h" />
            <Tile label="Kosten" value="0 €" />
            <Tile label="Verkaufsdruck" value="0" />
          </div>
        </motion.div>

        {/* Right: form */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.55, ease: "easeOut", delay: 0.1 }}
          className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 md:p-8"
        >
          {submitted ? (
            <SuccessState />
          ) : (
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col gap-4"
              noValidate
            >
              <Field
                label="Firmenname"
                error={errors.firma?.message}
                input={
                  <input
                    type="text"
                    placeholder="Mustermann GmbH"
                    autoComplete="organization"
                    {...register("firma")}
                    className={inputClass(!!errors.firma)}
                  />
                }
              />

              <Field
                label="Website"
                error={errors.website?.message}
                input={
                  <input
                    type="url"
                    placeholder="https://deine-firma.de"
                    autoComplete="url"
                    {...register("website")}
                    className={inputClass(!!errors.website)}
                  />
                }
              />

              <Field
                label="E-Mail"
                error={errors.email?.message}
                input={
                  <input
                    type="email"
                    placeholder="du@deine-firma.de"
                    autoComplete="email"
                    {...register("email")}
                    className={inputClass(!!errors.email)}
                  />
                }
              />

              <Field
                label="Branche"
                error={errors.branche?.message}
                input={
                  <select
                    defaultValue=""
                    {...register("branche")}
                    className={cn(
                      inputClass(!!errors.branche),
                      "appearance-none bg-[length:16px] bg-[right_1rem_center] bg-no-repeat pr-10",
                    )}
                    style={{
                      backgroundImage:
                        "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%23a1a1aa' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><polyline points='6 9 12 15 18 9'/></svg>\")",
                    }}
                  >
                    <option value="" disabled>
                      Bitte wählen
                    </option>
                    {BRANCHEN.map((b) => (
                      <option key={b} value={b} className="bg-[#0a0a0a]">
                        {b}
                      </option>
                    ))}
                  </select>
                }
              />

              <button
                type="submit"
                disabled={isSubmitting}
                className="mt-2 inline-flex w-full items-center justify-center rounded-full bg-[#7c3aed] px-7 py-4 text-base font-semibold text-white shadow-[0_8px_30px_-8px_rgba(124,58,237,0.7)] transition-all duration-200 hover:scale-[1.02] hover:bg-[#8b5cf6] hover:shadow-[0_12px_40px_-8px_rgba(124,58,237,0.9)] disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:scale-100"
              >
                {isSubmitting ? "Wird gesendet..." : "Analyse anfordern"}
              </button>

              <p className="text-center text-xs text-[#71717a]">
                Antwort innerhalb von 48h. Keine Newsletter, kein Spam.
              </p>
            </form>
          )}
        </motion.div>
      </div>
    </Section>
  );
}

function inputClass(hasError: boolean) {
  return cn(
    "w-full rounded-lg border bg-white/[0.02] px-4 py-3 text-[15px] text-white placeholder:text-[#52525b]",
    "outline-none transition-all",
    hasError
      ? "border-red-500/60 focus:border-red-500"
      : "border-white/10 focus:border-[#7c3aed]/60 focus:bg-white/[0.04]",
  );
}

function Field({
  label,
  error,
  input,
}: {
  label: string;
  error?: string;
  input: React.ReactNode;
}) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-xs font-medium tracking-wide text-[#a1a1aa] uppercase">
        {label}
      </span>
      {input}
      {error && (
        <span className="text-xs text-red-400">{error}</span>
      )}
    </label>
  );
}

function Tile({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/[0.02] p-3 text-center md:p-4">
      <div className="text-[10px] font-medium tracking-wider text-[#71717a] uppercase">
        {label}
      </div>
      <div className="mt-1 text-lg font-semibold text-white md:text-xl">
        {value}
      </div>
    </div>
  );
}

function SuccessState() {
  return (
    <div className="flex flex-col items-center justify-center py-6 text-center md:py-10">
      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-green-500/15 ring-1 ring-green-500/30">
        <CircleCheckBig
          className="h-7 w-7 text-green-400"
          strokeWidth={2.2}
        />
      </div>
      <h3 className="mt-5 text-2xl font-semibold tracking-tight text-white">
        Danke!
      </h3>
      <p className="mt-3 max-w-sm text-[15px] leading-relaxed text-[#a1a1aa] md:text-base">
        Wir melden uns innerhalb von 48h bei dir mit deiner persönlichen
        Marketing-Analyse.
      </p>
    </div>
  );
}
