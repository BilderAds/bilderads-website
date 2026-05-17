"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

type Plan = "GOLD" | "BLACK DIAMOND";

type CaseEntry = {
  branche: string;
  stadt: string;
  umsatz: string;
  zeitraum: string;
  roas: string;
  cpl: string;
  quote: string;
  name: string;
  plan: Plan;
};

const CASES: CaseEntry[] = [
  {
    branche: "Gebäudereinigung",
    stadt: "Köln",
    umsatz: "300.000 €",
    zeitraum: "Umsatz in 3 Jahren",
    roas: "19x",
    cpl: "15,40 €",
    quote: "Bestes Geld das wir je ausgegeben haben.",
    name: "Max M., Inhaber",
    plan: "GOLD",
  },
  {
    branche: "Abflussreinigung",
    stadt: "Berlin",
    umsatz: "1.800.000 €",
    zeitraum: "Umsatz in 6 Monaten",
    roas: "24x",
    cpl: "12 €",
    quote: "Wir können kaum noch alle Aufträge annehmen.",
    name: "Tobias K., Inhaber",
    plan: "BLACK DIAMOND",
  },
  {
    branche: "Schlüsseldienst",
    stadt: "München",
    umsatz: "240.000 €",
    zeitraum: "Umsatz in 1 Jahr",
    roas: "16x",
    cpl: "19 €",
    quote: "Jeden Tag neue Anfragen. Stress in die richtige Richtung.",
    name: "Sandra W., Inhaberin",
    plan: "GOLD",
  },
  {
    branche: "Sanitär",
    stadt: "Hamburg",
    umsatz: "480.000 €",
    zeitraum: "Umsatz in 18 Monaten",
    roas: "14x",
    cpl: "22 €",
    quote: "Endlich planbare Aufträge statt Notfälle.",
    name: "Jörg P., Inhaber",
    plan: "GOLD",
  },
  {
    branche: "Entrümpelung",
    stadt: "Stuttgart",
    umsatz: "195.000 €",
    zeitraum: "Umsatz in 9 Monaten",
    roas: "12x",
    cpl: "28 €",
    quote: "Mein Kalender ist 3 Wochen voll.",
    name: "Daniel R., Inhaber",
    plan: "GOLD",
  },
  {
    branche: "Elektriker",
    stadt: "Frankfurt",
    umsatz: "320.000 €",
    zeitraum: "Umsatz in 14 Monaten",
    roas: "17x",
    cpl: "18 €",
    quote: "Wir haben den Werbeaufwand verdreifacht. Der Umsatz auch.",
    name: "Markus L., Inhaber",
    plan: "BLACK DIAMOND",
  },
];

/**
 * Cases + testimonials grid. 3 columns desktop, 1 column mobile,
 * scroll-reveal with stagger.
 */
export function Cases() {
  return (
    <section
      id="ergebnisse"
      className="relative w-full overflow-hidden bg-[#0a0a0a] py-24 md:py-28"
    >
      {/* Soft gradient toward #111 deeper down */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#0a0a0a] via-[#0d0d10] to-[#111] -z-10"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute top-1/4 left-1/2 h-[400px] w-[400px] -translate-x-1/2 rounded-full bg-[#7c3aed]/10 blur-[140px] -z-10"
      />

      <div className="mx-auto w-full max-w-7xl px-6 md:px-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mx-auto max-w-3xl text-center"
        >
          <h2 className="text-3xl leading-[1.05] font-semibold tracking-tight text-white md:text-5xl">
            2.300.000 €+ für unsere Kunden generiert.
          </h2>
          <p className="mt-5 text-base text-[#a1a1aa] md:text-lg">
            Echte Zahlen. Echte Aufträge. Echte Kunden.
          </p>
        </motion.div>

        <div className="mt-16 grid grid-cols-1 gap-5 md:mt-20 md:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          {CASES.map((entry, i) => (
            <motion.div
              key={`${entry.branche}-${entry.stadt}`}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{
                duration: 0.55,
                ease: "easeOut",
                delay: i * 0.1,
              }}
            >
              <CaseCard entry={entry} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CaseCard({ entry }: { entry: CaseEntry }) {
  return (
    <div
      className={cn(
        "group relative flex h-full flex-col rounded-2xl border border-white/10 bg-white/[0.02] p-7",
        "transition-all duration-300 ease-out",
        "hover:scale-[1.02] hover:border-[#7c3aed]/40 hover:bg-white/[0.04]",
        "hover:shadow-[0_20px_60px_-20px_rgba(124,58,237,0.4)]",
      )}
    >
      {/* Branche / Stadt */}
      <div className="text-xs font-medium tracking-wider text-[#a78bfa] uppercase">
        {entry.branche} · {entry.stadt}
      </div>
      <div className="mt-3 h-px w-12 bg-white/15" />

      {/* Big number */}
      <div className="mt-6">
        <div className="text-4xl leading-none font-semibold tracking-tight text-white md:text-[40px]">
          {entry.umsatz}
        </div>
        <div className="mt-2 text-sm text-[#a1a1aa]">{entry.zeitraum}</div>
      </div>

      {/* Stats row */}
      <div className="mt-6 grid grid-cols-2 gap-4">
        <Stat label="ROAS" value={entry.roas} />
        <Stat label="Cost per Lead" value={entry.cpl} />
      </div>

      {/* Quote */}
      <div className="mt-7 border-l-2 border-[#7c3aed]/60 pl-4">
        <p className="text-[15px] leading-snug text-white/90">
          &ldquo;{entry.quote}&rdquo;
        </p>
        <p className="mt-2 text-xs text-[#71717a]">— {entry.name}</p>
      </div>

      {/* Plan tag */}
      <div className="mt-7 pt-5 border-t border-white/5">
        <PlanTag plan={entry.plan} />
      </div>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="text-[10px] font-medium tracking-wider text-[#71717a] uppercase">
        {label}
      </div>
      <div className="mt-1 text-lg font-semibold text-white">{value}</div>
    </div>
  );
}

function PlanTag({ plan }: { plan: Plan }) {
  if (plan === "BLACK DIAMOND") {
    return (
      <span className="inline-flex items-center rounded-full bg-gradient-to-r from-[#7c3aed] via-[#6366f1] to-[#3b82f6] px-3 py-1 text-[10px] font-bold tracking-wider text-white uppercase shadow-[0_4px_20px_-4px_rgba(124,58,237,0.6)]">
        Black Diamond
      </span>
    );
  }

  return (
    <span className="inline-flex items-center rounded-full bg-[#7c3aed]/15 px-3 py-1 text-[10px] font-bold tracking-wider text-[#c4b5fd] uppercase ring-1 ring-[#7c3aed]/30">
      Gold
    </span>
  );
}
