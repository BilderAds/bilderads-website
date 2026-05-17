"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BrandButton } from "@/components/ui/brand-button";

type Quote = {
  text: string;
  name: string;
  role: string;
  plan: "Gold" | "Black Diamond";
};

const QUOTES: Quote[] = [
  {
    text: "Was uns überzeugt hat, war die Struktur und das klare System. Alles ist nachvollziehbar und top geplant.",
    name: "Leonard",
    role: "Inhaber",
    plan: "Black Diamond",
  },
  {
    text: "Bestes Geld das wir je ausgegeben haben. Anfragen kommen jede Woche rein, ich muss nichts mehr selber tun.",
    name: "Max M.",
    role: "Gebäudereinigung Köln",
    plan: "Gold",
  },
  {
    text: "Wir können kaum noch alle Aufträge annehmen. Endlich planbare Aufträge statt Feuerwehr-Modus.",
    name: "Tobias K.",
    role: "Abflussreinigung Hannover",
    plan: "Black Diamond",
  },
];

export function Reviews() {
  const [idx, setIdx] = useState(0);
  const total = QUOTES.length;
  const quote = QUOTES[idx];

  useEffect(() => {
    const id = setInterval(() => {
      setIdx((n) => (n + 1) % total);
    }, 7000);
    return () => clearInterval(id);
  }, [total]);

  return (
    <section
      id="stimmen"
      className="relative w-full overflow-hidden bg-black py-15 tablet:py-20 desktop:py-30"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute top-0 left-1/2 h-[360px] w-[600px] -translate-x-1/2 rounded-full bg-[#3a0460]/35 blur-[160px]"
      />

      <div className="relative mx-auto w-full max-w-3xl px-5 text-center tablet:px-10 desktop:px-20">
        <h2 className="sr-only">Was unsere Kunden sagen</h2>

        <AnimatePresence mode="wait">
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.45, ease: "easeOut" }}
          >
            <p className="text-balance text-[24px] leading-[1.25] font-semibold tracking-tight text-white md:text-[32px] md:leading-[1.22]">
              &ldquo;{quote.text}&rdquo;
            </p>

            <div className="mt-7 flex flex-col items-center gap-3">
              <Stars />
              <div className="text-[14px] font-medium text-white">
                {quote.name}
              </div>
              <div className="text-[12px] text-white/55">
                {quote.role} · Plan {quote.plan}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        <div className="mt-8 flex items-center justify-center gap-2">
          {QUOTES.map((_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Stimme ${i + 1}`}
              onClick={() => setIdx(i)}
              className={`h-1.5 rounded-full transition-all ${
                i === idx ? "w-7 bg-[#7c3aed]" : "w-1.5 bg-white/20"
              }`}
            />
          ))}
        </div>

        <div className="mt-10 flex justify-center">
          <BrandButton href="#analyse" size="md">
            Jetzt Analyse starten
          </BrandButton>
        </div>
      </div>
    </section>
  );
}

function Stars() {
  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          viewBox="0 0 24 24"
          fill="currentColor"
          className="h-4 w-4 text-[#a78bfa]"
          aria-hidden
        >
          <path d="m12 2.5 2.92 6.74 7.33.65-5.55 4.83 1.68 7.16L12 18.27l-6.38 3.61 1.68-7.16L1.75 9.89l7.33-.65L12 2.5Z" />
        </svg>
      ))}
    </div>
  );
}
