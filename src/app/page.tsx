import { Hero } from "@/components/sections/hero";
import { Slider } from "@/components/sections/slider";
import { Cases } from "@/components/sections/cases";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white">
      <Hero />
      <Slider />
      <Cases />
    </main>
  );
}
