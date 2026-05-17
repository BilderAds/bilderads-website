"use client";

import { motion } from "framer-motion";
import { Check, TriangleAlert } from "lucide-react";
import { Section } from "@/components/ui/section";

const FEATURES: string[] = [
  "Google Ads Management (Setup und laufende Optimierung)",
  "Landing Page für deine Stadt und Niche",
  "4-6 Anzeigen-Kreative pro Monat",
  "Tracking und Reporting",
  "Direkter Kontakt zu Kevin (WhatsApp und Call)",
];

/**
 * Pricing section. Single centered tier card. 3.000 €/Monat + 1.500 € Onboarding,
 * feature checklist, guarantee box, scarcity line, primary CTA.
 */
export function Pricing() {
  return (
    <Section id="preise" className="overflow-hidden bg-[#0a0a0a]">
      {/* Soft purple glow behind card */}
      <div
        aria-hidden
        className="pointer-events-none absolute top-1/2 left-1/2 -z-10 h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#7c3aed]/15 blur-[160px]"
      />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="mx-auto max-w-3xl text-center"
      >
        <h2 className="text-3xl leading-[1.05] font-semibold tracking-tight text-white md:text-5xl">
          Was kostet das?
        </h2>
        <p className="mt-5 text-base text-[#a1a1aa] md:text-lg">
          Ein Preis. Alles drin. Keine Überraschungen.
        </p>
      </motion.div>

      {/* Card */}
      <motion.div
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative mx-auto mt-16 w-full max-w-2xl md:mt-20"
      >
        {/* Glow halo */}
        <div
          aria-hidden
          className="pointer-events-none absolute -inset-6 -z-10 rounded-[32px] bg-gradient-to-br from-[#7c3aed]/30 via-[#6d28d9]/20 to-[#4c1d95]/30 opacity-60 blur-2xl"
        />

        <div className="relative rounded-2xl border border-[#7c3aed]/30 bg-white/[0.04] p-8 transition-all duration-300 hover:border-[#7c3aed]/60 md:p-12">
          {/* Tier label */}
          <div className="inline-flex items-center rounded-full border border-[#7c3aed]/30 bg-[#7c3aed]/10 px-3.5 py-1.5 text-xs font-medium tracking-wider text-[#c4b5fd] uppercase">
            BilderAds Standard
          </div>

          {/* Price */}
          <div className="mt-8 flex flex-wrap items-end gap-x-3 gap-y-1">
            <span className="text-[56px] leading-none font-semibold tracking-tight text-white md:text-[64px]">
              3.000 €
            </span>
            <span className="pb-2 text-lg text-[#a1a1aa] md:text-xl">
              / Monat
            </span>
          </div>
          <div className="mt-3 text-sm text-[#a1a1aa] md:text-base">
            + einmalig 1.500 € Onboarding
          </div>

          <div className="mt-8 h-px w-full bg-white/10" />

          {/* Features */}
          <div className="mt-8">
            <div className="text-xs font-medium tracking-wider text-[#71717a] uppercase">
              Enthalten
            </div>
            <ul className="mt-5 space-y-3.5">
              {FEATURES.map((feature) => (
                <li
                  key={feature}
                  className="flex items-start gap-3 text-[15px] leading-snug text-white md:text-base"
                >
                  <Check
                    className="mt-0.5 h-5 w-5 shrink-0 text-[#a78bfa]"
                    strokeWidth={2.5}
                  />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Garantie */}
          <div className="mt-8 rounded-xl border border-green-500/20 bg-green-500/5 p-5">
            <div className="text-xs font-medium tracking-wider text-green-400 uppercase">
              Garantie
            </div>
            <p className="mt-2 text-[15px] leading-snug font-medium text-white md:text-base">
              Nach 3 Monaten keine Anfragen?
            </p>
            <p className="mt-1 text-[15px] leading-snug text-[#a1a1aa] md:text-base">
              Wir arbeiten gratis weiter bis sie kommen.
            </p>
          </div>

          {/* Scarcity */}
          <div className="mt-5 flex items-center gap-2.5 rounded-xl border border-amber-500/30 bg-amber-500/5 px-4 py-3">
            <TriangleAlert
              className="h-4 w-4 shrink-0 text-amber-400"
              strokeWidth={2.5}
            />
            <span className="text-sm font-medium text-amber-200 md:text-[15px]">
              Nur noch 3 Plätze frei diesen Monat.
            </span>
          </div>

          {/* CTA */}
          <a
            href="#kontakt"
            className="mt-8 inline-flex w-full items-center justify-center rounded-full bg-[#7c3aed] px-7 py-4 text-base font-semibold text-white shadow-[0_8px_30px_-8px_rgba(124,58,237,0.7)] transition-all duration-200 hover:scale-[1.02] hover:bg-[#8b5cf6] hover:shadow-[0_12px_40px_-8px_rgba(124,58,237,0.9)] md:text-lg"
          >
            Jetzt Gespräch buchen
          </a>
        </div>
      </motion.div>
    </Section>
  );
}
