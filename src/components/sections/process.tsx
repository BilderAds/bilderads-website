"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Section } from "@/components/ui/section";
import { getActualDate, getRelativeLabel } from "@/lib/relative-date";

type Step = {
  daysFromToday: number;
  title: string;
  lines: string[];
  color: string;
};

const STEPS: Step[] = [
  {
    daysFromToday: 0,
    title: "Gespräch.",
    lines: [
      "30 Min am Telefon. Du erzählst was du machst.",
      "Wir checken ob's passt.",
    ],
    color: "#22c55e",
  },
  {
    daysFromToday: 1,
    title: "Wir bauen alles auf.",
    lines: [
      "Google Ads. Landing Page. Anzeigen.",
      "Du musst nichts tun.",
    ],
    color: "#f59e0b",
  },
  {
    daysFromToday: 14,
    title: "Neue Kunden rufen an.",
    lines: ["Anfragen jede Woche.", "Du nimmst nur die guten."],
    color: "#7c3aed",
  },
];

type DateInfo = { tag: string; date: string };

/**
 * Process section. Vertical timeline with 3 steps, auto-computed relative dates
 * (HEUTE / MORGEN / IN 2 WOCHEN) + actual German calendar dates ("17. Mai 2026").
 * Dates are computed client-side after mount to avoid SSR build-time lock.
 */
export function Process() {
  const [dates, setDates] = useState<DateInfo[]>(() =>
    STEPS.map(() => ({ tag: "", date: "" })),
  );

  useEffect(() => {
    setDates(
      STEPS.map((s) => ({
        tag: getRelativeLabel(s.daysFromToday),
        date: getActualDate(s.daysFromToday),
      })),
    );
  }, []);

  return (
    <Section id="ablauf" className="bg-[#0a0a0a]">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="mx-auto max-w-3xl text-center"
      >
        <h2 className="text-3xl leading-[1.05] font-semibold tracking-tight text-white md:text-5xl">
          In 3 Schritten zu mehr Kunden.
        </h2>
        <p className="mt-5 text-base text-[#a1a1aa] md:text-lg">
          Vom ersten Anruf bis zur ersten Anfrage in 14 Tagen.
        </p>
      </motion.div>

      {/* Timeline */}
      <div className="mx-auto mt-16 max-w-3xl md:mt-20">
        <div className="relative pl-10 md:pl-14">
          {/* Vertical line */}
          <div
            aria-hidden
            className="absolute top-3 bottom-3 left-[7px] w-px bg-white/15 md:left-[11px]"
          />

          {STEPS.map((step, i) => {
            const info = dates[i];
            return (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{
                  duration: 0.55,
                  ease: "easeOut",
                  delay: i * 0.12,
                }}
                className={i < STEPS.length - 1 ? "pb-14 md:pb-20" : ""}
              >
                {/* Dot */}
                <span
                  aria-hidden
                  className="absolute left-0 block h-4 w-4 rounded-full md:h-6 md:w-6"
                  style={{
                    background: step.color,
                    boxShadow: `0 0 18px ${step.color}80`,
                    marginTop: 4,
                  }}
                />

                {/* Tag + actual date */}
                <div className="flex flex-wrap items-center gap-3">
                  <span
                    className="rounded-full px-3 py-1 text-[11px] font-bold tracking-wider uppercase"
                    style={{
                      background: `${step.color}1f`,
                      color: step.color,
                    }}
                  >
                    {info?.tag || " "}
                  </span>
                  <span className="text-sm text-[#71717a]">
                    {info?.date || " "}
                  </span>
                </div>

                {/* Title */}
                <h3 className="mt-4 text-[26px] leading-tight font-semibold tracking-tight text-white md:text-[32px]">
                  {step.title}
                </h3>

                {/* Description */}
                <div className="mt-3 space-y-1 text-base leading-relaxed text-[#a1a1aa] md:text-[18px]">
                  {step.lines.map((line) => (
                    <p key={line}>{line}</p>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.15 }}
          className="mt-16 flex flex-col items-center gap-4 text-center md:mt-20"
        >
          <a
            href="#kontakt"
            className="inline-flex items-center justify-center rounded-full bg-[#7c3aed] px-8 py-4 text-base font-semibold text-white shadow-[0_8px_30px_-8px_rgba(124,58,237,0.7)] transition-all duration-200 hover:scale-[1.03] hover:bg-[#8b5cf6] hover:shadow-[0_12px_40px_-8px_rgba(124,58,237,0.9)]"
          >
            Jetzt Gespräch buchen
          </a>
          <p className="text-sm text-[#71717a]">
            Lieber schreiben?{" "}
            <a
              href="#kontakt"
              className="text-[#a78bfa] underline-offset-4 transition-colors hover:text-[#c4b5fd] hover:underline"
            >
              Anfrage hier
            </a>
          </p>
        </motion.div>
      </div>
    </Section>
  );
}
