"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";
import { BrandButton } from "@/components/ui/brand-button";

type LightboxState = {
  src: string;
  alt: string;
} | null;

type Plan = "Gold" | "Black Diamond";

type CaseEntry = {
  itemKey: "abfluss" | "gebaeude" | "schmuck" | "uhren" | "supplements" | "lenvia";
  roas: string;
  plan: Plan;
  image: string;
  siteUrl?: string;
};

const CASES: CaseEntry[] = [
  {
    itemKey: "abfluss",
    roas: "6,9x ROAS",
    plan: "Gold",
    image: "/testimonials/google-ads-abflussreinigung-1-8mio-umsatz.webp",
    siteUrl: "https://schnellerabfluss.de/",
  },
  {
    itemKey: "gebaeude",
    roas: "5,2x ROAS",
    plan: "Gold",
    image: "/testimonials/google-ads-gebaeudereinigung-koeln-295k-umsatz.webp",
  },
  {
    itemKey: "schmuck",
    roas: "8,8x ROAS",
    plan: "Black Diamond",
    image: "/testimonials/google-ads-schmuck-shop-407k-umsatz.webp",
    siteUrl: "https://kolure.de/",
  },
  {
    itemKey: "uhren",
    roas: "9,2x ROAS",
    plan: "Black Diamond",
    image: "/testimonials/google-ads-uhren-shop-123k-umsatz.webp",
  },
  {
    itemKey: "supplements",
    roas: "3,2x ROAS",
    plan: "Black Diamond",
    image: "/testimonials/google-ads-supplement-shop-140k-umsatz.webp",
    siteUrl: "https://mindabolics.com/",
  },
  {
    itemKey: "lenvia",
    roas: "4,3x ROAS",
    plan: "Black Diamond",
    image: "/testimonials/google-ads-wellness-shop-26k-umsatz.webp",
    siteUrl: "https://lenvia.de/",
  },
];

export function Cases() {
  const t = useTranslations("cases");
  const NICHE_SETS = [
    t.raw("niches.set1") as string[],
    t.raw("niches.set2") as string[],
    t.raw("niches.set3") as string[],
    t.raw("niches.set4") as string[],
  ];
  const [lightbox, setLightbox] = useState<LightboxState>(null);

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
          <h2 className="text-[21px] leading-[1.3] tracking-[-0.015em] font-semibold text-white tablet:text-[36px] tablet:leading-[1.25] tablet:tracking-[-0.02em] desktop:text-[48px] desktop:leading-[1.2] desktop:tracking-[-0.025em]">
            {t("headlineTop")}
            <br />
            <span className="text-white/70">{t("headlineBottom")}</span>
          </h2>

        </motion.div>

        <NicheRow sets={NICHE_SETS} />

        <div className="mt-12 grid grid-cols-1 gap-5 md:mt-16 md:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          {CASES.map((entry, i) => (
            <motion.div
              key={entry.image}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, ease: "easeOut", delay: i * 0.07 }}
            >
              <CaseCard entry={entry} onImageClick={() => setLightbox({ src: entry.image, alt: `Google Ads Dashboard ${t(`items.${entry.itemKey}.branche`)} ${t(`items.${entry.itemKey}.umsatz`)}` })} />
            </motion.div>
          ))}
        </div>

        <div className="mt-12 flex justify-center">
          <BrandButton href="/funnel-start" size="md">
            {t("cta")}
          </BrandButton>
        </div>
      </div>

      <Lightbox state={lightbox} onClose={() => setLightbox(null)} />
    </section>
  );
}

function Lightbox({ state, onClose }: { state: LightboxState; onClose: () => void }) {
  useEffect(() => {
    if (!state) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [state, onClose]);

  return (
    <AnimatePresence>
      {state ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          role="dialog"
          aria-modal="true"
          onClick={onClose}
          className="fixed inset-0 z-[80] flex items-center justify-center bg-black/90 p-4 backdrop-blur tablet:p-8"
        >
          <motion.div
            initial={{ scale: 0.96, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.96, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            onClick={(e) => e.stopPropagation()}
            className="relative max-h-[92vh] w-full max-w-5xl overflow-hidden rounded-2xl bg-white shadow-2xl ring-1 ring-white/10"
          >
            <button
              type="button"
              onClick={onClose}
              aria-label="Schließen"
              className="absolute top-3 right-3 z-10 inline-flex h-9 w-9 items-center justify-center rounded-full bg-black/70 text-white ring-1 ring-white/15 backdrop-blur transition-colors hover:bg-black/90"
            >
              ×
            </button>
            <Image
              src={state.src}
              alt={state.alt}
              width={1800}
              height={950}
              className="block h-auto w-full"
              sizes="100vw"
              priority
            />
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

function NicheSlot({ cycleKey, niche, i }: { cycleKey: number; niche: string; i: number }) {
  return (
    <div className="relative flex h-7 items-center justify-center overflow-hidden tablet:h-9 desktop:h-11">
      <AnimatePresence mode="wait">
        <motion.span
          key={`${cycleKey}-${niche}`}
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -14 }}
          transition={{ duration: 0.45, ease: "easeOut", delay: i * 0.04 }}
          className="absolute text-[15px] font-semibold tracking-tight text-white/85 tablet:text-[18px] desktop:text-[22px]"
        >
          {niche}
        </motion.span>
      </AnimatePresence>
    </div>
  );
}

function NicheRow({ sets }: { sets: string[][] }) {
  const all = sets.flat();
  const pairs: string[][] = [];
  for (let i = 0; i < all.length; i += 2) pairs.push(all.slice(i, i + 2));

  const [setIdx, setSetIdx] = useState(0);
  const [pairIdx, setPairIdx] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setSetIdx((n) => (n + 1) % sets.length);
      setPairIdx((n) => (n + 1) % pairs.length);
    }, 2400);
    return () => clearInterval(id);
  }, [sets.length, pairs.length]);

  return (
    <>
      {/* Mobile: 1 Reihe, 2 Nischen die durch alle wechseln */}
      <div className="mt-10 grid grid-cols-2 gap-x-4 tablet:hidden">
        {pairs[pairIdx].map((niche, i) => (
          <NicheSlot key={i} cycleKey={pairIdx} niche={niche} i={i} />
        ))}
      </div>
      {/* Desktop: 4 Nischen in einer Reihe */}
      <div className="mt-12 hidden grid-cols-4 gap-x-6 tablet:grid desktop:mt-14 desktop:gap-x-10">
        {sets[setIdx].map((niche, i) => (
          <NicheSlot key={i} cycleKey={setIdx} niche={niche} i={i} />
        ))}
      </div>
    </>
  );
}

