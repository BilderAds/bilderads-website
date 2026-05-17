"use client";

import { useRef } from "react";
import type { MotionValue } from "framer-motion";
import { motion, useScroll, useTransform } from "framer-motion";
import { BrandButton } from "@/components/ui/brand-button";

type Step = {
  n: string;
  title: string;
  body: string;
};

const STEPS: Step[] = [
  {
    n: "01",
    title: "Erstgespräch.",
    body: "30 Min am Telefon. Du erzählst was du machst, wir checken ob's passt.",
  },
  {
    n: "02",
    title: "Wir bauen alles auf.",
    body: "Google Ads, Landing Page, Anzeigen, Reporting. Du musst nichts tun außer dabei sein.",
  },
  {
    n: "03",
    title: "Neue Kunden rufen an.",
    body: "Anfragen jede Woche. Du nimmst nur die guten, die schlechten lehnst du ab.",
  },
];

export function Process() {
  // One scroll-progress for the entire 3-step block,
  // split into 3 segments — card N only fills inside its own segment.
  const stepsRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: stepsRef,
    offset: ["start 0.75", "end 0.55"],
  });

  return (
    <section id="ablauf" className="relative w-full bg-black py-15 tablet:py-20 desktop:py-30">
      <div className="mx-auto w-full max-w-5xl px-5 tablet:px-10 desktop:px-20">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.55, ease: "easeOut" }}
          className="text-center"
        >
          <h2 className="whitespace-nowrap text-[22px] leading-[1.2] tracking-[-0.015em] font-semibold text-white tablet:text-[32px] tablet:tracking-[-0.02em] desktop:text-[44px] desktop:tracking-[-0.025em]">
            In 3 Schritten zu mehr Kunden.
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-[15px] text-white/55">
            Vom ersten Anruf bis zur ersten Anfrage in 14 Tagen.
          </p>
        </motion.div>

        <div
          ref={stepsRef}
          className="relative mt-12 flex flex-col gap-4 md:mt-14"
          style={{ position: "relative" }}
        >
          {STEPS.map((step, i) => {
            const segStart = i / STEPS.length;
            const segEnd = (i + 1) / STEPS.length;
            return (
              <motion.div
                key={step.n}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, ease: "easeOut", delay: i * 0.08 }}
              >
                <StepCard
                  step={step}
                  progress={scrollYProgress}
                  segment={[segStart, segEnd]}
                />
              </motion.div>
            );
          })}
        </div>

        <div className="mt-12 flex justify-center">
          <BrandButton href="#analyse" size="md">
            Jetzt mehr Kunden bekommen
          </BrandButton>
        </div>
      </div>
    </section>
  );
}

function StepCard({
  step,
  progress,
  segment,
}: {
  step: Step;
  progress: MotionValue<number>;
  segment: [number, number];
}) {
  // Hard clamp so the line for card N stays at 0 until card N-1 is full.
  const fillScale = useTransform(progress, segment, [0, 1], { clamp: true });

  return (
    <div className="group relative grid grid-cols-[64px_5px_1fr] items-stretch gap-5 rounded-[18px] border border-white/10 bg-[#f4f4f5] px-6 py-8 transition-all hover:border-white/25 hover:bg-[#fafafa] tablet:grid-cols-[120px_5px_1fr] tablet:px-10 tablet:py-10">
      <div className="flex items-center text-[56px] leading-none font-light tracking-tighter text-[#111] tablet:text-[88px]">
        {step.n}
      </div>

      {/* Vertical track + scroll-linked purple fill */}
      <div className="relative my-2 w-[5px] overflow-hidden rounded-full bg-black/15">
        <motion.div
          aria-hidden
          className="absolute inset-x-0 top-0 origin-top rounded-full bg-[#8453f5]"
          style={{
            height: "100%",
            scaleY: fillScale,
          }}
        />
      </div>

      <div className="self-center">
        <h3 className="text-[20px] font-semibold tracking-tight text-[#0a0a0a] tablet:text-[24px]">
          {step.title}
        </h3>
        <p className="mt-2 text-[13px] leading-relaxed text-[#52525b] tablet:text-[14px]">
          {step.body}
        </p>
      </div>
    </div>
  );
}
