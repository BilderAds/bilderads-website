"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Header, HeaderSpacer } from "./header";
import { Footer } from "./footer";

export function LegalShell({
  title,
  kicker,
  updated,
  children,
}: {
  title: string;
  kicker?: string;
  updated?: string;
  children: React.ReactNode;
}) {
  const t = useTranslations("legal");

  return (
    <>
      <Header />
      <main className="flex-1 bg-black text-white">
        <HeaderSpacer />
        <section className="relative w-full overflow-hidden border-b border-white/[0.06] bg-black py-14 tablet:py-20 desktop:py-24">
          <div
            aria-hidden
            className="pointer-events-none absolute top-[-30%] left-1/2 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-[#3a0460]/40 blur-[150px]"
          />
          <div className="relative mx-auto w-full max-w-3xl px-5 tablet:px-10">
            {kicker ? (
              <div className="text-[12px] font-medium tracking-wide text-[#a78bfa] uppercase">
                {kicker}
              </div>
            ) : null}
            <h1 className="mt-3 text-[32px] leading-[1.15] tracking-[-0.02em] font-bold text-white tablet:text-[40px] desktop:text-[52px]">
              {title}
            </h1>
            {updated ? (
              <div className="mt-4 text-[13px] text-white/55">
                {t("updated", { date: updated })}
              </div>
            ) : null}
          </div>
        </section>

        <section className="relative w-full bg-black py-14 tablet:py-20">
          <div className="relative mx-auto w-full max-w-3xl px-5 tablet:px-10">
            <article className="legal-prose">{children}</article>

            <div className="mt-16 border-t border-white/[0.06] pt-8 text-[13px] text-white/55">
              <Link href="/" className="hover:text-white">
                {t("back")}
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
