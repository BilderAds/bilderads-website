"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BrandButton } from "@/components/ui/brand-button";
import { cn } from "@/lib/utils";

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

const TIERS: Tier[] = [
  {
    name: "Gold",
    scarcity: "Nur noch 3 Plätze frei",
    pitch: "Jeden Monat mehr Kunden bekommen, ohne einen Finger zu rühren.",
    price: "3.000 €",
    unit: "/ Monat",
    ctaVariant: "primary",
    highlight: true,
    features: [
      {
        name: "Google Werbung",
        subItems: [
          "Google Search Ads",
          "40 Image Ads für Google",
        ],
      },
      {
        name: "Website",
        subItems: [
          "Design & Tests",
          "Kontaktformular & Anfragen Optimierung",
          "Mobile optimiert",
        ],
      },
      {
        name: "Google Business Profil Optimierung",
        subItems: [
          "Vollständige Profil-Optimierung",
          "Bewertungs-Management",
          "Lokale Suche im Umkreis",
        ],
      },
      {
        name: "Wöchentlicher Performance Bericht",
        subItems: ["Anfragen & Kosten im Überblick"],
      },
      {
        name: "Wöchentliche Update Meetings",
        subItems: ["30 Minuten Online-Besprechung"],
      },
    ],
  },
  {
    name: "Black Diamond",
    pitch: "Für Dienstleister die mehr Kunden wollen, ohne Risiko einzugehen.",
    price: "5.000 €",
    unit: "/ Monat",
    ctaVariant: "outline",
    highlight: false,
    features: [
      {
        name: "Google Werbung",
        subItems: ["Google Search Ads", "20 Image Ads für Google"],
      },
      {
        name: "Website",
        subItems: [
          "Design & Tests",
          "Kontaktformular & Anfragen Optimierung",
          "Mobile optimiert",
        ],
      },
      {
        name: "Facebook + Instagram Werbung",
        subItems: [
          "Setup der Meta-Werbung",
          "Erstellung der Werbeanzeigen",
          "Media-Buying der Werbeanzeigen",
          "Optimierung der Werbeanzeigen",
        ],
      },
      {
        name: "Google Business Profil Optimierung",
        subItems: [
          "Vollständige Profil-Optimierung",
          "Bewertungs-Management",
          "Lokale Suche im Umkreis",
        ],
      },
      {
        name: "Wöchentlicher Performance Bericht",
        subItems: ["Anfragen & Kosten im Überblick"],
      },
    ],
  },
];

export function Pricing() {
  return (
    <section
      id="preise"
      className="relative w-full overflow-hidden bg-black py-15 tablet:py-20 desktop:py-30"
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
          className="text-center text-[28px] leading-[1.3] tracking-[-0.015em] font-semibold text-white tablet:text-[36px] tablet:leading-[1.25] tablet:tracking-[-0.02em] desktop:text-[48px] desktop:leading-[1.2] desktop:tracking-[-0.025em]"
        >
          2 Wege, 1 Ziel
          <br />
          <span className="text-white/70">Mehr Kunden für dich</span>
        </motion.h2>

        <div className="mt-14 grid grid-cols-1 items-start gap-6 md:mt-16 md:grid-cols-2">
          {TIERS.map((tier) => (
            <TierCard key={tier.name} tier={tier} />
          ))}
        </div>
      </div>
    </section>
  );
}

function TierCard({ tier }: { tier: Tier }) {
  const [open, setOpen] = useState(false);

  return (
    <div
      className={cn(
        "relative flex flex-col rounded-[18px] p-7 md:p-8",
        tier.highlight
          ? "border-[1.5px] border-[#7c3aed]/60 bg-[#0e0220] shadow-[0_28px_80px_-32px_rgba(124,58,237,0.55)]"
          : "border border-white/10 bg-white/[0.02]",
      )}
    >
      {tier.scarcity ? (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-[#3a0460] px-3.5 py-1 text-[11px] font-semibold tracking-wide text-[#d6c2ff] ring-1 ring-[#7c3aed]/50">
          {tier.scarcity}
        </div>
      ) : null}

      <div className="text-[18px] font-semibold text-white">{tier.name}</div>
      <p className="mt-2 text-[13px] leading-snug text-white/55">
        {tier.pitch}
      </p>

      <div className="mt-7 flex items-baseline gap-2">
        <span className="text-[40px] font-bold tracking-tight text-[#a78bfa] md:text-[44px]">
          {tier.price}
        </span>
        <span className="text-[13px] text-white/55">{tier.unit}</span>
      </div>

      <ul className="mt-7 flex flex-col gap-4">
        {tier.features.map((f) => (
          <li key={f.name}>
            <div className="flex items-start gap-3">
              <CheckPill />
              <span className="text-[14px] font-semibold text-white">
                {f.name}
              </span>
            </div>
            <AnimatePresence initial={false}>
              {open ? (
                <motion.ul
                  key={`sub-${f.name}`}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{
                    height: { duration: 0.32, ease: [0.22, 1, 0.36, 1] },
                    opacity: { duration: 0.22, ease: "easeOut" },
                  }}
                  className="ml-8 overflow-hidden"
                >
                  <div className="mt-2 flex flex-col gap-1.5 pb-1">
                    {f.subItems.map((s) => (
                      <div
                        key={s}
                        className="flex items-start gap-2 text-[13px] leading-snug text-white/65"
                      >
                        <span
                          aria-hidden
                          className="mt-1.5 inline-block h-1 w-1 shrink-0 rounded-full bg-white/30"
                        />
                        <span>{s}</span>
                      </div>
                    ))}
                  </div>
                </motion.ul>
              ) : null}
            </AnimatePresence>
          </li>
        ))}
      </ul>

      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className="mt-7 inline-flex w-fit items-center gap-2 text-[12.5px] text-white/65 transition-colors hover:text-white"
      >
        <Chevron open={open} />
        {open ? "Alle Details ausblenden" : "Alle Details anzeigen"}
      </button>

      <div className="mt-6">
        <BrandButton
          href="#analyse"
          variant={tier.ctaVariant}
          size="md"
          className="w-full"
        >
          Jetzt kaufen
        </BrandButton>
      </div>
    </div>
  );
}

function CheckPill() {
  return (
    <span className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#3a0460]/60 ring-1 ring-[#7c3aed]/60">
      <svg
        viewBox="0 0 24 24"
        className="h-3 w-3 text-[#c4b5fd]"
        fill="none"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <polyline points="20 6 9 17 4 12" />
      </svg>
    </span>
  );
}

function Chevron({ open }: { open: boolean }) {
  return (
    <span
      aria-hidden
      className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-white/[0.06] ring-1 ring-white/10"
      style={{
        transition: "transform 200ms ease",
        transform: open ? "rotate(180deg)" : "rotate(0deg)",
      }}
    >
      <svg
        viewBox="0 0 24 24"
        className="h-3 w-3 text-white/75"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <polyline points="6 9 12 15 18 9" />
      </svg>
    </span>
  );
}
