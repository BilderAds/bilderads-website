"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { BrandButton } from "@/components/ui/brand-button";

type Plan = "Gold" | "Black Diamond";

type CaseEntry = {
  branche: string;
  umsatz: string;
  zeitraum: string;
  detail?: string;
  roas: string;
  service: string;
  plan: Plan;
  image: string;
};

const CASES: CaseEntry[] = [
  {
    branche: "Abflussreinigung",
    umsatz: "1.800.000 €",
    zeitraum: "Umsatz",
    detail: "262.000 € investiert",
    roas: "6,9x ROAS",
    service: "Dienstleistung",
    plan: "Gold",
    image: "/testimonials/google-ads-abflussreinigung-1-8mio-umsatz.webp",
  },
  {
    branche: "Gebäudereinigung",
    umsatz: "295.598 €",
    zeitraum: "in 3 Jahren",
    roas: "5,2x ROAS",
    service: "Dienstleistung",
    plan: "Gold",
    image: "/testimonials/google-ads-gebaeudereinigung-koeln-295k-umsatz.webp",
  },
  {
    branche: "Schmuck",
    umsatz: "407.758 €",
    zeitraum: "in 10 Monaten",
    roas: "8,8x ROAS",
    service: "Google Ads",
    plan: "Black Diamond",
    image: "/testimonials/google-ads-schmuck-shop-407k-umsatz.webp",
  },
  {
    branche: "Uhren",
    umsatz: "123.088 €",
    zeitraum: "in 3 Monaten",
    roas: "9,2x ROAS",
    service: "Google Ads",
    plan: "Black Diamond",
    image: "/testimonials/google-ads-uhren-shop-123k-umsatz.webp",
  },
  {
    branche: "Supplements",
    umsatz: "140.809 €",
    zeitraum: "11,71 € pro Kunde",
    roas: "3,2x ROAS",
    service: "Google Ads",
    plan: "Black Diamond",
    image: "/testimonials/google-ads-supplement-shop-140k-umsatz.webp",
  },
];

const NICHE_SETS: string[][] = [
  ["Malerbetrieb", "Elektriker", "Glaserei", "Entrümpelung"],
  ["Gebäudereinigung", "Sanitär", "Schlüsseldienst", "Ungezieferbekämpfung"],
  ["Dachdecker", "Heizungsbau", "Fliesenleger", "Garten & Landschaft"],
  ["Tischler", "Bodenleger", "Maurer", "Trockenbau"],
];

export function Cases() {
  return (
    <section
      id="ergebnisse"
      className="relative w-full overflow-hidden bg-black py-15 tablet:py-20 desktop:py-30"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute top-0 left-1/2 h-[460px] w-[460px] -translate-x-1/2 rounded-full bg-[#3a0460]/40 blur-[140px]"
      />

      <div className="relative mx-auto w-full max-w-[1440px] px-5 tablet:px-10 desktop:px-20">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.55, ease: "easeOut" }}
          className="mx-auto max-w-3xl text-center"
        >
          <h2 className="text-[28px] leading-[1.3] tracking-[-0.015em] font-semibold text-white tablet:text-[36px] tablet:leading-[1.25] tablet:tracking-[-0.02em] desktop:text-[48px] desktop:leading-[1.2] desktop:tracking-[-0.025em]">
            2.300.000 €+ Umsatz
            <br />
            <span className="text-white/70">
              für Lokale Dienstleister wie dich
            </span>
          </h2>

        </motion.div>

        <NicheRow />

        <div className="mt-12 grid grid-cols-1 gap-5 md:mt-16 md:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          {CASES.map((entry, i) => (
            <motion.div
              key={entry.image}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, ease: "easeOut", delay: i * 0.07 }}
            >
              <CaseCard entry={entry} />
            </motion.div>
          ))}
        </div>

        <div className="mt-12 flex justify-center">
          <BrandButton href="#analyse" size="md">
            Jetzt mehr Kunden bekommen
          </BrandButton>
        </div>
      </div>
    </section>
  );
}

function NicheRow() {
  const [setIdx, setSetIdx] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setSetIdx((n) => (n + 1) % NICHE_SETS.length);
    }, 2400);
    return () => clearInterval(id);
  }, []);

  const niches = NICHE_SETS[setIdx];

  return (
    <div className="mt-10 grid grid-cols-2 gap-x-4 gap-y-3 tablet:mt-12 tablet:grid-cols-4 tablet:gap-x-6 desktop:mt-14 desktop:gap-x-10">
      {niches.map((niche, i) => (
        <div
          key={i}
          className="relative flex h-7 items-center justify-center overflow-hidden tablet:h-9 desktop:h-11"
        >
          <AnimatePresence mode="wait">
            <motion.span
              key={`${setIdx}-${niche}`}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -14 }}
              transition={{
                duration: 0.45,
                ease: "easeOut",
                delay: i * 0.04,
              }}
              className="absolute text-[15px] font-semibold tracking-tight text-white/85 tablet:text-[18px] desktop:text-[22px]"
            >
              {niche}
            </motion.span>
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
}

function CaseCard({ entry }: { entry: CaseEntry }) {
  return (
    <div className="group relative flex h-full flex-col overflow-hidden rounded-[18px] border border-white/10 bg-white/[0.02] p-5 transition-all duration-300 hover:border-white/20 hover:bg-white/[0.04] hover:shadow-[0_24px_70px_-22px_rgba(124,58,237,0.45)]">
      {/* Headline */}
      <div className="flex items-baseline gap-2">
        <div className="text-[26px] font-bold tracking-tight text-white md:text-[30px]">
          {entry.umsatz}
        </div>
        <span className="text-[13px] text-[#a78bfa]">Umsatz →</span>
      </div>
      <div className="mt-1 text-[12.5px] text-white/55">
        {entry.detail ?? entry.zeitraum}
      </div>

      {/* Real Google Ads dashboard screenshot */}
      <div className="mt-4 overflow-hidden rounded-xl bg-white ring-1 ring-white/10">
        <Image
          src={entry.image}
          alt={`Google Ads Dashboard ${entry.branche} ${entry.umsatz}`}
          width={1200}
          height={620}
          className="block h-auto w-full"
          sizes="(max-width: 768px) 90vw, (max-width: 1200px) 45vw, 380px"
        />
      </div>

      {/* Stats */}
      <div className="mt-4 flex items-center gap-2">
        <Pill>{entry.roas}</Pill>
        <Pill>{entry.service}</Pill>
      </div>

      {/* Plan */}
      <div className="mt-4">
        <PlanTag plan={entry.plan} />
      </div>
    </div>
  );
}

function Pill({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full bg-white/[0.05] px-3 py-1 text-[11px] font-medium text-white/75 ring-1 ring-white/10">
      {children}
    </span>
  );
}

function PlanTag({ plan }: { plan: Plan }) {
  if (plan === "Black Diamond") {
    return (
      <span className="inline-flex w-full items-center justify-center rounded-[11px] border border-white/10 bg-gradient-to-r from-[#3a0460] via-[#7c3aed] to-[#3a0460] px-4 py-2.5 text-[12px] font-semibold tracking-wide text-white shadow-[0_4px_20px_-6px_rgba(124,58,237,0.6)]">
        Plan 3: Black Diamond
      </span>
    );
  }
  return (
    <span className="inline-flex w-full items-center justify-center rounded-[11px] border border-[#7c3aed]/40 bg-[#3a0460]/40 px-4 py-2.5 text-[12px] font-semibold tracking-wide text-[#d6c2ff]">
      Plan 1: Gold
    </span>
  );
}
