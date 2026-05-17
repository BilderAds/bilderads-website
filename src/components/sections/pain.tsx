"use client";

import { motion } from "framer-motion";
import { Section } from "@/components/ui/section";
import { cn } from "@/lib/utils";

const PAINS: string[] = [
  "Werbung verbrennt Geld",
  "Wenig Gewinn pro Auftrag",
  "Schwankende Aufträge",
  "Personalmangel",
  "Nicht #1 bei Google",
  "Selber Kunden suchen",
  "Neue Website unbezahlbar",
  "Nervige Kunden",
  "Keine guten Aufträge",
];

/**
 * Pain section. 9 brutal short cards with red borders + 😣 emoji,
 * 3 columns desktop / 2 tablet / 1 mobile.
 */
export function Pain() {
  return (
    <Section id="pain" className="bg-[#0a0a0a]">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="mx-auto max-w-3xl text-center"
      >
        <h2 className="text-3xl leading-[1.05] font-semibold tracking-tight text-white md:text-5xl">
          Jeder Betrieb hasst es:
        </h2>
      </motion.div>

      <div className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2 md:mt-20 md:gap-5 lg:grid-cols-3">
        {PAINS.map((label, i) => (
          <motion.div
            key={label}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{
              duration: 0.5,
              ease: "easeOut",
              delay: i * 0.05,
            }}
          >
            <PainCard label={label} />
          </motion.div>
        ))}
      </div>
    </Section>
  );
}

function PainCard({ label }: { label: string }) {
  return (
    <div
      className={cn(
        "group relative flex h-full items-start gap-4 rounded-2xl border bg-white/[0.02] p-6 md:p-8",
        "border-red-500/30 transition-all duration-300 ease-out",
        "hover:scale-[1.02] hover:border-red-500/60 hover:bg-white/[0.04]",
        "hover:shadow-[0_20px_60px_-20px_rgba(239,68,68,0.45)]",
      )}
    >
      <span
        aria-hidden
        className="shrink-0 text-[28px] leading-none md:text-[32px]"
      >
        😣
      </span>
      <span className="text-[20px] leading-snug font-semibold text-white md:text-[22px]">
        {label}
      </span>
    </div>
  );
}
