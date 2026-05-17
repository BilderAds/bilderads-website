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
      className="relative overflow-hidden bg-black"
      pad="hero"
    >
      {/* Glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute top-1/2 left-1/2 -z-10 h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#3a0460]/40 blur-[160px]"
      />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="mx-auto flex max-w-3xl flex-col items-center text-center"
      >
        <h2 className="text-[32px] leading-[1.2] tracking-[-0.02em] font-semibold text-white tablet:text-[44px] tablet:leading-[1.15] tablet:tracking-[-0.025em] desktop:text-[60px] desktop:leading-[1.1] desktop:tracking-[-0.03em]">
          Bereit für neue Kunden?
        </h2>

        <p className="mt-6 max-w-2xl text-base text-[#a1a1aa] md:text-lg">
          30 Min Gespräch. Kein Verkaufsdruck. Wenn wir nicht passen, sagen
          wir's dir.
        </p>

        <a
          href="#analyse"
          className="mt-10 inline-flex items-center justify-center rounded-[12px] bg-[#3a0460] px-7 py-4 text-[15px] font-semibold tracking-tight text-white shadow-[0_10px_30px_-10px_rgba(58,4,96,0.95)] transition-all duration-200 hover:bg-[#52097f] hover:shadow-[0_14px_36px_-12px_rgba(82,9,127,0.95)] active:translate-y-[1px]"
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
