"use client";

import { Suspense, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import Script from "next/script";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Header, HeaderSpacer } from "@/components/sections/header";
import { Footer } from "@/components/sections/footer";

const CALENDLY_URL =
  process.env.NEXT_PUBLIC_CALENDLY_URL ??
  "https://calendly.com/bilderads/kostenlose-website";

function CalendlyEmbed({ email, firstname }: { email?: string; firstname?: string }) {
  const t = useTranslations("thankYou");
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const dataUrl = useMemo(() => {
    const params = new URLSearchParams();
    if (email) params.set("email", email);
    if (firstname) params.set("name", firstname);
    params.set("hide_event_type_details", "0");
    params.set("hide_gdpr_banner", "1");
    params.set("primary_color", "b554fa");
    params.set("text_color", "ffffff");
    params.set("background_color", "0a0a0a");
    return `${CALENDLY_URL}?${params.toString()}`;
  }, [email, firstname]);

  return (
    <div className="relative w-full">
      <Script
        src="https://assets.calendly.com/assets/external/widget.js"
        strategy="lazyOnload"
      />
      {/* Loading skeleton until Calendly hydrates */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center rounded-2xl">
        <div className="flex items-center gap-2 text-[12px] text-white/45">
          <span className="inline-block h-2 w-2 animate-pulse rounded-full bg-[#b554fa]" />
          {t("loading")}
        </div>
      </div>
      {mounted ? (
        <div
          className="calendly-inline-widget relative w-full overflow-hidden rounded-2xl border border-white/10 bg-[#0a0a0a]"
          data-url={dataUrl}
          style={{ minWidth: "320px", height: "720px" }}
        />
      ) : (
        <div
          className="relative w-full overflow-hidden rounded-2xl border border-white/10 bg-[#0a0a0a]"
          style={{ minHeight: "720px" }}
        />
      )}
    </div>
  );
}

function FunnelErfolgContent() {
  const params = useSearchParams();
  const t = useTranslations("thankYou");
  const email = params.get("email") ?? undefined;
  const firstname = params.get("firstname") ?? undefined;
  const hilfe = params.get("hilfe") ?? "";

  const includesWebsite = hilfe.toLowerCase().includes("website");

  return (
    <main className="relative min-h-screen bg-black text-white">
      <Header />
      <HeaderSpacer />

      <section className="relative w-full overflow-hidden bg-black pt-12 pb-20 tablet:pt-20 tablet:pb-28">
        <div
          aria-hidden
          className="pointer-events-none absolute top-[-20%] left-1/2 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-[#3a0560]/45 blur-[150px]"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute bottom-[-25%] left-1/2 h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-[#2a0049]/45 blur-[160px]"
        />

        <div className="relative mx-auto w-full max-w-3xl px-5 tablet:px-10">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="text-center"
          >
            {firstname ? (
              <div className="inline-flex items-center gap-2 rounded-full bg-[#3a0560]/40 px-3.5 py-1.5 text-[12px] font-medium text-[#d6c2ff] ring-1 ring-[#b554fa]/40">
                <span className="inline-block h-1.5 w-1.5 rounded-full bg-[#b554fa] motion-safe:animate-pulse" />
                {t("danke", { name: firstname })}
              </div>
            ) : null}
            <h1 className="mt-5 text-[28px] leading-[1.15] font-semibold tracking-tight text-white tablet:text-[40px] desktop:text-[48px]">
              {t("headline")}
            </h1>
          </motion.div>

          <div className="mt-10 flex flex-col gap-4 tablet:mt-14 tablet:gap-5">
            {includesWebsite ? (
              <StepCard
                index={1}
                state="done"
                title={t("steps.websiteDone")}
                delay={0.05}
              />
            ) : null}

            <StepCard
              index={includesWebsite ? 2 : 1}
              state="active"
              title={
                includesWebsite ? t("steps.termin") : t("steps.terminCall")
              }
              delay={0.15}
            >
              <p className="text-[14px] leading-relaxed text-white/65 tablet:text-[15px]">
                {includesWebsite
                  ? t("steps.terminSubWebsite")
                  : t("steps.terminSub")}
              </p>

              <div className="mt-5">
                <CalendlyEmbed email={email} firstname={firstname} />
              </div>

              <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-1.5 text-[12px] text-white/55 tablet:text-[13px]">
                <span className="inline-flex items-center gap-1.5">
                  <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 text-[#a78bfa]" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                    <circle cx="12" cy="12" r="10" />
                    <polyline points="12 6 12 12 16 14" />
                  </svg>
                  {t("steps.duration")}
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 text-[#a78bfa]" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                    <line x1="12" y1="1" x2="12" y2="23" />
                    <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                  </svg>
                  {t("steps.cost")}
                </span>
              </div>
            </StepCard>

            <StepCard
              index={includesWebsite ? 3 : 2}
              state="upcoming"
              title={t("steps.besprechung")}
              delay={0.25}
            >
              <p className="text-[14px] leading-relaxed text-white/65 tablet:text-[15px]">
                {t("steps.besprechungBody")}
              </p>
              <p className="mt-3 text-[14px] leading-relaxed text-white/80 tablet:text-[15px]">
                {t("steps.besprechungPunch")}
              </p>
            </StepCard>
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="mt-10 text-center text-[13px] text-white/45"
          >
            {t("noFit")}{" "}
            <a
              href="mailto:info@bilderads.de"
              className="text-[#a78bfa] underline-offset-4 transition-colors hover:text-[#d6c2ff] hover:underline"
            >
              info@bilderads.de
            </a>
            .
          </motion.p>
        </div>
      </section>

      <Footer />
    </main>
  );
}

function StepCard({
  index,
  state,
  title,
  delay,
  children,
}: {
  index: number;
  state: "done" | "active" | "upcoming";
  title: string;
  delay: number;
  children?: React.ReactNode;
}) {
  const isDone = state === "done";
  const isActive = state === "active";

  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay }}
      className={`rounded-[18px] border p-6 transition-colors tablet:p-7 ${
        isActive
          ? "border-[#b554fa]/40 bg-[#3a0560]/15"
          : isDone
            ? "border-white/10 bg-white/[0.03]"
            : "border-white/10 bg-white/[0.02]"
      }`}
    >
      <div className="flex items-start gap-4">
        <StepBadge index={index} state={state} />
        <div className="flex-1">
          <h2
            className={`text-[16px] font-semibold tracking-tight tablet:text-[18px] ${
              isDone ? "text-white/55 line-through" : "text-white"
            }`}
          >
            {index}. {title}
          </h2>
          {children ? <div className="mt-4">{children}</div> : null}
        </div>
      </div>
    </motion.div>
  );
}

function StepBadge({
  index,
  state,
}: {
  index: number;
  state: "done" | "active" | "upcoming";
}) {
  if (state === "done") {
    return (
      <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#22c55e]/15 text-[#4ade80] ring-1 ring-[#22c55e]/40">
        <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          <polyline points="20 6 9 17 4 12" />
        </svg>
      </span>
    );
  }
  if (state === "active") {
    return (
      <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#b554fa]/15 text-[14px] font-semibold text-[#d6c2ff] ring-1 ring-[#b554fa]/50">
        {index}
      </span>
    );
  }
  return (
    <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/[0.04] text-[14px] font-semibold text-white/55 ring-1 ring-white/10">
      {index}
    </span>
  );
}

export default function FunnelErfolgPage() {
  return (
    <Suspense fallback={null}>
      <FunnelErfolgContent />
    </Suspense>
  );
}
