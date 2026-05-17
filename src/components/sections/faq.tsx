"use client";

import { motion } from "framer-motion";
import { BrandButton } from "@/components/ui/brand-button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

type FaqItem = {
  q: string;
  a: string;
};

const FAQS: FaqItem[] = [
  {
    q: "Funktioniert das auch für mein Business?",
    a: "Wenn du lokaler Dienstleister bist (Maler, Elektriker, Sanitär, Reinigung, Glaser, Entrümpelung, Schlüsseldienst, Dachdecker) – ja. Wir testen das im Erstgespräch in 5 Minuten.",
  },
  {
    q: "Für wen ist BilderAds geeignet?",
    a: "Inhaber lokaler Dienstleister, die mehr zahlende Kunden wollen, ohne selber Werbung machen zu müssen. Du musst die Aufträge nur abarbeiten können.",
  },
  {
    q: "Macht ihr nur Creatives oder auch Strategie?",
    a: "Beides. Werbeanzeigen, Website, Google Business Profil, Zielgruppen, Budget, Reporting. Komplettes Performance-Setup, nicht nur hübsche Bilder.",
  },
  {
    q: "Schaltet ihr auch die Ads (Media Buying)?",
    a: "Ja. Google Ads, optional Facebook und Instagram (Black Diamond). Du musst nichts selber klicken.",
  },
  {
    q: "Wie läuft die Zusammenarbeit ab?",
    a: "1. Erstgespräch · 2. Onboarding-Call (60 Min) · 3. Wir bauen Ads + Website · 4. Anzeigen gehen live · 5. Wöchentlicher Performance-Bericht. Du musst nur dabei sein.",
  },
  {
    q: "Muss ich einen Call machen?",
    a: "Ja, einen kurzen. 30 Minuten. Wir gucken ob wir zusammen passen. Kein Verkaufsdruck, keine Folie.",
  },
  {
    q: "Was kostet BilderAds?",
    a: "Gold 3.000 € / Monat, Black Diamond 5.000 € / Monat. Dazu dein Google-Ads-Budget (zahlst direkt an Google). Mindestlaufzeit 3 Monate, danach monatlich kündbar.",
  },
  {
    q: "Arbeitet ihr mit jedem?",
    a: "Nein. Aktuell nehmen wir nur lokale Dienstleister, und auch nur wenn wir glauben, dass wir Ergebnisse liefern können. Nicht jede Branche, nicht jede Stadt.",
  },
  {
    q: "Was ist der Sinn des Lebens?",
    a: "Mehr zahlende Kunden für dein Business. Probier's mit dem Button unten.",
  },
];

export function FAQ() {
  return (
    <section
      id="faq"
      className="relative w-full bg-black py-15 tablet:py-20 desktop:py-30"
    >
      <div className="mx-auto w-full max-w-3xl px-5 tablet:px-10 desktop:px-20">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.55, ease: "easeOut" }}
          className="text-center"
        >
          <h2 className="text-[28px] leading-[1.3] tracking-[-0.015em] font-semibold text-white tablet:text-[36px] tablet:leading-[1.25] tablet:tracking-[-0.02em] desktop:text-[48px] desktop:leading-[1.2] desktop:tracking-[-0.025em]">
            Fragen und Antworten
            <br />
            <span className="text-white/70">rund um unsere BilderAds</span>
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.55, ease: "easeOut" }}
          className="mt-12 md:mt-14"
        >
          <Accordion type="single" collapsible className="flex flex-col gap-2.5">
            {FAQS.map((item, i) => (
              <AccordionItem
                key={item.q}
                value={`item-${i}`}
                className="rounded-[12px] border border-white/10 bg-white/[0.02] px-5 data-[state=open]:bg-white/[0.04]"
              >
                <AccordionTrigger className="py-4 text-left text-[14px] font-semibold tracking-tight text-white hover:no-underline md:text-[15px] [&>svg]:!size-4 [&>svg]:!text-white/55">
                  {item.q}
                </AccordionTrigger>
                <AccordionContent className="text-[13.5px] leading-relaxed text-white/65 md:text-[14px]">
                  {item.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>

        <div className="mt-10 flex justify-center">
          <BrandButton href="#analyse" size="md">
            Jetzt mehr Kunden bekommen
          </BrandButton>
        </div>
      </div>
    </section>
  );
}
