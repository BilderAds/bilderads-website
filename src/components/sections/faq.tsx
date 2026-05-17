"use client";

import { motion } from "framer-motion";
import { Section } from "@/components/ui/section";
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
    q: "Für wen passt BilderAds, und für wen nicht?",
    a: "Wir arbeiten mit lokalen Dienstleistern: Gebäudereinigung, Schlüsseldienst, Sanitär, Entrümpelung, Glaserei, Elektriker, Ungezieferbekämpfung. Wenn du E-Commerce, Coaching oder Software verkaufst, sind wir nicht der Richtige.",
  },
  {
    q: "Wie schnell kommen die ersten Anfragen?",
    a: "Erste Anfragen meistens in der zweiten Woche. Nach 4 bis 6 Wochen wissen wir genau welche Anzeigen am besten funktionieren. Dann skaliert's.",
  },
  {
    q: "Was passiert wenn keine Anfragen kommen?",
    a: "Garantie: Nach 3 Monaten ohne Anfragen arbeiten wir gratis weiter bis sie kommen. Wir haben das bisher nie gebraucht.",
  },
  {
    q: "Brauche ich eine eigene Website?",
    a: "Nein. Wir bauen dir eine neue, schnelle Landing Page für deine Stadt und Branche. Die ist im Preis enthalten.",
  },
  {
    q: "Wie viel Werbebudget brauche ich zusätzlich?",
    a: "Empfehlung: 500 bis 2.000 € pro Monat Google Ads Budget am Anfang. Skaliert mit deinen Anfragen. Du zahlst direkt an Google, nicht an uns.",
  },
  {
    q: "Was unterscheidet euch von anderen Agenturen?",
    a: "Wir spezialisieren uns nur auf lokale Dienstleister. Keine E-Com, kein B2B-SaaS, kein Coaching. Daher kennen wir jede Branche, jede Stadt, jede Saison.",
  },
  {
    q: "Wer ist mein Ansprechpartner?",
    a: "Kevin. Direkt. WhatsApp und Telefon. Kein Account-Manager, kein Ticket-System.",
  },
  {
    q: "Wie lange ist die Mindestlaufzeit?",
    a: "3 Monate Mindestlaufzeit. Danach monatlich kündbar. Wir wollen Ergebnisse zeigen, nicht binden.",
  },
  {
    q: "Was kostet's wirklich am Ende?",
    a: "3.000 € pro Monat an uns, plus dein eigenes Google Ads Budget (500 bis 2.000 € pro Monat). Onboarding 1.500 € einmalig. Alles transparent, keine versteckten Kosten.",
  },
  {
    q: "Was muss ich tun?",
    a: "Step 1: 30 Min Call. Step 2: 1 Onboarding-Call (1 Std). Danach 15 Min pro Monat für Reporting. Mehr brauchst du nicht.",
  },
];

/**
 * FAQ section. shadcn Accordion with 10 items. Single column, max-w-3xl.
 */
export function FAQ() {
  return (
    <Section id="faq" className="bg-[#0a0a0a]">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="mx-auto max-w-3xl text-center"
      >
        <h2 className="text-3xl leading-[1.05] font-semibold tracking-tight text-white md:text-5xl">
          Die meistgestellten Fragen.
        </h2>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.55, ease: "easeOut" }}
        className="mx-auto mt-14 w-full max-w-3xl md:mt-16"
      >
        <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02]">
          <Accordion>
            {FAQS.map((item, i) => (
              <AccordionItem
                key={item.q}
                value={`item-${i}`}
                className="border-white/10 px-6 md:px-7"
              >
                <AccordionTrigger className="py-5 text-left text-[16px] font-semibold tracking-tight text-white hover:no-underline md:py-6 md:text-[18px] [&>svg]:!size-5 [&>svg]:!text-[#a78bfa]">
                  {item.q}
                </AccordionTrigger>
                <AccordionContent className="text-[15px] leading-relaxed text-[#a1a1aa] md:text-base">
                  {item.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </motion.div>
    </Section>
  );
}
