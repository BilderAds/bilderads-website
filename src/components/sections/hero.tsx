"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { HeroParticles } from "./hero-particles";

/**
 * Hero section: 70/30 split with copy + CTA on the left, animated ad-creative
 * stack on the right. Dark base + purple gradient blobs + particle field.
 */
export function Hero() {
  return (
    <section className="relative isolate overflow-hidden bg-[#0a0a0a] pt-28 pb-24 md:pt-36 md:pb-32">
      {/* Background gradient blobs */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute top-[-10%] right-[-10%] h-[480px] w-[480px] rounded-full bg-[#7c3aed]/35 blur-[140px]" />
        <div className="absolute bottom-[-20%] left-[-10%] h-[520px] w-[520px] rounded-full bg-[#6d28d9]/30 blur-[160px]" />
        <div className="absolute top-1/2 left-1/2 h-[300px] w-[300px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#4c1d95]/20 blur-[120px]" />
      </div>

      {/* Particle field */}
      <div className="absolute inset-0 -z-10">
        <HeroParticles />
      </div>

      <div className="mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-14 px-6 md:grid-cols-12 md:gap-10 md:px-10">
        {/* Left column: copy + CTA */}
        <div className="md:col-span-7">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="inline-flex items-center gap-2 rounded-full border border-[#7c3aed]/30 bg-[#7c3aed]/10 px-3.5 py-1.5 text-xs font-medium text-[#c4b5fd] backdrop-blur-sm"
          >
            <Check className="h-3.5 w-3.5 text-[#a78bfa]" strokeWidth={3} />
            3.700.000 €+ für Kunden generiert
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.1 }}
            className="mt-6 text-[40px] leading-[1.05] font-semibold tracking-tight text-white md:text-[64px] md:leading-[1.02]"
          >
            Mehr zahlende Kunden
            <br />
            <span className="bg-gradient-to-r from-white via-[#e9d5ff] to-[#c4b5fd] bg-clip-text text-transparent">
              für dein Business.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.2 }}
            className="mt-6 max-w-xl text-base leading-relaxed text-[#a1a1aa] md:text-lg"
          >
            Planbar neue Kunden jede Woche. Google Ads, Website und Anzeigen
            für lokale Dienstleister.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.3 }}
            className="mt-9 flex flex-col items-start gap-5"
          >
            <a
              href="#kontakt"
              className="group inline-flex items-center justify-center rounded-full bg-[#7c3aed] px-7 py-4 text-base font-semibold text-white shadow-[0_8px_30px_-8px_rgba(124,58,237,0.7)] transition-all duration-200 hover:scale-[1.03] hover:bg-[#8b5cf6] hover:shadow-[0_12px_40px_-8px_rgba(124,58,237,0.9)]"
            >
              Jetzt mehr Kunden bekommen
            </a>

            <ul className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-[#a1a1aa]">
              <li className="inline-flex items-center gap-1.5">
                <Check className="h-4 w-4 text-[#a78bfa]" strokeWidth={3} />
                Button drücken
              </li>
              <li className="inline-flex items-center gap-1.5">
                <Check className="h-4 w-4 text-[#a78bfa]" strokeWidth={3} />
                7 Fragen beantworten
              </li>
              <li className="inline-flex items-center gap-1.5">
                <Check className="h-4 w-4 text-[#a78bfa]" strokeWidth={3} />
                Kostenloses Beratungsgespräch
              </li>
            </ul>
          </motion.div>
        </div>

        {/* Right column: floating ad stack */}
        <div className="md:col-span-5">
          <AdStack />
        </div>
      </div>
    </section>
  );
}

/* ─── Floating ad creative stack ──────────────────────────────────────── */

type AdCard = {
  label: string;
  badge: string;
  gradient: string;
};

const AD_CARDS: AdCard[] = [
  {
    label: "Mehr Anfragen",
    badge: "Gebäudereinigung",
    gradient: "from-[#7c3aed] via-[#6d28d9] to-[#4c1d95]",
  },
  {
    label: "Neue Kunden",
    badge: "Schlüsseldienst",
    gradient: "from-[#8b5cf6] via-[#7c3aed] to-[#5b21b6]",
  },
  {
    label: "Planbar wachsen",
    badge: "Sanitär",
    gradient: "from-[#a78bfa] via-[#8b5cf6] to-[#6d28d9]",
  },
  {
    label: "ROAS 19x",
    badge: "Köln",
    gradient: "from-[#c4b5fd] via-[#a78bfa] to-[#7c3aed]",
  },
  {
    label: "15,40 € CPL",
    badge: "Performance",
    gradient: "from-[#7c3aed] via-[#5b21b6] to-[#1e1b4b]",
  },
];

function AdStack() {
  // Duplicate cards so the vertical loop is seamless.
  const cards = [...AD_CARDS, ...AD_CARDS];

  return (
    <div
      className="relative mx-auto h-[480px] w-full max-w-[360px] overflow-hidden md:h-[560px]"
      style={{
        maskImage:
          "linear-gradient(to bottom, transparent 0%, black 12%, black 88%, transparent 100%)",
        WebkitMaskImage:
          "linear-gradient(to bottom, transparent 0%, black 12%, black 88%, transparent 100%)",
      }}
    >
      <motion.div
        className="flex flex-col gap-5"
        animate={{ y: ["0%", "-50%"] }}
        transition={{ duration: 28, ease: "linear", repeat: Infinity }}
      >
        {cards.map((card, i) => (
          <div
            key={`${card.label}-${i}`}
            className={`relative h-[200px] w-full shrink-0 overflow-hidden rounded-2xl bg-gradient-to-br ${card.gradient} ring-1 ring-white/10`}
          >
            {/* subtle noise overlay */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.15),transparent_50%)]" />
            <div className="absolute inset-0 flex flex-col justify-between p-5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium tracking-wide text-white/70 uppercase">
                  BilderAds
                </span>
                <span className="rounded-full bg-black/30 px-2.5 py-1 text-[10px] font-medium text-white/80 backdrop-blur-sm">
                  {card.badge}
                </span>
              </div>
              <div>
                <div className="text-2xl leading-tight font-semibold text-white">
                  {card.label}
                </div>
                <div className="mt-1 text-xs text-white/70">
                  Lokal · Performance · Planbar
                </div>
              </div>
            </div>
          </div>
        ))}
      </motion.div>
    </div>
  );
}
