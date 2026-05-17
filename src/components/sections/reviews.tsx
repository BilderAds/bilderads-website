"use client";

import { motion } from "framer-motion";
import { Section } from "@/components/ui/section";
import { cn } from "@/lib/utils";

type Review = {
  quote: string;
  name: string;
  position: string;
  firma: string;
  metric?: string;
};

const REVIEWS: Review[] = [
  {
    quote: "15,40 € pro Auftrag bei 300k Umsatz. Seit 3 Jahren mit BilderAds.",
    name: "Max M.",
    position: "Inhaber",
    firma: "Gebäudereinigung Köln",
    metric: "ROAS 19x · 36 Monate",
  },
  {
    quote: "In 6 Monaten 1,8 Mio Umsatz nur über Google Ads.",
    name: "Tobias K.",
    position: "Geschäftsführer",
    firma: "Abflussreinigung Berlin",
    metric: "1,8 Mio Umsatz · 6 Monate",
  },
  {
    quote: "Wir können kaum noch alle Aufträge annehmen. Gutes Problem.",
    name: "Sandra W.",
    position: "Inhaberin",
    firma: "Schlüsseldienst München",
  },
  {
    quote: "Endlich planbare Aufträge statt nur Notfälle.",
    name: "Jörg P.",
    position: "Geschäftsführer",
    firma: "Sanitär Hamburg",
  },
  {
    quote: "Mein Kalender ist 3 Wochen voll.",
    name: "Daniel R.",
    position: "Inhaber",
    firma: "Entrümpelung Stuttgart",
  },
  {
    quote: "Wir haben den Werbeaufwand verdreifacht. Den Umsatz auch.",
    name: "Markus L.",
    position: "Inhaber",
    firma: "Elektriker Frankfurt",
  },
];

/**
 * Reviews / Stimmen section. 3-column grid (1 mobile) with 6 review cards.
 * Quote in italic + name/position/firma + optional metric line in purple.
 */
export function Reviews() {
  return (
    <Section id="stimmen" className="bg-[#0a0a0a]">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="mx-auto max-w-3xl text-center"
      >
        <h2 className="text-3xl leading-[1.05] font-semibold tracking-tight text-white md:text-5xl">
          Was unsere Kunden sagen.
        </h2>
        <p className="mt-5 text-base text-[#a1a1aa] md:text-lg">
          Echte Stimmen. Keine Stock-Photos.
        </p>
      </motion.div>

      <div className="mt-14 grid grid-cols-1 gap-5 md:mt-20 md:grid-cols-2 md:gap-6 lg:grid-cols-3">
        {REVIEWS.map((review, i) => (
          <motion.div
            key={review.name + review.firma}
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{
              duration: 0.55,
              ease: "easeOut",
              delay: i * 0.08,
            }}
          >
            <ReviewCard review={review} />
          </motion.div>
        ))}
      </div>

      {/* Trust strip */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="mt-14 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-center text-sm text-[#a1a1aa] md:text-base"
      >
        <span>100+ lokale Betriebe vertrauen uns</span>
        <span aria-hidden className="text-[#71717a]">·</span>
        <span>4,9 ★ Google Reviews</span>
        <span aria-hidden className="text-[#71717a]">·</span>
        <span>Seit 2022</span>
      </motion.div>
    </Section>
  );
}

function ReviewCard({ review }: { review: Review }) {
  return (
    <div
      className={cn(
        "group relative flex h-full flex-col rounded-2xl border border-white/10 bg-white/[0.02] p-8",
        "transition-all duration-300 ease-out",
        "hover:border-[#7c3aed]/40 hover:bg-white/[0.04]",
        "hover:shadow-[0_20px_60px_-20px_rgba(124,58,237,0.4)]",
      )}
    >
      <p className="text-[18px] leading-[1.55] font-medium text-white italic">
        &ldquo;{review.quote}&rdquo;
      </p>

      <div className="mt-6 flex-1" />

      <div className="mt-6 border-t border-white/5 pt-5">
        <div className="text-sm font-semibold text-white">{review.name}</div>
        <div className="mt-0.5 text-sm text-[#a1a1aa]">
          {review.position}, {review.firma}
        </div>
        {review.metric && (
          <div className="mt-3 text-xs font-medium tracking-wide text-[#a78bfa]">
            {review.metric}
          </div>
        )}
      </div>
    </div>
  );
}
