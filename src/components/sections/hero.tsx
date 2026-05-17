"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { BrandButton } from "@/components/ui/brand-button";
import { HeroParticles } from "./hero-particles";

export function Hero() {
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
      className="relative isolate flex min-h-screen items-center overflow-hidden bg-black pt-24 pb-16 tablet:pt-28 tablet:pb-20 desktop:pt-32 desktop:pb-24"
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

      <div className="mx-auto grid w-full max-w-[1440px] grid-cols-1 items-center gap-12 px-5 tablet:grid-cols-10 tablet:gap-10 tablet:px-10 desktop:gap-20 desktop:px-20">
        {/* LEFT: copy (70%) */}
        <div className="tablet:col-span-7">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="inline-flex items-center gap-2 rounded-full border border-[#7c3aed]/30 bg-[#3a0460]/40 px-4 py-1.5 text-[12px] font-medium text-[#d6c2ff] backdrop-blur"
          >
            <Spark />
            3.700.000 €+ für Kunden generiert
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.08 }}
            className="mt-6 text-[36px] leading-[1.2] tracking-[-0.01em] font-bold text-balance text-white tablet:text-[48px] tablet:leading-[1.15] tablet:tracking-[-0.02em] desktop:text-[72px] desktop:leading-[1.1] desktop:tracking-[-0.03em]"
          >
            Mehr zahlende Kunden
            <br />
            für dein Business.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.16 }}
            className="mt-6 max-w-xl text-[16px] leading-[1.65] text-white/65 tablet:text-[17px] tablet:leading-[1.7] desktop:text-[18px]"
          >
            Planbar neue Kunden, jede Woche.
            <br />
            Google Ads, Website und Anzeigen für lokale Dienstleister.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.24 }}
            className="mt-8 flex flex-col items-start gap-6"
          >
            <BrandButton href="#analyse" size="lg">
              Jetzt mehr Kunden bekommen
            </BrandButton>

            <ol className="flex flex-wrap items-center gap-x-7 gap-y-3 text-[13px] text-white/70 tablet:text-[14px]">
              <Step n={1}>Button drücken</Step>
              <Step n={2}>7 Fragen beantworten</Step>
              <Step n={3}>Kostenloses Beratungsgespräch</Step>
            </ol>
          </motion.div>
        </div>

        {/* RIGHT: video slot (30%) */}
        <div className="tablet:col-span-3">
          <VideoSlot />
        </div>
      </div>
    </section>
  );
}

function Step({ n, children }: { n: number; children: React.ReactNode }) {
  return (
    <li className="inline-flex items-center gap-2.5">
      <span className="relative inline-flex h-7 w-7 items-center justify-center rounded-full bg-[#3a0460]/40 text-[12px] font-semibold text-[#d6c2ff] ring-1 ring-[#7c3aed]/50 tablet:h-8 tablet:w-8 tablet:text-[13px]">
        {n}
      </span>
      <span className="font-medium">{children}</span>
    </li>
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

/* ─── Video slot ──────────────────────────────────────────────────────── */

function VideoSlot() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLVideoElement>(null);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96, y: 16 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
      className="relative mx-auto w-full max-w-[560px]"
    >
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Showreel ansehen"
        className="group relative block aspect-video w-full overflow-hidden rounded-[20px] ring-1 ring-white/10 shadow-[0_30px_80px_-30px_rgba(58,4,96,0.8)] transition-all duration-300 hover:shadow-[0_36px_90px_-30px_rgba(124,58,237,0.7)]"
      >
        {/* Placeholder gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#3a0460] via-[#1a0030] to-[#0a001a]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_15%,rgba(255,255,255,0.18),transparent_55%)]" />
        <div
          aria-hidden
          className="absolute inset-0 opacity-30 mix-blend-overlay"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='240' height='240'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 0.4 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")",
          }}
        />

        {/* placeholder caption top-left */}
        <div className="absolute inset-x-5 top-5 flex items-center justify-between">
          <span className="inline-flex items-center gap-2 rounded-full bg-black/40 px-3 py-1 text-[11px] font-medium text-white/80 backdrop-blur">
            <span className="inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-red-500" />
            Showreel · 1 Min
          </span>
          <span className="rounded-full bg-black/40 px-2.5 py-1 text-[10px] font-semibold tracking-wider text-white/70 uppercase backdrop-blur">
            Platzhalter
          </span>
        </div>

        {/* Play button center */}
        <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <span
            aria-hidden
            className="absolute inset-0 -m-4 rounded-full bg-white/20 blur-md motion-safe:animate-pulse"
          />
          <span className="relative inline-flex h-14 w-14 items-center justify-center rounded-full bg-white text-[#3a0460] shadow-[0_12px_40px_-8px_rgba(0,0,0,0.6)] transition-transform group-hover:scale-105 md:h-16 md:w-16 lg:h-20 lg:w-20">
            <svg
              viewBox="0 0 24 24"
              className="h-5 w-5 translate-x-[2px] md:h-6 md:w-6 lg:h-8 lg:w-8"
              fill="currentColor"
              aria-hidden
            >
              <path d="M7 4.5v15l13-7.5L7 4.5Z" />
            </svg>
          </span>
        </span>

        {/* caption bottom */}
        <div className="absolute inset-x-5 bottom-5">
          <div className="text-[15px] font-semibold leading-tight text-white">
            So bekommst du planbar mehr Kunden
          </div>
          <div className="mt-1 text-[12px] text-white/65">
            Kevin erklärt in 1 Minute wie&apos;s funktioniert
          </div>
        </div>
      </button>

      {open ? (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/90 backdrop-blur p-4"
          onClick={() => {
            if (ref.current) ref.current.pause();
            setOpen(false);
          }}
        >
          <div
            className="relative w-full max-w-4xl overflow-hidden rounded-2xl bg-black ring-1 ring-white/10"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              aria-label="Schließen"
              onClick={() => {
                if (ref.current) ref.current.pause();
                setOpen(false);
              }}
              className="absolute top-3 right-3 z-10 inline-flex h-9 w-9 items-center justify-center rounded-full bg-black/60 text-white ring-1 ring-white/15 backdrop-blur hover:bg-black/80"
            >
              ×
            </button>
            <div className="aspect-video w-full">
              <video
                ref={ref}
                controls
                playsInline
                className="h-full w-full bg-black object-cover"
              />
            </div>
          </div>
        </div>
      ) : null}
    </motion.div>
  );
}
