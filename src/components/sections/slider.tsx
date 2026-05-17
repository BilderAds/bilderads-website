"use client";

import Image from "next/image";
import { Marquee } from "@/components/ui/marquee";

type LogoItem = {
  src: string;
  alt: string;
  width: number;
};

const BRANCHEN: LogoItem[] = [
  { src: "/logos/branchen/gebaeudereinigung.svg", alt: "Gebäudereinigung", width: 200 },
  { src: "/logos/branchen/schluesseldienst.svg", alt: "Schlüsseldienst", width: 200 },
  { src: "/logos/branchen/sanitaer.svg", alt: "Sanitär", width: 200 },
  { src: "/logos/branchen/entruempelung.svg", alt: "Entrümpelung", width: 200 },
  { src: "/logos/branchen/glaserei.svg", alt: "Glaserei", width: 200 },
  { src: "/logos/branchen/elektriker.svg", alt: "Elektriker", width: 200 },
  { src: "/logos/branchen/ungezieferbekaempfung.svg", alt: "Ungezieferbekämpfung", width: 200 },
];

const TOOLS: LogoItem[] = [
  { src: "/logos/text-white/google-ads.svg", alt: "Google Ads", width: 140 },
  { src: "/logos/text-white/facebook.svg", alt: "Facebook", width: 140 },
  { src: "/logos/text-white/instagram.svg", alt: "Instagram", width: 140 },
  { src: "/logos/text-white/tiktok.svg", alt: "TikTok", width: 140 },
  { src: "/logos/text-white/whatsapp.svg", alt: "WhatsApp", width: 140 },
  { src: "/logos/text-white/chatgpt.svg", alt: "ChatGPT", width: 140 },
  { src: "/logos/text-white/photoshop.svg", alt: "Photoshop", width: 140 },
  { src: "/logos/text-white/google-analytics.svg", alt: "Google Analytics", width: 160 },
];

/**
 * Two stacked infinite marquees: industries on top moving left,
 * tools below moving right.
 */
export function Slider() {
  return (
    <section className="relative w-full overflow-hidden bg-[#0a0a0a] py-20 md:py-24">
      <div className="mx-auto w-full max-w-7xl px-6 md:px-10">
        {/* Branchen */}
        <p className="mb-8 text-center text-sm font-medium tracking-wide text-[#71717a] uppercase">
          Für diese Branchen funktioniert&apos;s
        </p>

        <Marquee direction="left" speed={32} gap="gap-20">
          {BRANCHEN.map((logo) => (
            <LogoTile key={logo.alt} logo={logo} height={48} />
          ))}
        </Marquee>

        {/* Spacer */}
        <div className="h-16 md:h-20" />

        {/* Tools */}
        <p className="mb-8 text-center text-sm font-medium tracking-wide text-[#71717a] uppercase">
          Mit diesen Tools
        </p>

        <Marquee direction="right" speed={32} gap="gap-16">
          {TOOLS.map((logo) => (
            <LogoTile key={logo.alt} logo={logo} height={36} />
          ))}
        </Marquee>
      </div>
    </section>
  );
}

function LogoTile({ logo, height }: { logo: LogoItem; height: number }) {
  return (
    <div
      className="flex shrink-0 items-center justify-center opacity-70 transition-opacity duration-200 hover:opacity-100"
      style={{ height }}
    >
      <Image
        src={logo.src}
        alt={logo.alt}
        width={logo.width}
        height={height}
        style={{ height: `${height}px`, width: "auto" }}
        className="object-contain"
        unoptimized
      />
    </div>
  );
}