function CaseCard({ entry, onImageClick }: { entry: CaseEntry; onImageClick: () => void }) {
  const t = useTranslations("cases");
  const branche = t(`items.${entry.itemKey}.branche`);
  const umsatz = t(`items.${entry.itemKey}.umsatz`);
  const umsatzSuffix = t(`items.${entry.itemKey}.zeitraum`);
  const detail = t.has(`items.${entry.itemKey}.detail`)
    ? t(`items.${entry.itemKey}.detail`)
    : null;
  const service = t(`items.${entry.itemKey}.service`);

  return (
    <div className="group relative flex h-full flex-col overflow-hidden rounded-[20px] border border-white/10 bg-white/[0.015] p-6 transition-all duration-300 hover:border-white/20 hover:bg-white/[0.035] hover:shadow-[0_24px_70px_-22px_rgba(124,58,237,0.45)] md:p-7">
      {/* Headline: "Über X € Umsatz →" */}
      <h3 className="text-[22px] leading-[1.2] font-bold tracking-tight text-white md:text-[24px]">
        {t("umsatzPrefix")} {umsatz} {t("umsatzSuffix")}{" "}
        <span aria-hidden className="text-white/60">→</span>
      </h3>
      {/* Sub-headline larger + muted */}
      <div className="mt-1.5 text-[17px] font-semibold leading-tight text-white/40 md:text-[18px]">
        {detail ?? umsatzSuffix}
      </div>

      {/* Real Google Ads dashboard screenshot — clickable */}
      <button
        type="button"
        onClick={onImageClick}
        aria-label={`Google Ads Dashboard ${branche}`}
        className="group/img relative mt-5 block overflow-hidden rounded-xl bg-white ring-1 ring-white/10 transition-transform duration-300 hover:ring-[#7c3aed]/40"
      >
        <Image
          src={entry.image}
          alt={`Google Ads Dashboard ${branche} ${umsatz}`}
          width={1200}
          height={620}
          className="block h-auto w-full transition-transform duration-500 group-hover/img:scale-[1.02]"
          sizes="(max-width: 768px) 90vw, (max-width: 1200px) 45vw, 380px"
        />
        <span
          aria-hidden
          className="pointer-events-none absolute right-2.5 bottom-2.5 inline-flex h-8 w-8 items-center justify-center rounded-full bg-black/70 text-white opacity-0 ring-1 ring-white/15 backdrop-blur transition-opacity group-hover/img:opacity-100"
        >
          <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M15 3h6v6" />
            <path d="M9 21H3v-6" />
            <path d="M21 3l-7 7" />
            <path d="M3 21l7-7" />
          </svg>
        </span>
      </button>

      {/* Stats pills: ROAS left · (optional) Domain center · Service right */}
      <div className="mt-4 flex items-center justify-between gap-2">
        <Pill>{entry.roas}</Pill>
        {entry.siteUrl ? <SitePill url={entry.siteUrl} /> : null}
        <Pill>{service}</Pill>
      </div>

      {/* Plan full-width, clickable → pricing */}
      <a href="#preise" className="mt-3 block">
        <PlanTag plan={entry.plan} />
      </a>
    </div>
  );
}

function Pill({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full border border-white/15 bg-transparent px-4 py-2 text-[13px] font-medium text-white/85">
      {children}
    </span>
  );
}

function SitePill({ url }: { url: string }) {
  const domain = url.replace(/^https?:\/\//, "").replace(/\/$/, "");
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="group inline-flex items-center gap-1 py-1 text-xs font-medium text-white transition-colors hover:text-white/70"
    >
      {domain}
      <svg
        viewBox="0 0 16 16"
        className="h-3 w-3 transition-transform group-hover:translate-x-[1px] group-hover:-translate-y-[1px]"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden
      >
        <path d="M5 11L11 5M11 5H6M11 5V10" />
      </svg>
    </a>
  );
}

function PlanTag({ plan }: { plan: Plan }) {
  const t = useTranslations("cases.plans");
  const label = plan === "Black Diamond" ? t("blackDiamond") : t("gold");
  return (
    <span className="inline-flex w-full items-center justify-center rounded-full border border-white/15 bg-transparent px-5 py-3 text-[14px] font-medium tracking-tight text-white transition-all duration-200 hover:border-white/30 hover:bg-white/[0.04]">
      {label}
    </span>
  );
}
