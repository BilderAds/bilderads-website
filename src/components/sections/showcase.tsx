"use client";

import { motion } from "framer-motion";
import type { LucideProps } from "lucide-react";
import { ArrowRight, Building2, Key, Wrench, Trash2, Zap, Bug } from "lucide-react";
import { Section } from "@/components/ui/section";
import { cn } from "@/lib/utils";

type ShowcaseEntry = {
  branche: string;
  stadt: string;
  icon: React.ComponentType<LucideProps>;
  gradient: string;
  href: string;
};

const SITES: ShowcaseEntry[] = [
  {
    branche: "Gebäudereinigung",
    stadt: "Köln",
    icon: Building2,
    gradient: "from-[#7c3aed]/30 via-[#6d28d9]/20 to-[#4c1d95]/20",
    href: "#",
  },
  {
    branche: "Schlüsseldienst",
    stadt: "München",
    icon: Key,
    gradient: "from-[#8b5cf6]/30 via-[#7c3aed]/20 to-[#5b21b6]/20",
    href: "#",
  },
  {
    branche: "Sanitär",
    stadt: "Hamburg",
    icon: Wrench,
    gradient: "from-[#a78bfa]/30 via-[#8b5cf6]/20 to-[#6d28d9]/20",
    href: "#",
  },
  {
    branche: "Entrümpelung",
    stadt: "Berlin",
    icon: Trash2,
    gradient: "from-[#c4b5fd]/25 via-[#a78bfa]/20 to-[#7c3aed]/20",
    href: "#",
  },
  {
    branche: "Elektriker",
    stadt: "Stuttgart",
    icon: Zap,
    gradient: "from-[#7c3aed]/30 via-[#5b21b6]/20 to-[#1e1b4b]/30",
    href: "#",
  },
  {
    branche: "Ungezieferbekämpfung",
    stadt: "Frankfurt",
    icon: Bug,
    gradient: "from-[#8b5cf6]/30 via-[#6d28d9]/20 to-[#4c1d95]/25",
    href: "#",
  },
];

/**
 * Showcase section. 3-column grid (2 tablet, 1 mobile) of website cards.
 * Each card has a gradient placeholder image area + icon, branche/stadt and
 * a "Live ansehen" link. Kevin swaps placeholder images for real screenshots.
 */
export function Showcase() {
  return (
    <Section id="showcase" className="bg-[#0a0a0a]">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="mx-auto max-w-3xl text-center"
      >
        <h2 className="text-3xl leading-[1.05] font-semibold tracking-tight text-white md:text-5xl">
          So sehen unsere Websites aus.
        </h2>
        <p className="mt-5 text-base text-[#a1a1aa] md:text-lg">
          Schnell, mobil, gemacht zum Verkaufen.
        </p>
      </motion.div>

      <div className="mt-14 grid grid-cols-1 gap-5 md:mt-20 md:grid-cols-2 md:gap-6 lg:grid-cols-3">
        {SITES.map((site, i) => (
          <motion.div
            key={`${site.branche}-${site.stadt}`}
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{
              duration: 0.55,
              ease: "easeOut",
              delay: i * 0.08,
            }}
          >
            <ShowcaseCard entry={site} />
          </motion.div>
        ))}
      </div>

      <motion.p
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="mt-14 text-center text-sm text-[#71717a] md:text-base"
      >
        Alle Websites in unter 14 Tagen gebaut. Mobile-First. SEO-optimiert.
      </motion.p>
    </Section>
  );
}

function ShowcaseCard({ entry }: { entry: ShowcaseEntry }) {
  const Icon = entry.icon;
  return (
    <a
      href={entry.href}
      className={cn(
        "group relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] p-6",
        "transition-all duration-300 ease-out",
        "hover:scale-[1.02] hover:border-[#7c3aed]/40 hover:bg-white/[0.04]",
        "hover:shadow-[0_20px_60px_-20px_rgba(124,58,237,0.4)]",
      )}
    >
      {/* Placeholder image area */}
      <div
        className={cn(
          "relative flex h-[200px] w-full items-center justify-center overflow-hidden rounded-xl bg-gradient-to-br ring-1 ring-white/10",
          entry.gradient,
        )}
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.12),transparent_55%)]" />
        <Icon className="relative h-14 w-14 text-white/70" strokeWidth={1.4} />
      </div>

      {/* Title row */}
      <div className="mt-5 text-[18px] font-semibold tracking-tight text-white md:text-[19px]">
        {entry.branche} {entry.stadt}
      </div>

      {/* Link */}
      <div className="mt-2 inline-flex items-center gap-1.5 text-sm font-medium text-[#a78bfa] transition-colors group-hover:text-[#c4b5fd]">
        Live ansehen
        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
      </div>
    </a>
  );
}
