"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BrandButton } from "@/components/ui/brand-button";
import { cn } from "@/lib/utils";

type Slide = {
  title: string;
  subtitle?: string;
  gradient: string;
};

const SLIDES: Slide[] = [
  {
    title: "Mehr Aufträge.\nBessere Margen.",
    subtitle: "Heizungsbau",
    gradient: "from-[#1c1c1f] via-[#0d0d10] to-[#050507]",
  },
  {
    title: "Saubere Räume.\nStarker Eindruck.",
    subtitle: "Gebäudereinigung",
    gradient: "from-[#1f3a3a] via-[#0e1f1f] to-[#04100e]",
  },
  {
    title: "Schnell vor Ort.\nFair beraten.",
    subtitle: "Schlüsseldienst",
    gradient: "from-[#3a0460] via-[#1a0030] to-[#0a001a]",
  },
  {
    title: "Glasbruch heute\nnoch repariert.",
    subtitle: "Glaserei",
    gradient: "from-[#3a2a04] via-[#1f1402] to-[#0a0500]",
  },
  {
    title: "Stromausfall?\nWir sind da.",
    subtitle: "Elektriker",
    gradient: "from-[#3a0420] via-[#1f0210] to-[#0a0008]",
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

  const move = useCallback(
    (dir: "prev" | "next") => {
      if (count < 2) return;
      setActive((a) => wrap(a + (dir === "next" ? 1 : -1), count));
    },
    [count],
  );

  const moveRef = useRef(move);
  moveRef.current = move;
  useEffect(() => {
    const id = setInterval(() => moveRef.current("next"), AUTO_MS);
    return () => clearInterval(id);
  }, []);

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
          className="text-center text-[28px] leading-[1.3] tracking-[-0.015em] font-semibold text-white tablet:text-[36px] tablet:leading-[1.25] tablet:tracking-[-0.02em] desktop:text-[48px] desktop:leading-[1.2] desktop:tracking-[-0.025em]"
        >
          Deine neue Website macht
          <br />
          Besucher zu Kunden
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
          <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-[#3a0460]/40 px-3.5 py-1.5 text-[11px] font-semibold tracking-wider text-[#d6c2ff] uppercase ring-1 ring-[#7c3aed]/40">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-[#a78bfa]" />
            Nur noch 3 verfügbar
          </div>
          <h3 className="text-[24px] font-semibold tracking-tight text-white tablet:text-[30px]">
            Kostenlose Website
          </h3>
          <p className="mx-auto mt-3 max-w-md text-[15px] leading-relaxed text-white/65">
            Sichere dir jetzt das Gold Bundle und erhalte eine professionelle
            Website im Wert von 3.000 € komplett kostenlos dazu.
          </p>
          <div className="mt-6 flex justify-center">
            <BrandButton href="#analyse" size="md">
              Jetzt mehr Kunden bekommen
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
  return (
    <div
      onClick={onSideClick}
      style={{
        position: "absolute",
        left: pos.left,
        top: 0,
        width: pos.width,
        height: cardHeight,
        borderRadius: RADIUS,
        cursor: isActive ? "default" : "pointer",
        zIndex: isActive ? 3 : 2,
        transition:
          "left 520ms cubic-bezier(0.22, 1, 0.36, 1), width 520ms cubic-bezier(0.22, 1, 0.36, 1)",
      }}
      className="overflow-hidden ring-1 ring-white/10"
    >
      <AnimatePresence initial={false}>
        <motion.div
          key={`${slotIdx}-${slideIdx}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: CROSSFADE, ease: [0.22, 1, 0.36, 1] }}
          className={cn(
            "absolute inset-0 bg-gradient-to-br",
            SLIDES[slideIdx].gradient,
          )}
        >
          {isActive ? (
            <div className="absolute inset-x-5 top-5 z-10 hidden items-center gap-1.5 tablet:flex">
              <span className="h-2.5 w-2.5 rounded-full bg-white/30" />
              <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
              <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
            </div>
          ) : null}

          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.18),transparent_55%)]" />
          <div
            className="absolute inset-0"
            style={{
              background: isActive
                ? "linear-gradient(180deg, rgba(0,0,0,0.02) 35%, rgba(0,0,0,0.38) 100%)"
                : "linear-gradient(180deg, rgba(0,0,0,0.04), rgba(0,0,0,0.20))",
            }}
          />

          {isActive ? (
            <div className="absolute inset-x-7 bottom-6">
              <h3 className="whitespace-pre-line text-[22px] leading-tight font-semibold tracking-tight text-white tablet:text-[30px] desktop:text-[40px]">
                {SLIDES[slideIdx].title}
              </h3>
              {SLIDES[slideIdx].subtitle ? (
                <div className="mt-2 text-[12px] text-white/65 tablet:text-[13px]">
                  {SLIDES[slideIdx].subtitle}
                </div>
              ) : null}
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
