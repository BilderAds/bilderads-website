import { Hero } from "@/components/sections/hero";
import { Slider } from "@/components/sections/slider";
import { Cases } from "@/components/sections/cases";
import { Pain } from "@/components/sections/pain";
import { Solution } from "@/components/sections/solution";
import { Process } from "@/components/sections/process";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white">
      <Hero />
      <Slider />
      <Cases />
      <Pain />
      <Solution />
      <Process />
    </main>
  );
}
