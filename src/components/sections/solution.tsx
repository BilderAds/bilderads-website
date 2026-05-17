"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

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

// MagicBento effect params
const GLOW_COLOR = "132,0,255"; // #8400ff
const SPOTLIGHT_RADIUS = 320;
const MAGNET_STRENGTH = 10;
const PARTICLE_COUNT = 14;
const CLICK_RIPPLE = true;

const clamp01 = (v: number) => Math.max(0, Math.min(1, v));

function makeParticles(count: number) {
  return Array.from({ length: count }, () => ({
    x: Math.random() * 100,
    y: Math.random() * 100,
    dx: (Math.random() - 0.5) * 120,
    dy: (Math.random() - 0.5) * 120,
    size: 2 + Math.random() * 3,
    dur: 2 + Math.random() * 2.2,
    delay: Math.random() * 0.8,
  }));
}

export function Solution() {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const spotlightRef = useRef<HTMLDivElement | null>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const rafRef = useRef<number | null>(null);
  const pointerRef = useRef({ x: 0, y: 0, inside: false });

  const resetGlow = useCallback(() => {
    for (const el of cardRefs.current) {
      if (!el) continue;
      el.style.setProperty("--mb-gx", "50%");
      el.style.setProperty("--mb-gy", "50%");
      el.style.setProperty("--mb-gi", "0");
      el.style.setProperty("--mb-mx", "0px");
      el.style.setProperty("--mb-my", "0px");
    }
    if (spotlightRef.current) spotlightRef.current.style.opacity = "0";
  }, []);

  const applyGlow = useCallback(() => {
    rafRef.current = null;
    const root = rootRef.current;
    if (!root) return;
    const { x: clientX, y: clientY, inside } = pointerRef.current;
    if (!inside) {
      resetGlow();
      return;
    }

    const rootRect = root.getBoundingClientRect();
    const localX = clientX - rootRect.left;
    const localY = clientY - rootRect.top;
    const proximity = SPOTLIGHT_RADIUS * 0.5;
    const fade = SPOTLIGHT_RADIUS * 0.9;
    let nearest = Infinity;

    for (const el of cardRefs.current) {
      if (!el) continue;
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const edgeBias = Math.max(rect.width, rect.height) * 0.3;
      const dist = Math.max(
        0,
        Math.hypot(clientX - cx, clientY - cy) - edgeBias,
      );
      nearest = Math.min(nearest, dist);

      let intensity = 0;
      if (dist <= proximity) intensity = 1;
      else if (dist <= fade)
        intensity = (fade - dist) / (fade - proximity);
      intensity = clamp01(intensity);

      const rx = ((clientX - rect.left) / rect.width) * 100;
      const ry = ((clientY - rect.top) / rect.height) * 100;
      el.style.setProperty("--mb-gx", `${rx}%`);
      el.style.setProperty("--mb-gy", `${ry}%`);
      el.style.setProperty("--mb-gi", `${intensity}`);

      // magnetism: only on the card under cursor
      const nx = (clientX - cx) / (rect.width / 2);
      const ny = (clientY - cy) / (rect.height / 2);
      const isOver =
        clientX >= rect.left &&
        clientX <= rect.right &&
        clientY >= rect.top &&
        clientY <= rect.bottom;
      if (isOver) {
        el.style.setProperty("--mb-mx", `${nx * MAGNET_STRENGTH}px`);
        el.style.setProperty("--mb-my", `${ny * MAGNET_STRENGTH}px`);
      } else {
        el.style.setProperty("--mb-mx", "0px");
        el.style.setProperty("--mb-my", "0px");
      }
    }

    if (spotlightRef.current) {
      spotlightRef.current.style.left = `${localX}px`;
      spotlightRef.current.style.top = `${localY}px`;
      const spotOpacity =
        clamp01(1 - nearest / SPOTLIGHT_RADIUS) * 0.85;
      spotlightRef.current.style.opacity = `${spotOpacity}`;
    }
  }, [resetGlow]);

  const onMove = useCallback(
    (e: React.PointerEvent) => {
      pointerRef.current = { x: e.clientX, y: e.clientY, inside: true };
      if (rafRef.current == null) {
        rafRef.current = requestAnimationFrame(applyGlow);
      }
    },
    [applyGlow],
  );

  const onLeave = useCallback(() => {
    pointerRef.current.inside = false;
    resetGlow();
  }, [resetGlow]);

  useEffect(() => {
    return () => {
      if (rafRef.current != null) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <section
      id="vorteile"
      className="relative w-full overflow-hidden bg-black py-15 tablet:py-20 desktop:py-30"
    >
      <div className="mx-auto w-full max-w-[1440px] px-5 tablet:px-10 desktop:px-20">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.55, ease: "easeOut" }}
          className="mx-auto max-w-3xl text-center"
        >
          <span className="inline-flex items-center rounded-full border border-[#7c3aed]/30 bg-[#7c3aed]/10 px-3.5 py-1.5 text-xs font-medium tracking-wider text-[#c4b5fd] uppercase backdrop-blur-sm">
            BilderAds Vorteile
          </span>

          <h2 className="mt-6 text-[28px] leading-[1.3] tracking-[-0.015em] font-semibold text-white tablet:text-[36px] tablet:leading-[1.25] tablet:tracking-[-0.02em] desktop:text-[48px] desktop:leading-[1.2] desktop:tracking-[-0.025em]">
            Das hier wirst du lieben:
          </h2>
        </motion.div>

        <div
          ref={rootRef}
          onPointerMove={onMove}
          onPointerLeave={onLeave}
          className="bm-root relative mt-12 grid grid-cols-1 gap-5 tablet:mt-14 tablet:grid-cols-3 desktop:mt-16 desktop:gap-6"
        >
          <div ref={spotlightRef} aria-hidden className="bm-spotlight" />

          {BENEFITS.map((entry, i) => (
            <motion.div
              key={entry.number}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, ease: "easeOut", delay: i * 0.08 }}
            >
              <BenefitCard
                entry={entry}
                refSetter={(el) => (cardRefs.current[i] = el)}
              />
            </motion.div>
          ))}
        </div>
      </div>

    </section>
  );
}

