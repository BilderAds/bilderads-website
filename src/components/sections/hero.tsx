"use client";

import { useCallback, useEffect, useRef } from "react";
import { useTranslations } from "next-intl";
import { BrandButton } from "@/components/ui/brand-button";
import { HeroParticles } from "./hero-particles";

export function Hero() {
  const t = useTranslations("hero");
  const sectionRef = useRef<HTMLElement | null>(null);
  const spotRef = useRef<HTMLDivElement | null>(null);
  const rafRef = useRef<number | null>(null);
  const pos = useRef({ x: 0, y: 0, inside: false });

  const apply = useCallback(() => {
    rafRef.current = null;
    const sec = sectionRef.current;
    const sp = spotRef.current;
    if (!sec || !sp) return;
    if (!pos.current.inside) {
      sp.style.opacity = "0";
      return;
    }
    const rect = sec.getBoundingClientRect();
    sp.style.left = `${pos.current.x - rect.left}px`;
    sp.style.top = `${pos.current.y - rect.top}px`;
    sp.style.opacity = "1";
  }, []);

  const onMove = useCallback(
    (e: React.PointerEvent) => {
      pos.current = { x: e.clientX, y: e.clientY, inside: true };
      if (rafRef.current == null) rafRef.current = requestAnimationFrame(apply);
    },
    [apply],
  );

  const onLeave = useCallback(() => {
    pos.current.inside = false;
    if (spotRef.current) spotRef.current.style.opacity = "0";
  }, []);

  useEffect(() => {
    return () => {
      if (rafRef.current != null) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      className="relative isolate flex flex-col overflow-hidden bg-black pt-24 pb-24 tablet:pt-32 tablet:pb-32 desktop:pt-40 desktop:pb-40"
    >
      {/* Background glow + particles */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute top-[-15%] right-[-10%] h-[520px] w-[520px] rounded-full bg-[#3a0460]/55 blur-[150px]" />
        <div className="absolute bottom-[-20%] left-[-10%] h-[520px] w-[520px] rounded-full bg-[#2a0049]/55 blur-[160px]" />
      </div>
      <div className="absolute inset-0 -z-10">
        <HeroParticles />
      </div>

      {/* Spotlight that follows the cursor */}
      <div
        ref={spotRef}
        aria-hidden
        className="pointer-events-none absolute z-0 hidden h-[820px] w-[820px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-0 mix-blend-screen tablet:block"
        style={{
          background:
            "radial-gradient(circle, rgba(132,0,255,0.20) 0%, rgba(132,0,255,0.12) 18%, rgba(132,0,255,0.06) 32%, rgba(132,0,255,0.02) 52%, transparent 72%)",
          transition: "opacity 220ms ease",
        }}
      />

      {/* Floating ambient dots around the pill area */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-[120px] z-[1] mx-auto hidden h-24 max-w-[1440px] tablet:block"
      >
        <div className="relative mx-auto h-full px-10 desktop:px-20">
          <span className="absolute top-2 left-[12%] h-1 w-1 rounded-full bg-[#a78bfa]/60 shadow-[0_0_10px_2px_rgba(124,58,237,0.5)] motion-safe:animate-pulse" />
          <span className="absolute top-10 left-[30%] h-1.5 w-1.5 rounded-full bg-[#c4b5fd]/80 shadow-[0_0_14px_3px_rgba(124,58,237,0.7)] motion-safe:animate-pulse" />
          <span className="absolute top-4 left-[55%] h-1 w-1 rounded-full bg-[#a78bfa]/50 shadow-[0_0_8px_2px_rgba(124,58,237,0.4)]" />
        </div>
      </div>

      <div className="mx-auto grid w-full max-w-[1440px] grid-cols-1 items-center gap-12 px-5 tablet:gap-10 tablet:px-10 desktop:gap-20 desktop:px-20">
        {/* Copy — full width (hero video removed) */}
        <div>
          <div
            className="bm-fade-up-hero inline-flex items-center gap-2 rounded-full border border-[#7c3aed]/30 bg-[#3a0460]/40 px-4 py-1.5 text-[12px] font-medium text-[#d6c2ff] backdrop-blur"
            style={{ "--bm-delay": "0ms" } as React.CSSProperties}
          >
            <Spark />
            {t("pill")}
          </div>

          <h1
            className="bm-fade-up-hero mt-6 text-[28px] leading-[1.18] tracking-[-0.015em] font-bold whitespace-pre-line text-white tablet:text-[42px] tablet:leading-[1.12] tablet:tracking-[-0.02em] desktop:text-[56px] desktop:leading-[1.08] desktop:tracking-[-0.025em]"
            style={{ "--bm-delay": "80ms" } as React.CSSProperties}
          >
            {t("headline")}
          </h1>

          <p
            className="bm-fade-up-hero mt-6 max-w-xl whitespace-normal text-[14px] leading-[1.6] text-white/65 tablet:whitespace-pre-line tablet:text-[17px] tablet:leading-[1.7] desktop:text-[18px]"
            style={{ "--bm-delay": "200ms" } as React.CSSProperties}
          >
            {t("subline")}
          </p>

          <div className="mt-8 flex flex-col items-start gap-6">
            <div
              className="bm-fade-up-hero"
              style={{ "--bm-delay": "350ms" } as React.CSSProperties}
            >
              <BrandButton href="/funnel-start" size="lg">
                {t("cta")}
              </BrandButton>
            </div>

            <ol className="flex flex-col items-start gap-3 text-[14px] text-white/70 tablet:flex-row tablet:flex-wrap tablet:items-center tablet:gap-x-7 tablet:gap-y-3">
              <li
                className="bm-fade-up-hero inline-flex items-center gap-2.5"
                style={{ "--bm-delay": "500ms" } as React.CSSProperties}
              >
                <StepDot n={1} />
                <span className="font-medium">{t("steps.1")}</span>
              </li>
              <li
                className="bm-fade-up-hero inline-flex items-center gap-2.5"
                style={{ "--bm-delay": "620ms" } as React.CSSProperties}
              >
                <StepDot n={2} />
                <span className="font-medium">{t("steps.2")}</span>
              </li>
              <li
                className="bm-fade-up-hero inline-flex items-center gap-2.5"
                style={{ "--bm-delay": "740ms" } as React.CSSProperties}
              >
                <StepDot n={3} />
                <span className="font-medium">{t("steps.3")}</span>
              </li>
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}

function StepDot({ n }: { n: number }) {
  return (
    <span className="relative inline-flex h-7 w-7 items-center justify-center rounded-full bg-transparent text-[12px] font-semibold text-[#c4b5fd] ring-1 ring-[#7c3aed]/60 tablet:h-8 tablet:w-8 tablet:text-[13px]">
      {n}
    </span>
  );
}

function Spark() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M12 2 13.5 9.5 21 11 13.5 12.5 12 20 10.5 12.5 3 11 10.5 9.5 12 2Z"
        fill="#c4b5fd"
      />
    </svg>
  );
}
