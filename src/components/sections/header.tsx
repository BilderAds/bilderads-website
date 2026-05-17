"use client";

import { useEffect, useState } from "react";
import { BrandButton } from "@/components/ui/brand-button";
import { cn } from "@/lib/utils";

const NAV = [
  { label: "Ergebnisse", href: "#ergebnisse" },
  { label: "BilderAds", href: "#vorteile" },
  { label: "Websites", href: "#showcase" },
  { label: "Kostenlose Analyse", href: "#analyse" },
  { label: "Bewertungen", href: "#stimmen" },
  { label: "Preise", href: "#preise" },
  { label: "FAQ", href: "#faq" },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {/* Top accent bar with blinking dot */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-x-0 top-0 z-[55] flex h-px items-center justify-center"
      >
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#7c3aed]/70 to-transparent" />
        <span className="relative -top-[1px] inline-block h-2 w-2 rounded-full bg-[#a78bfa] shadow-[0_0_12px_2px_rgba(124,58,237,0.9)] motion-safe:animate-pulse" />
      </div>

      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-all duration-300",
          scrolled
            ? "border-b border-white/[0.06] bg-black/70 backdrop-blur-xl"
            : "border-b border-transparent bg-transparent",
        )}
      >
        {/* purple color-fade glow under header */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[180px] bg-gradient-to-b from-[#3a0460]/40 via-[#3a0460]/10 to-transparent"
        />

        <div className="mx-auto flex h-16 w-full max-w-[1440px] items-center justify-between px-5 tablet:h-[68px] tablet:px-10 desktop:px-20">
          {/* Logo */}
          <a
            href="#"
            aria-label="BilderAds"
            className="group inline-flex h-10 w-10 items-center justify-center rounded-[10px] bg-[#3a0460] ring-1 ring-white/10 transition-transform hover:scale-[1.04]"
          >
            <BaMark />
          </a>

          {/* Nav (desktop only) */}
          <nav className="hidden tablet:flex tablet:items-center tablet:gap-7">
            {NAV.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-[13px] font-medium text-white/65 transition-colors hover:text-white"
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* CTA right */}
          <BrandButton href="#analyse" size="sm">
            Mehr Kunden bekommen
          </BrandButton>
        </div>
      </header>
    </>
  );
}

function BaMark() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <path
        d="M5 4h8a5 5 0 0 1 3.4 8.7A5.2 5.2 0 0 1 13.6 20H5V4Zm3 3v4.2h4.7a2.1 2.1 0 1 0 0-4.2H8Zm0 7v4h5.2a2 2 0 1 0 0-4H8Z"
        fill="#fff"
      />
    </svg>
  );
}

/**
 * Spacer to push page content below the fixed header.
 * Use inside `<main>` right after the Header.
 */
export function HeaderSpacer() {
  return <div aria-hidden className="h-16 tablet:h-[68px]" />;
}
