"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";
import { BrandButton } from "@/components/ui/brand-button";

type Slide = {
  name: string;
  brancheKey: "haus" | "kita" | "ablass" | "ecomet" | "zahn";
  image: string;
  url: string;
};

const SLIDES: Slide[] = [
  {
    name: "Haus der Schönheit",
    brancheKey: "haus",
    image: "/showcase/haus-der-schoenheit-v2.webp",
    url: "https://haus-der-schoenheit.vercel.app/",
  },
  {
    name: "Kita Oberbachem",
    brancheKey: "kita",
    image: "/showcase/kita-oberbachem.webp",
    url: "https://kita-oberbachem.vercel.app/",
  },
  {
    name: "Gebäudereinigung Ablass",
    brancheKey: "ablass",
    image: "/showcase/gebaeudereinigung-ablass.webp",
    url: "https://gebaeudereinigung-ablass.vercel.app/",
  },
  {
    name: "Ecomet",
    brancheKey: "ecomet",
    image: "/showcase/ecomet.webp",
    url: "https://ecometapp.de/",
  },
  {
    name: "Zahnplus24",
    brancheKey: "zahn",
    image: "/showcase/zahnplus24.webp",
    url: "https://zahnplus24.de/",
  },
];

const AUTO_MS = 4500;
const GAP = 16;
const ACTIVE_RATIO = 0.58;
const SIDE_RATIO = 0.13;
const EDGE_RATIO = 0.045;
const CARD_HEIGHT_RATIO = 0.35;
const CARD_HEIGHT_MIN = 220;
const CARD_HEIGHT_MAX = 430;
const RADIUS = 16;

const CROSSFADE = 0.7; // seconds for content crossfade

const wrap = (v: number, n: number) => ((v % n) + n) % n;
const clamp = (v: number, lo: number, hi: number) =>
  Math.min(hi, Math.max(lo, v));

/**
 * Showcase carousel.
 * - 5 fixed slot positions (sizes: edge / side / ACTIVE / side / edge).
 * - Active is always centered.
 * - When active changes, each slot crossfades its content (gradient + title)
 *   from old slide to new slide — smooth swap, no hop.
 */
export function Showcase() {
  const t = useTranslations("showcase");
  const count = SLIDES.length;
  const frameRef = useRef<HTMLDivElement | null>(null);
  const [active, setActive] = useState(0);
  const [stageWidth, setStageWidth] = useState(1100);

  useEffect(() => {
    const node = frameRef.current;
    if (!node) return;
    const measure = () =>
      setStageWidth(Math.min(node.offsetWidth || 1200, 1280));
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(node);
    return () => ro.disconnect();
  }, []);

  const cardHeight = clamp(
    stageWidth * CARD_HEIGHT_RATIO,
    CARD_HEIGHT_MIN,
    CARD_HEIGHT_MAX,
  );

  const visibleCount = Math.min(count, 5);
  const centerSlot = Math.floor((visibleCount - 1) / 2);

  const slotWidths = useMemo(() => {
    const w = stageWidth;
    if (visibleCount === 5) {
      return [
        w * EDGE_RATIO,
        w * SIDE_RATIO,
        w * ACTIVE_RATIO,
        w * SIDE_RATIO,
        w * EDGE_RATIO,
      ];
    }
    if (visibleCount === 4)
      return [
        w * EDGE_RATIO,
        w * ACTIVE_RATIO,
        w * SIDE_RATIO,
        w * EDGE_RATIO,
      ];
    if (visibleCount === 3)
      return [w * SIDE_RATIO, w * ACTIVE_RATIO, w * SIDE_RATIO];
    if (visibleCount === 2) return [w * SIDE_RATIO, w * ACTIVE_RATIO];
    return [w];
  }, [stageWidth, visibleCount]);

  const totalWidth =
    slotWidths.reduce((s, x) => s + x, 0) +
    GAP * Math.max(0, slotWidths.length - 1);
  const startX = (stageWidth - totalWidth) / 2;

  const slotPositions = useMemo(() => {
    let acc = startX;
    return slotWidths.map((width) => {
      const left = acc;
      acc += width + GAP;
      return { left, width };
    });
  }, [slotWidths, startX]);

  const slotSlideIndex = (slotIdx: number) =>
    wrap(active + (slotIdx - centerSlot), count);

  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const startAutoCycle = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setActive((a) => wrap(a + 1, count));
    }, AUTO_MS);
  }, [count]);

  useEffect(() => {
    startAutoCycle();
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [startAutoCycle]);

  const move = useCallback(
    (dir: "prev" | "next") => {
      if (count < 2) return;
      setActive((a) => wrap(a + (dir === "next" ? 1 : -1), count));
      startAutoCycle();
    },
    [count, startAutoCycle],
  );

  return (
    <section
      id="showcase"
      className="relative w-full overflow-hidden bg-black py-15 tablet:py-20 desktop:py-30"
    >
      <div className="mx-auto w-full max-w-[1440px] px-5 tablet:px-10 desktop:px-20">
        <motion.h2
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.55, ease: "easeOut" }}
          className="text-balance text-center text-[20px] leading-[1.2] tracking-[-0.015em] font-semibold text-white tablet:text-[30px] desktop:text-[40px]"
        >
          {t("headline")}
        </motion.h2>

        <div
          ref={frameRef}
          className="relative mx-auto mt-12 w-full"
          style={{ height: cardHeight + 70 }}
        >
          {slotPositions.map((pos, slotIdx) => {
            const slideIdx = slotSlideIndex(slotIdx);
            const isActive = slotIdx === centerSlot;
            return (
              <SlotShell
                key={`slot-${slotIdx}`}
                slotIdx={slotIdx}
                slideIdx={slideIdx}
                pos={pos}
                isActive={isActive}
                cardHeight={cardHeight}
                onSideClick={() => {
                  if (slotIdx < centerSlot) move("prev");
                  if (slotIdx > centerSlot) move("next");
                }}
              />
            );
          })}

          <div
            className="absolute left-1/2 z-10 flex -translate-x-1/2 gap-2"
            style={{ top: cardHeight + 14 }}
          >
            <ArrowButton dir="prev" onClick={() => move("prev")} />
            <ArrowButton dir="next" onClick={() => move("next")} />
          </div>
        </div>

        <div className="mx-auto mt-16 max-w-2xl rounded-3xl border border-white/10 bg-white/[0.02] px-6 py-10 text-center tablet:mt-20">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-[#3a0460]/40 px-3.5 py-1.5 text-xs font-semibold tracking-wider text-[#d6c2ff] uppercase ring-1 ring-[#7c3aed]/40">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-[#a78bfa]" />
            {t("scarcity")}
          </div>
          <h3 className="text-[24px] font-semibold tracking-tight text-white tablet:text-[30px]">
            {t("offerTitle")}
          </h3>
          <p className="mx-auto mt-3 max-w-md text-[15px] leading-relaxed text-white/65">
            {t("offerSub")}
          </p>
          <div className="mt-6 flex justify-center">
            <BrandButton href="/funnel-start" size="md">
              {t("cta")}
            </BrandButton>
          </div>
        </div>
      </div>
    </section>
  );
}

