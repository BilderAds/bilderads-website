"use client";

import { motion } from "framer-motion";
import { Section } from "@/components/ui/section";

/**
 * Footer-CTA section. Centered final call-to-action block above the actual
 * footer. id="kontakt" so anchors from other sections land here.
 */
export function FooterCTA() {
  return (
    <Section
      id="kontakt"
      className="relative overflow-hidden bg-[#0a0a0a]"
      pad="hero"
    >
      {/* Glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute top-1/2 left-1/2 -z-10 h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#7c3aed]/20 blur-[160px]"
      />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="mx-auto flex max-w-3xl flex-col items-center text-center"
      >
        <h2 className="text-4xl leading-[1.05] font-semibold tracking-tight text-white md:text-6xl">
          Bereit für neue Kunden?
        </h2>

        <p className="mt-6 max-w-2xl text-base text-[#a1a1aa] md:text-lg">
          30 Min Gespräch. Kein Verkaufsdruck. Wenn wir nicht passen, sagen
          wir's dir.
        </p>

        <a
          href="#kontakt"
          className="mt-10 inline-flex items-center justify-center rounded-full bg-[#7c3aed] px-9 py-5 text-lg font-semibold text-white shadow-[0_8px_30px_-8px_rgba(124,58,237,0.7)] transition-all duration-200 hover:scale-[1.03] hover:bg-[#8b5cf6] hover:shadow-[0_12px_40px_-8px_rgba(124,58,237,0.9)] md:text-xl"
        >
          Jetzt Gespräch buchen
        </a>

        <p className="mt-7 flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-sm text-[#a1a1aa] md:text-base">
          <span>Lieber schreiben?</span>
          <a
            href="mailto:info@bilderads.de"
            className="text-[#a78bfa] underline-offset-4 transition-colors hover:text-[#c4b5fd] hover:underline"
          >
            info@bilderads.de
          </a>
          <span aria-hidden className="text-[#71717a]">·</span>
          <span>WhatsApp +49 [Nummer]</span>
        </p>

        <p className="mt-10 max-w-xl text-sm leading-relaxed text-[#71717a] italic md:text-[15px]">
          Wenn wir nicht der richtige Partner sind, sagen wir's dir im Call.
          Und zeigen dir wer für dich besser passt.
        </p>
      </motion.div>
    </Section>
  );
}
