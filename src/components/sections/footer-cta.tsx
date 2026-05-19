"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Section } from "@/components/ui/section";
import { container, fadeUp, fadeUpLg } from "@/lib/motion";

/**
 * Footer-CTA section. Centered final call-to-action block above the actual
 * footer. id="kontakt" so anchors from other sections land here.
 */
export function FooterCTA() {
  const t = useTranslations("footerCta");
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
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-100px" }}
        className="mx-auto flex max-w-3xl flex-col items-center text-center"
      >
        <motion.h2
          variants={fadeUpLg}
          className="text-[32px] leading-[1.2] tracking-[-0.02em] font-semibold text-white tablet:text-[44px] tablet:leading-[1.15] tablet:tracking-[-0.025em] desktop:text-[60px] desktop:leading-[1.1] desktop:tracking-[-0.03em]"
        >
          {t("headline")}
        </motion.h2>

        <motion.p
          variants={fadeUp}
          className="mt-6 max-w-2xl text-base text-[#a1a1aa] md:text-lg"
        >
          {t("subline")}
        </motion.p>

        <motion.a
          variants={fadeUp}
          href="/funnel-start"
          className="mt-10 inline-flex items-center justify-center rounded-[12px] bg-[#3a0560] px-7 py-4 text-[15px] font-semibold tracking-tight text-white ring-1 ring-[#b554fa]/60 shadow-[0_10px_30px_-10px_rgba(58,5,96,0.95)] transition-all duration-200 hover:bg-[#4d0a7c] hover:ring-[#b554fa] hover:shadow-[0_14px_36px_-12px_rgba(181,84,250,0.6)] active:translate-y-[1px]"
        >
          {t("cta")}
        </motion.a>

        <motion.p
          variants={fadeUp}
          className="mt-7 flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-sm text-[#a1a1aa] md:text-base"
        >
          <span>{t("writeUs")}</span>
          <a
            href="mailto:info@bilderads.de"
            className="text-[#a78bfa] underline-offset-4 transition-colors hover:text-[#c4b5fd] hover:underline"
          >
            info@bilderads.de
          </a>
          <span aria-hidden className="text-[#71717a]">·</span>
          <span>{t("whatsapp")}</span>
        </motion.p>

        <motion.p
          variants={fadeUp}
          className="mt-10 max-w-xl text-sm leading-relaxed text-[#71717a] italic md:text-[15px]"
        >
          {t("footnote")}
        </motion.p>
      </motion.div>
    </Section>
  );
}