/**
 * SlotShell stays in a fixed position. Inside, the slide content
 * (gradient + title) crossfades between slides on every active change.
 */
function SlotShell({
  slotIdx,
  slideIdx,
  pos,
  isActive,
  cardHeight,
  onSideClick,
}: {
  slotIdx: number;
  slideIdx: number;
  pos: { left: number; width: number };
  isActive: boolean;
  cardHeight: number;
  onSideClick: () => void;
}) {
  const t = useTranslations("showcase");
  const slide = SLIDES[slideIdx];
  const branche = t(`branchen.${slide.brancheKey}`);

  const handleClick = () => {
    if (isActive) {
      window.open(slide.url, "_blank", "noopener,noreferrer");
    } else {
      onSideClick();
    }
  };

  return (
    <div
      onClick={handleClick}
      style={{
        position: "absolute",
        left: pos.left,
        top: 0,
        width: pos.width,
        height: cardHeight,
        borderRadius: RADIUS,
        cursor: "pointer",
        zIndex: isActive ? 3 : 2,
        transition:
          "left 520ms cubic-bezier(0.22, 1, 0.36, 1), width 520ms cubic-bezier(0.22, 1, 0.36, 1)",
      }}
      className="group overflow-hidden bg-[#0a0a0c] ring-1 ring-white/10"
    >
      <AnimatePresence initial={false}>
        <motion.div
          key={`${slotIdx}-${slideIdx}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: CROSSFADE, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0"
        >
          <Image
            src={slide.image}
            alt={`${slide.name} — ${branche}`}
            fill
            sizes="(min-width: 1440px) 800px, (min-width: 810px) 60vw, 90vw"
            className="object-cover object-top"
            loading="eager"
          />

          <div
            className="absolute inset-0 transition-opacity duration-500"
            style={{
              background: isActive
                ? "linear-gradient(180deg, rgba(0,0,0,0) 55%, rgba(0,0,0,0.55) 100%)"
                : "linear-gradient(180deg, rgba(0,0,0,0.35), rgba(0,0,0,0.55))",
            }}
          />

          {isActive ? (
            <div className="absolute inset-x-5 bottom-5 z-10 flex items-end justify-between gap-4 tablet:inset-x-7 tablet:bottom-6">
              <div>
                <div className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-2.5 py-1 text-xs font-semibold tracking-wider text-white/80 uppercase ring-1 ring-white/15 backdrop-blur-sm">
                  <span className="inline-block h-1.5 w-1.5 rounded-full bg-[#a78bfa]" />
                  {branche}
                </div>
                <div className="mt-2 text-[15px] font-semibold tracking-tight text-white tablet:text-[18px] desktop:text-[20px]">
                  {slide.name}
                </div>
              </div>
              <div className="hidden items-center gap-1.5 rounded-full bg-white/10 px-3 py-1.5 text-[11px] font-medium text-white/85 ring-1 ring-white/15 backdrop-blur-sm transition-colors group-hover:bg-white/20 group-hover:text-white tablet:inline-flex">
                {t("liveLabel")}
                <svg width="11" height="11" viewBox="0 0 16 16" fill="none" aria-hidden>
                  <path
                    d="M5 11L11 5M11 5H6M11 5V10"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </div>
          ) : null}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

function ArrowButton({
  dir,
  onClick,
}: {
  dir: "prev" | "next";
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={dir === "next" ? "Nächste Website" : "Vorherige Website"}
      className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-white/15 bg-white/[0.06] text-white/80 shadow-[0_2px_10px_rgba(0,0,0,0.18)] transition-colors hover:border-white/30 hover:bg-white/[0.1] hover:text-white"
    >
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
        <path
          d={dir === "next" ? "M6 3L10.5 8L6 13" : "M10 3L5.5 8L10 13"}
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
}