function BenefitCard({
  entry,
  refSetter,
}: {
  entry: Benefit;
  refSetter: (el: HTMLDivElement | null) => void;
}) {
  const localRef = useRef<HTMLDivElement | null>(null);
  const [particles, setParticles] = useState<
    ReturnType<typeof makeParticles>
  >([]);

  useEffect(() => {
    setParticles(makeParticles(PARTICLE_COUNT));
  }, []);
  const [ripples, setRipples] = useState<
    { id: number; x: number; y: number; r: number }[]
  >([]);
  const nextId = useRef(0);

  const onClick = useCallback(
    (e: React.MouseEvent) => {
      if (!CLICK_RIPPLE) return;
      const el = localRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const r = Math.max(
        Math.hypot(x, y),
        Math.hypot(rect.width - x, y),
        Math.hypot(x, rect.height - y),
        Math.hypot(rect.width - x, rect.height - y),
      );
      const id = nextId.current++;
      setRipples((s) => [...s, { id, x, y, r }]);
      setTimeout(() => {
        setRipples((s) => s.filter((rp) => rp.id !== id));
      }, 750);
    },
    [],
  );

  return (
    <div
      ref={(el) => {
        localRef.current = el;
        refSetter(el);
      }}
      onClick={onClick}
      className="bm-card group relative flex h-full flex-col overflow-hidden rounded-[22px] border border-white/[0.08] bg-[#070012] p-7 tablet:p-8"
    >
      {/* particles, only visible on hover */}
      <div className="bm-particles" aria-hidden>
        {particles.map((p, i) => (
          <span
            key={i}
            className="bm-particle"
            style={
              {
                left: `${p.x}%`,
                top: `${p.y}%`,
                width: `${p.size}px`,
                height: `${p.size}px`,
                ["--dx" as string]: `${p.dx}px`,
                ["--dy" as string]: `${p.dy}px`,
                ["--dur" as string]: `${p.dur}s`,
                ["--del" as string]: `${p.delay}s`,
              } as React.CSSProperties
            }
          />
        ))}
      </div>

      {/* ripples */}
      {ripples.map((rp) => (
        <span
          key={rp.id}
          className="bm-ripple"
          style={{
            left: rp.x - rp.r,
            top: rp.y - rp.r,
            width: rp.r * 2,
            height: rp.r * 2,
          }}
        />
      ))}

      {/* number */}
      <div className="relative z-[2] bg-gradient-to-br from-white via-[#e9d5ff] to-[#7c3aed] bg-clip-text text-[64px] leading-none font-bold tracking-tight text-transparent tablet:text-[72px]">
        {entry.number}
      </div>

      <div className="relative z-[2] mt-6 h-px w-12 bg-white/15" />

      <h3 className="relative z-[2] mt-6 text-[22px] leading-tight font-semibold tracking-tight text-white tablet:text-[26px] desktop:text-[28px]">
        {entry.title}
      </h3>

      <p className="relative z-[2] mt-3 text-[15px] leading-relaxed text-white/65 tablet:text-[16px] desktop:text-[17px]">
        {entry.description}
      </p>
    </div>
  );
}

