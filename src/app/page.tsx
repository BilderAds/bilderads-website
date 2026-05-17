import { Hero } from "@/components/sections/hero";
import { Slider } from "@/components/sections/slider";
import { Cases } from "@/components/sections/cases";
import { Pain } from "@/components/sections/pain";
import { Solution } from "@/components/sections/solution";
import { Process } from "@/components/sections/process";
import { Showcase } from "@/components/sections/showcase";
import { Reviews } from "@/components/sections/reviews";
import { Pricing } from "@/components/sections/pricing";
import { LeadMagnet } from "@/components/sections/lead-magnet";
import { FAQ } from "@/components/sections/faq";
import { FooterCTA } from "@/components/sections/footer-cta";
import { Footer } from "@/components/sections/footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white">
      <Hero />
      <Slider />
      <Cases />
      <Pain />
      <Solution />
      <Process />
      <Showcase />
      <Reviews />
      <Pricing />
      <LeadMagnet />
      <FAQ />
      <FooterCTA />
      <Footer />
    </main>
  );
}
