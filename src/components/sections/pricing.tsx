"use client";

import { useState } from "react";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import { useTranslations } from "next-intl";
import { BrandButton } from "@/components/ui/brand-button";
import { cn } from "@/lib/utils";
import { containerFast, fadeUpLg } from "@/lib/motion";

type Feature = {
  name: string;
  subItems: string[];
};

type Tier = {
  name: "Gold" | "Black Diamond";
  scarcity?: string;
  pitch: string;
  price: string;
  unit: string;
  features: Feature[];
  ctaVariant: "primary" | "outline";
  highlight: boolean;
};

export function Pricing() {
  const t = useTranslations("pricing");
  const TIERS: Tier[] = [
    {
      name: "Gold",
      scarcity: t("gold.scarcity"),
      pitch: t("gold.pitch"),
      price: t("gold.price"),
      unit: t("gold.unit"),
      features: t.raw("gold.features") as Feature[],
      ctaVariant: "primary",
      highlight: true,
    },
    {
      name: "Black Diamond",
      pitch: t("blackDiamond.pitch"),
      price: t("blackDiamond.price"),
      unit: t("blackDiamond.unit"),
      features: t.raw("blackDiamond.features") as Feature[],
      ctaVariant: "outline",
      highlight: false,
    },
  ];

  return (
    <section
      id="preise"
      className="relative w-full overflow-hidden bg-black py-12 tablet:py-16 desktop:py-20"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute top-1/3 left-1/2 h-[400px] w-[400px] -translate-x-1/2 rounded-full bg-[#3a0460]/30 blur-[150px]"
      />

      <div className="relative mx-auto w-full max-w-5xl px-5 tablet:px-10 desktop:px-20">
        <motion.h2
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.55, ease: "easeOut" }}
          className="text-center text-[24px] leading-[1.25] tracking-[-0.015em] font-semibold text-white tablet:text-[30px] desktop:text-[38px]"
        >
          {t("headlineTop")}
          <br />
          <span className="text-white/70">{t("headlineBottom")}</span>
        </motion.h2>

        <motion.div
          variants={containerFast}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="mt-10 grid grid-cols-1 items-start gap-5 md:mt-12 md:grid-cols-2"
        >
          {TIERS.map((tier) => (
            <motion.div key={tier.name} variants={fadeUpLg}>
              <TierCard tier={tier} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function TierCard({ tier }: { tier: Tier }) {
  const t = useTranslations("pricing");
  const [open, setOpen] = useState(false);

  return (
    <div className="relative pt-5">
      {tier.scarcity ? (
        <div className="absolute top-0 left-1/2 z-10 -translate-x-1/2">
          <span className="relative inline-flex items-center rounded-full border border-[#7c3aed]/60 bg-[#1a0235] px-4 py-1.5 text-[13px] font-medium text-white shadow-[0_8px_30px_-4px_rgba(124,58,237,0.6)]">
            {tier.scarcity}
          </span>
        </div>
      ) : null}

      <div
        className={cn(
          "relative flex flex-col rounded-[22px] p-6 md:p-7",
          tier.highlight
            ? "border-[1.5px] border-[#7c3aed]/45 bg-[#070012] shadow-[0_0_60px_-15px_rgba(124,58,237,0.5)]"
            : "border border-white/10 bg-white/[0.02]",
        )}
      >
        <div className="text-[22px] font-semibold tracking-tight text-white md:text-[24px]">
          {tier.name}
        </div>
        <p className="mt-2 text-[13.5px] leading-snug text-white/55">
          {tier.pitch}
        </p>

        <div className="mt-5 flex items-baseline gap-2">
          <span className="text-[36px] font-bold tracking-tight text-[#a78bfa] md:text-[44px]">
            {tier.price}
          </span>
          <span className="text-[13px] text-white/55">{tier.unit}</span>
        </div>

        <LayoutGroup>
          <motion.ul layout className="mt-6 flex flex-col gap-3">
            {tier.features.map((f) => (
              <motion.li layout key={f.name}>
                <motion.div layout="position" className="flex items-start gap-3">
                  <CheckMark />
                  <span className="text-[14px] font-bold text-white md:text-[15px]">
                    {f.name}
                  </span>
                </motion.div>
                <AnimatePresence initial={false}>
                  {open ? (
                    <motion.div
                      key={`sub-${f.name}`}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{
                        opacity: { duration: 0.2, ease: "easeOut", delay: open ? 0.08 : 0 },
                      }}
                      className="ml-9 overflow-hidden"
                    >
                      <motion.ul
                        initial={{ height: 0 }}
                        animate={{ height: "auto" }}
                        exit={{ height: 0 }}
                        transition={{ duration: 0.28, ease: [0.32, 0.72, 0, 1] }}
                        className="overflow-hidden"
                      >
                        <div className="mt-2 flex flex-col gap-1.5 pb-1">
                          {f.subItems.map((s) => (
                            <div
                              key={s}
                              className="flex items-start gap-2.5 text-[14px] leading-snug text-white/55"
                            >
                              <span
                                aria-hidden
                                className="mt-2 inline-block h-1 w-1 shrink-0 rounded-full bg-white/40"
                              />
                              <span>{s}</span>
                            </div>
                          ))}
                        </div>
                      </motion.ul>
                    </motion.div>
                  ) : null}
                </AnimatePresence>
              </motion.li>
            ))}
          </motion.ul>

          <motion.button
            layout="position"
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            className="mt-3 inline-flex min-h-[40px] w-fit items-center gap-2 text-[13px] text-white/65 transition-colors hover:text-white"
          >
            <span aria-hidden className="text-[15px]">👉</span>
            {open ? t("details.hide") : t("details.show")}
          </motion.button>

          <motion.div layout="position" className="mt-5">
            <BrandButton
              href="/funnel-start"
              variant={tier.ctaVariant}
              size="md"
              className="w-full"
            >
              {t("buyCta")}
            </BrandButton>
          </motion.div>
        </LayoutGroup>
      </div>
    </div>
  );
}

function CheckMark() {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden
      className="mt-1 h-4 w-4 shrink-0 text-[#a78bfa]"
      fill="none"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}
