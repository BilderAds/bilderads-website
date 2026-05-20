import { setRequestLocale } from "next-intl/server";
import { Header, HeaderSpacer } from "@/components/sections/header";
import { Hero } from "@/components/sections/hero";
import { StructuredData } from "@/components/seo/structured-data";
import { Cases } from "@/components/sections/cases";
import { Pain } from "@/components/sections/pain";
import { Solution } from "@/components/sections/solution";
import { Process } from "@/components/sections/process";
import { Showcase } from "@/components/sections/showcase";
import { Reviews } from "@/components/sections/reviews";
import { Pricing } from "@/components/sections/pricing";
import { FAQ } from "@/components/sections/faq";
import { FooterCTA } from "@/components/sections/footer-cta";
import { Footer } from "@/components/sections/footer";
import type { Locale } from "@/i18n/routing";

export default async function Home({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <main className="relative min-h-screen bg-black text-white">
      <StructuredData />
      <Header />
      <HeaderSpacer />
      <Hero />
      <Cases />
      <Pain />
      <Solution />
      <Process />
      <Showcase />
      <Reviews />
      <Pricing />
      <FAQ />
      <FooterCTA />
      <Footer />
    </main>
  );
}
