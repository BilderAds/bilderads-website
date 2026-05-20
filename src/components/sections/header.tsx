"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useTranslations, useLocale } from "next-intl";
import { Link, usePathname, useRouter } from "@/i18n/navigation";
import { BrandButton } from "@/components/ui/brand-button";
import { cn } from "@/lib/utils";
import type { Locale } from "@/i18n/routing";
import { AnimatePresence, motion } from "framer-motion";

const NAV_KEYS = [
  { key: "ergebnisse", href: "/#ergebnisse" },
  { key: "bilderads", href: "/#vorteile" },
  { key: "websites", href: "/#showcase" },
  { key: "analyse", href: "/funnel-start" },
  { key: "bewertungen", href: "/#stimmen" },
  { key: "preise", href: "/#preise" },
  { key: "faq", href: "/#faq" },
] as const;

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const t = useTranslations("header");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled
          ? "border-b border-white/[0.06] bg-black/70 backdrop-blur-xl"
          : "border-b border-transparent bg-transparent",
      )}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[180px] bg-gradient-to-b from-[#3a0460]/40 via-[#3a0460]/10 to-transparent"
      />

      <div className="mx-auto flex h-[82px] w-full max-w-[1440px] items-center justify-between px-5 tablet:h-[92px] tablet:px-10 desktop:px-20">
        <Link
          href="/"
          aria-label="BilderAds"
          className="group inline-flex h-11 w-11 items-center justify-center transition-transform hover:scale-[1.04]"
        >
          <Image
            src="/bilderads-logo.png"
            alt="BilderAds"
            width={88}
            height={88}
            priority
            className="h-11 w-11"
          />
        </Link>

        <nav className="hidden tablet:flex tablet:items-center tablet:gap-8">
          {NAV_KEYS.map((item) => (
            <a
              key={item.key}
              href={item.href}
              className="text-[15px] font-medium text-white/65 transition-colors hover:text-white"
            >
              {t(`nav.${item.key}`)}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-3 tablet:flex tablet:gap-4">
          <LocaleSwitcher />
          <BrandButton href="/funnel-start" size="md">
            {t("cta")}
          </BrandButton>
        </div>

        <button
          type="button"
          onClick={() => setMenuOpen((o) => !o)}
          aria-label={menuOpen ? "Menü schließen" : "Menü öffnen"}
          aria-expanded={menuOpen}
          className="-mr-1.5 inline-flex h-11 w-11 items-center justify-center text-white transition-opacity hover:opacity-70 tablet:hidden"
        >
          {menuOpen ? <CloseIcon /> : <BurgerIcon />}
        </button>
      </div>

      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </header>
  );
}

function BurgerIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden>
      <path d="M3 6h18M3 12h18M3 18h18" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden>
      <path d="M6 6l12 12M18 6L6 18" />
    </svg>
  );
}

function MobileMenu({ open, onClose }: { open: boolean; onClose: () => void }) {
  const t = useTranslations("header");
  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 top-[82px] z-40 flex flex-col gap-2 border-t border-white/[0.06] bg-black/95 px-5 pt-6 pb-10 backdrop-blur-xl tablet:hidden"
        >
          <nav className="flex flex-col">
            {NAV_KEYS.map((item) => (
              <a
                key={item.key}
                href={item.href}
                onClick={onClose}
                className="flex min-h-[52px] items-center border-b border-white/[0.06] text-[17px] font-medium text-white/80 transition-colors hover:text-white"
              >
                {t(`nav.${item.key}`)}
              </a>
            ))}
          </nav>

          <div className="mt-6 flex items-center justify-between gap-4">
            <LocaleSwitcher />
            <BrandButton href="/funnel-start" size="md" className="flex-1">
              {t("cta")}
            </BrandButton>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

function LocaleSwitcher() {
  const router = useRouter();
  const pathname = usePathname();
  const locale = useLocale() as Locale;
  const t = useTranslations("header.localeSwitch");

  const toggle = () => {
    const next: Locale = locale === "de" ? "en" : "de";
    router.replace(pathname, { locale: next });
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={t("label")}
      className="inline-flex min-h-[40px] items-center gap-1 rounded-full border border-white/15 bg-white/[0.03] px-3 py-2 text-[13px] font-semibold tracking-wide text-white/80 transition-all hover:border-[#b554fa]/60 hover:bg-white/[0.06] hover:text-white"
    >
      <span className={locale === "de" ? "text-white" : "text-white/40"}>
        {t("de")}
      </span>
      <span className="mx-0.5 inline-block h-3 w-px bg-white/15" />
      <span className={locale === "en" ? "text-white" : "text-white/40"}>
        {t("en")}
      </span>
    </button>
  );
}

export function HeaderSpacer() {
  return <div aria-hidden className="h-[82px] tablet:h-[92px]" />;
}
