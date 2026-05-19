"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { BrandButton } from "@/components/ui/brand-button";
import { container, fadeUp, fadeUpLg } from "@/lib/motion";

type Plan = "Gold" | "Black Diamond";

type Review = {
  text: string;
  name: string;
  plan: Plan;
};

export function Reviews() {
  const t = useTranslations("reviews");
  const allReviews = t.raw("items") as Review[];
  const ROW_A = allReviews.slice(0, 4);
  const ROW_B = allReviews.slice(4, 8);

  return (
    <section
      id="stimmen"
      className="relative w-full overflow-hidden bg-black py-15 tablet:py-20 desktop:py-30"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute top-1/2 left-1/2 h-[420px] w-[820px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#3a0460]/30 blur-[160px]"
      />

      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-80px" }}
        className="relative mx-auto w-full max-w-[1440px] px-5 tablet:px-10 desktop:px-20"
      >
        <div className="mx-auto max-w-5xl text-center">
          <motion.h2
            variants={fadeUpLg}
            className="text-[22px] leading-[1.2] font-semibold tracking-tight text-balance text-white tablet:text-[30px] desktop:text-[40px]"
          >
            {t("headline")}
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className="mx-auto mt-4 max-w-xl text-[15px] leading-relaxed text-white/65 tablet:text-[16px]"
          >
            {t("subline")}
          </motion.p>
        </div>

        <motion.div variants={fadeUp} className="relative mt-12 tablet:mt-16">
          <MarqueeRow reviews={ROW_A} duration={48} reverse={false} />
          <div className="h-5 tablet:h-6" />
          <MarqueeRow reviews={ROW_B} duration={56} reverse />

          <div
            aria-hidden
            className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-black to-transparent tablet:w-32"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-black to-transparent tablet:w-32"
          />
        </motion.div>

        <motion.div variants={fadeUp} className="mt-12 flex justify-center tablet:mt-16">
          <BrandButton href="/funnel-start" size="md">
            {t("cta")}
          </BrandButton>
        </motion.div>
      </motion.div>
    </section>
  );
}

function MarqueeRow({
  reviews,
  duration,
  reverse,
}: {
  reviews: Review[];
  duration: number;
  reverse: boolean;
}) {
  const doubled = [...reviews, ...reviews];
  return (
    <div className="overflow-hidden">
      <div
        className="flex w-max gap-4 tablet:gap-5"
        style={{
          animation: `${reverse ? "marquee-right" : "marquee-left"} ${duration}s linear infinite`,
        }}
      >
        {doubled.map((r, i) => (
          <ReviewCard key={i} review={r} />
        ))}
      </div>
    </div>
  );
}

function ReviewCard({ review }: { review: Review }) {
  const initials = review.name
    .split(/\s+/)
    .map((p) => p[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  const ringColor =
    review.plan === "Black Diamond"
      ? "ring-white/15"
      : "ring-[#7c3aed]/30";

  return (
    <div
      className={`relative flex w-[300px] shrink-0 flex-col justify-between rounded-2xl border border-white/8 bg-white/[0.03] p-6 ring-1 ${ringColor} tablet:w-[360px]`}
      style={{ minHeight: 220 }}
    >
      <Stars />
      <p className="mt-4 text-[14px] leading-relaxed text-white/90 tablet:text-[15px]">
        &ldquo;{review.text}&rdquo;
      </p>
      <div className="mt-6 flex items-center gap-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-[#3a0460] to-[#1a0030] text-[12px] font-semibold text-white ring-1 ring-white/15">
          {initials}
        </div>
        <div className="flex flex-col">
          <span className="text-[13px] font-semibold text-white">
            {review.name}
          </span>
          <span className="text-[11px] text-white/55">{review.plan}</span>
        </div>
      </div>
    </div>
  );
}

function Stars() {
  return (
    <div className="flex items-center gap-1.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          viewBox="0 0 24 24"
          fill="currentColor"
          className="h-5 w-5 text-[#a78bfa]"
          aria-hidden
        >
          <path d="m12 2.5 2.92 6.74 7.33.65-5.55 4.83 1.68 7.16L12 18.27l-6.38 3.61 1.68-7.16L1.75 9.89l7.33-.65L12 2.5Z" />
        </svg>
      ))}
    </div>
  );
}
