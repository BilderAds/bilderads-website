"use client";

import { motion } from "framer-motion";

const ROW_TOP = [
  "Schwankende Aufträge",
  "Werbung verbrennt Geld",
  "Personalmangel",
  "Neue Website unbezahlbar",
  "Schwankende Aufträge",
  "Werbung verbrennt Geld",
  "Personalmangel",
];

const ROW_BOTTOM = [
  "Selber Kunden suchen",
  "Keine guten Aufträge",
  "Nicht #1 bei Google",
  "Wenig Gewinn pro Auftrag",
  "Selber Kunden suchen",
  "Keine guten Aufträge",
  "Nicht #1 bei Google",
];

export function Pain() {
  return (
    <section
      id="pain"
      className="relative w-full overflow-hidden bg-black py-15 tablet:py-20 desktop:py-30"
    >
      {/* Headline stays inside max-width container */}
      <div className="mx-auto max-w-[1440px] px-5 tablet:px-10 desktop:px-20">
        <motion.h2
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.55, ease: "easeOut" }}
          className="text-center text-[28px] leading-[1.3] tracking-[-0.015em] font-semibold text-white tablet:text-[36px] tablet:leading-[1.25] tablet:tracking-[-0.02em] desktop:text-[48px] desktop:leading-[1.2] desktop:tracking-[-0.025em]"
        >
          Jeder Betrieb hasst es:
        </motion.h2>
      </div>

      {/* Marquees go full viewport width */}
      <div className="mt-12 flex w-full flex-col gap-4 md:mt-16 md:gap-5">
        <MarqueeRow items={ROW_TOP} direction="left" />
        <MarqueeRow items={ROW_BOTTOM} direction="right" />
      </div>

      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-black to-transparent md:w-40"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-black to-transparent md:w-40"
      />
    </section>
  );
}

function MarqueeRow({
  items,
  direction,
}: {
  items: string[];
  direction: "left" | "right";
}) {
  const doubled = [...items, ...items];
  return (
    <div className="relative w-full overflow-hidden">
      <div
        className={`marquee-track ${
          direction === "left" ? "marquee-anim-left" : "marquee-anim-right"
        }`}
      >
        {doubled.map((label, i) => (
          <PainPill key={`${label}-${i}`} label={label} />
        ))}
      </div>
    </div>
  );
}

function PainPill({ label }: { label: string }) {
  return (
    <div className="inline-flex shrink-0 items-center gap-3 rounded-full border border-white/10 bg-[#0a0a0a] px-5 py-3 ring-1 ring-white/5">
      <RedX />
      <span className="text-[15px] font-semibold tracking-tight text-white md:text-[16px]">
        {label}
      </span>
    </div>
  );
}

function RedX() {
  return (
    <span
      aria-hidden
      className="relative inline-flex h-5 w-5 items-center justify-center rounded-full bg-[#ef4444]/15 ring-1 ring-[#ef4444]/40"
    >
      <svg
        viewBox="0 0 24 24"
        className="h-3 w-3 text-[#ef4444]"
        fill="none"
        stroke="currentColor"
        strokeWidth="3.5"
        strokeLinecap="round"
      >
        <path d="M6 6 18 18 M18 6 6 18" />
      </svg>
    </span>
  );
}
