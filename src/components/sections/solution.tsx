"use client";

import { motion } from "framer-motion";
import { Section } from "@/components/ui/section";
import { cn } from "@/lib/utils";

type Benefit = {
  number: string;
  title: string;
  description: string;
};

const BENEFITS: Benefit[] = [
  {
    number: "01",
    title: "Mehr zahlende Kunden",
    description: "Planbar neue Kunden jede Woche durch Google Ads.",
  },
  {
    number: "02",
    title: "#1 bei Google",
    description:
      "Sofort ganz oben bei Google durch optimierte Google Ads und Landing Page.",
  },
  {
    number: "03",
    title: "Bessere Aufträge",
    description: "Aufträge die sich lohnen. Mehr Marge, weniger Diskussionen.",
  },
];

/**
 * Solution section. Hate/Love-Contrast to Pain.
 * 3 benefit cards in one row on desktop, stack on mobile.
 * Purple eyebrow pill + massive headline + MagicBento-style cards.
 */
export function Solution() {
  return (
    <Section id="vorteile" className="bg-[#0a0a0a]">
      {/* Soft purple glow center */}
      <div
        aria-hidden
        className="pointer-events-none absolute top-1/3 left-1/2 -z-10 h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-[#7c3aed]/10 blur-[140px]"
      />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="mx-auto max-w-3xl text-center"
      >
        <span className="inline-flex items-center rounded-full border border-[#7c3aed]/30 bg-[#7c3aed]/10 px-3.5 py-1.5 text-xs font-medium tracking-wider text-[#c4b5fd] uppercase backdrop-blur-sm">
          BilderAds Vorteile
        </span>

        <h2 className="mt-6 text-3xl leading-[1.05] font-semibold tracking-tight text-white md:text-5xl">
          Das hier wirst du lieben:
        </h2>
      </motion.div>

      <div className="mt-14 grid grid-cols-1 gap-5 md:mt-20 md:grid-cols-3 lg:gap-6">
        {BENEFITS.map((entry, i) => (
          <motion.div
            key={entry.number}
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{
              duration: 0.55,
              ease: "easeOut",
              delay: i * 0.1,
            }}
          >
            <BenefitCard entry={entry} />
          </motion.div>
        ))}
      </div>
    </Section>
  );
}

function BenefitCard({ entry }: { entry: Benefit }) {
  return (
    <div
      className={cn(
        "group relative flex h-full flex-col rounded-2xl border border-white/10 bg-white/[0.02] p-8",
        "transition-all duration-300 ease-out",
        "hover:scale-[1.02] hover:border-[#7c3aed]/50 hover:bg-white/[0.04]",
        "hover:shadow-[0_24px_70px_-20px_rgba(124,58,237,0.55)]",
      )}
    >
      <div className="bg-gradient-to-br from-white via-[#e9d5ff] to-[#7c3aed] bg-clip-text text-[64px] leading-none font-bold tracking-tight text-transparent md:text-[72px]">
        {entry.number}
      </div>

      <div className="mt-6 h-px w-12 bg-white/15" />

      <h3 className="mt-6 text-[24px] leading-tight font-semibold tracking-tight text-white md:text-[28px]">
        {entry.title}
      </h3>

      <p className="mt-3 text-base leading-relaxed text-[#a1a1aa] md:text-[17px]">
        {entry.description}
      </p>
    </div>
  );
}
