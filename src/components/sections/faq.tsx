"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { BrandButton } from "@/components/ui/brand-button";
import { containerFast, fadeUp } from "@/lib/motion";
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

export function FAQ() {
  const t = useTranslations("faq");
  const FAQS = t.raw("items") as FaqItem[];
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
            {t("headlineTop")}
            <br />
            <span className="text-white/70">{t("headlineBottom")}</span>
          </h2>
        </motion.div>

        <motion.div
          variants={containerFast}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          className="mt-12 md:mt-14"
        >
          <Accordion className="flex flex-col gap-2.5">
            {FAQS.map((item, i) => (
              <motion.div key={item.q} variants={fadeUp}>
                <AccordionItem
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
              </motion.div>
            ))}
          </Accordion>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
          className="mt-10 flex justify-center"
        >
          <BrandButton href="/funnel-start" size="md">
            {t("cta")}
          </BrandButton>
        </motion.div>
      </div>
    </section>
  );
}
