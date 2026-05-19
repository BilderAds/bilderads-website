"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { z } from "zod";
import { FUNNEL_STEPS, type FunnelAnswers } from "@/lib/funnel-config";

const normalizeUrl = (raw: string) => {
  const trimmed = raw.trim();
  if (!trimmed) return trimmed;
  if (/^https?:\/\//i.test(trimmed)) return trimmed;
  return `https://${trimmed}`;
};

const TOTAL_STEPS = FUNNEL_STEPS.length + 1;

export default function FunnelStartPage() {
  const t = useTranslations("funnel");
  const router = useRouter();

  const contactSchema = useMemo(
    () =>
      z.object({
        name: z.string().min(2, t("errors.name")),
        email: z
          .string()
          .min(1, t("errors.email"))
          .email(t("errors.emailInvalid")),
        website: z
          .string()
          .min(1, t("errors.website"))
          .transform(normalizeUrl)
          .pipe(z.string().url(t("errors.websiteInvalid"))),
      }),
    [t],
  );

  type ContactValues = z.infer<typeof contactSchema>;

  const [stepIdx, setStepIdx] = useState(0);
  const [answers, setAnswers] = useState<Partial<FunnelAnswers>>({});
  const [multi, setMulti] = useState<Record<string, string[]>>({});
  const [contact, setContact] = useState<ContactValues>({
    name: "",
    email: "",
    website: "",
  });
  const [agreed, setAgreed] = useState(false);
  const [contactErrors, setContactErrors] = useState<
    Partial<Record<keyof ContactValues | "agreed", string>>
  >({});
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const isContactStep = stepIdx === FUNNEL_STEPS.length;
  const currentStep = !isContactStep ? FUNNEL_STEPS[stepIdx] : null;
  const progress = ((stepIdx + 1) / TOTAL_STEPS) * 100;
  const multiSelected = currentStep?.multiple
    ? multi[currentStep.id] ?? []
    : [];
  const selected = currentStep
    ? currentStep.multiple
      ? multiSelected.length > 0
        ? multiSelected.join(", ")
        : undefined
      : answers[currentStep.id]
    : undefined;

  const advance = () => setStepIdx((s) => s + 1);

  const pickSingle = (value: string) => {
    if (!currentStep) return;
    setAnswers((prev) => ({ ...prev, [currentStep.id]: value }));
    setTimeout(advance, 180);
  };

  const toggleMulti = (value: string) => {
    if (!currentStep) return;
    const id = currentStep.id;
    setMulti((prev) => {
      const cur = prev[id] ?? [];
      const nextArr = cur.includes(value)
        ? cur.filter((v) => v !== value)
        : [...cur, value];
      const joined = nextArr.join(", ");
      setAnswers((a) => ({ ...a, [id]: joined }));
      return { ...prev, [id]: nextArr };
    });
  };

  const next = () => {
    if (currentStep && !selected) return;
    advance();
  };

  const back = () => setStepIdx((s) => Math.max(0, s - 1));

  const submit = async () => {
    const result = contactSchema.safeParse(contact);
    const errs: Partial<Record<keyof ContactValues | "agreed", string>> = {};
    if (!result.success) {
      for (const issue of result.error.issues) {
        const key = issue.path[0] as keyof ContactValues;
        if (!errs[key]) errs[key] = issue.message;
      }
    }
    if (!agreed) errs.agreed = t("contact.agreeError");
    if (Object.keys(errs).length > 0 || !result.success) {
      setContactErrors(errs);
      return;
    }
    setContactErrors({});
    setSubmitting(true);
    setSubmitError(null);
    try {
      const parts = result.data.name.trim().split(/\s+/);
      const firstname = parts[0] ?? "";
      const lastname = parts.slice(1).join(" ");
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          answers,
          contact: {
            name: result.data.name.trim(),
            firstname,
            lastname,
            email: result.data.email,
            website: result.data.website,
          },
        }),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body?.error ?? "Submit fehlgeschlagen");
      }
      const params = new URLSearchParams({
        email: contact.email,
        firstname: firstname,
      });
      if (answers.hilfe) params.set("hilfe", answers.hilfe);
      router.push(`/funnel-erfolg?${params.toString()}`);
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : "Unbekannter Fehler");
      setSubmitting(false);
    }
  };

  return (
    <main className="relative flex min-h-svh flex-col items-center bg-black text-white">
      <div aria-hidden className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute top-[-15%] left-1/2 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-[#3a0560]/45 blur-[150px]" />
        <div className="absolute bottom-[-25%] left-1/2 h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-[#2a0049]/45 blur-[160px]" />
      </div>

      {/* Header */}
      <header className="sticky top-0 z-20 w-full border-b border-white/[0.06] bg-black/70 backdrop-blur-xl">
        <div className="mx-auto flex h-[60px] w-full max-w-md items-center justify-between px-5">
          <Link href="/" aria-label="BilderAds" className="inline-flex h-9 w-9 items-center justify-center transition-transform hover:scale-[1.04]">
            <Image
              src="/bilderads-logo.png"
              alt="BilderAds"
              width={72}
              height={72}
              priority
              className="h-9 w-9"
            />
          </Link>
          <button
            type="button"
            aria-label="Menü"
            className="inline-flex h-9 w-9 items-center justify-center rounded-md text-white/70 transition-colors hover:text-white"
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden>
              <line x1="4" y1="7" x2="20" y2="7" />
              <line x1="4" y1="12" x2="20" y2="12" />
              <line x1="4" y1="17" x2="20" y2="17" />
            </svg>
          </button>
        </div>
        <div className="h-[3px] w-full bg-white/[0.04]">
          <motion.div
            initial={false}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="h-full bg-gradient-to-r from-[#3a0560] via-[#7c3aed] to-[#b554fa]"
          />
        </div>
      </header>

      {/* Step card */}
      <section className="relative flex w-full max-w-md flex-1 flex-col items-center px-5 pt-8 pb-12">
        <div className="inline-flex items-center gap-1.5 rounded-full bg-[#3a0560]/50 px-3 py-1 text-[11px] font-semibold tracking-wide text-[#d6c2ff] ring-1 ring-[#b554fa]/40 backdrop-blur">
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-[#b554fa] motion-safe:animate-pulse" />
          {t("scarcity")}
        </div>

        {!isContactStep ? (
          <p className="mt-7 text-center text-[12px] font-semibold tracking-wider text-white/55 uppercase">
            {t("kicker")}
          </p>
        ) : (
          <p className="mt-7 text-center text-[12px] font-semibold tracking-wider text-[#a78bfa] uppercase">
            {t("lastStep")}
          </p>
        )}

        <AnimatePresence mode="wait">
          {currentStep ? (
            <motion.div
              key={`step-${stepIdx}`}
              initial={{ opacity: 0, x: 16 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -16 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="w-full"
            >
              <h1 className="mt-5 text-balance text-center text-[22px] leading-[1.25] font-semibold text-white">
                {t(`questions.${currentStep.id}`)}
              </h1>

              <div
                className={
                  currentStep.layout === "grid2"
                    ? "mt-8 grid grid-cols-2 gap-2.5"
                    : "mt-8 flex flex-col gap-2.5"
                }
              >
                {currentStep.options.map((opt, optIdx) => {
                  const isMulti = !!currentStep.multiple;
                  const isSelected = isMulti
                    ? multiSelected.includes(opt.value)
                    : answers[currentStep.id] === opt.value;
                  const optLabels = t.raw(
                    `options.${currentStep.id}`,
                  ) as string[];
                  const label = optLabels[optIdx] ?? opt.value;
                  return (
                    <button
                      key={opt.value}
                      type="button"
                      onClick={() =>
                        isMulti ? toggleMulti(opt.value) : pickSingle(opt.value)
                      }
                      className={`group rounded-[12px] border px-4 py-4 text-center text-[14px] font-medium transition-all duration-200 ${
                        isSelected
                          ? "border-[#b554fa] bg-[#3a0560]/60 text-white"
                          : "border-white/10 bg-white/[0.02] text-white/85 hover:border-[#b554fa]/60 hover:bg-white/[0.04]"
                      }`}
                    >
                      {label}
                    </button>
                  );
                })}
              </div>

              {currentStep.multiple ? (
                <p className="mt-3 text-center text-[12px] text-white/45">
                  {t("multiHint")}
                </p>
              ) : null}

              <div className="mt-8 flex items-center gap-3">
                {stepIdx > 0 ? (
                  <button
                    type="button"
                    onClick={back}
                    className="inline-flex flex-1 items-center justify-center rounded-[12px] border border-white/10 bg-white/[0.02] py-3.5 text-[14px] font-medium text-white/75 transition-colors hover:border-white/20 hover:text-white"
                  >
                    {t("back")}
                  </button>
                ) : null}
                {currentStep.multiple ? (
                  <button
                    type="button"
                    onClick={next}
                    disabled={!selected}
                    className="inline-flex flex-1 items-center justify-center rounded-[12px] bg-[#b554fa] py-3.5 text-[14px] font-semibold text-white shadow-[0_10px_28px_-10px_rgba(181,84,250,0.65)] transition-all duration-200 hover:bg-[#c069ff] hover:shadow-[0_14px_36px_-12px_rgba(181,84,250,0.8)] active:translate-y-[1px] disabled:cursor-not-allowed disabled:opacity-40 disabled:shadow-none"
                  >
                    {t("next")}
                  </button>
                ) : null}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="contact"
              initial={{ opacity: 0, x: 16 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -16 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="w-full"
            >
              <h1 className="mt-5 whitespace-pre-line text-balance text-center text-[22px] leading-[1.25] font-semibold text-white">
                {t("contact.title")}
              </h1>
              <p className="mx-auto mt-3 max-w-xs text-center text-[13px] leading-relaxed text-white/55">
                {t("contact.sub")}
              </p>
              <p className="mt-2 text-center text-[12px] text-[#a78bfa]">
                {t("contact.noSpam")}
              </p>

              <form
                className="mt-7 flex flex-col gap-3.5"
                onSubmit={(e) => {
                  e.preventDefault();
                  submit();
                }}
                noValidate
              >
                <FunnelField
                  label={t("contact.name")}
                  value={contact.name}
                  error={contactErrors.name}
                  onChange={(v) => setContact((c) => ({ ...c, name: v }))}
                  placeholder={t("contact.namePh")}
                  autoComplete="name"
                />
                <FunnelField
                  label={t("contact.email")}
                  type="email"
                  value={contact.email}
                  error={contactErrors.email}
                  onChange={(v) => setContact((c) => ({ ...c, email: v }))}
                  placeholder={t("contact.emailPh")}
                  autoComplete="email"
                />
                <FunnelField
                  label={t("contact.website")}
                  type="url"
                  value={contact.website}
                  error={contactErrors.website}
                  onChange={(v) => setContact((c) => ({ ...c, website: v }))}
                  placeholder={t("contact.websitePh")}
                  autoComplete="url"
                />

                <label className="mt-1 flex items-start gap-2.5 text-left text-[12px] leading-snug text-white/55">
                  <input
                    type="checkbox"
                    checked={agreed}
                    onChange={(e) => setAgreed(e.target.checked)}
                    className="mt-0.5 h-4 w-4 shrink-0 cursor-pointer rounded border border-white/20 bg-white/[0.04] accent-[#b554fa]"
                  />
                  <span>
                    {t.rich("contact.agree", {
                      link: (chunks) => (
                        <Link
                          href="/datenschutz"
                          className="text-[#a78bfa] underline-offset-2 hover:underline"
                        >
                          {chunks}
                        </Link>
                      ),
                    })}
                  </span>
                </label>
                {contactErrors.agreed ? (
                  <span className="text-[12px] text-red-400">{contactErrors.agreed}</span>
                ) : null}

                <button
                  type="submit"
                  disabled={submitting}
                  className="mt-3 inline-flex items-center justify-center rounded-[12px] bg-[#b554fa] py-4 text-[14px] font-semibold text-white shadow-[0_10px_28px_-10px_rgba(181,84,250,0.65)] transition-all duration-200 hover:bg-[#c069ff] hover:shadow-[0_14px_36px_-12px_rgba(181,84,250,0.8)] active:translate-y-[1px] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {submitting ? t("contact.submitting") : t("contact.submit")}
                </button>
                {submitError ? (
                  <p className="text-center text-[12px] text-red-400">
                    {submitError}
                  </p>
                ) : null}

                <button
                  type="button"
                  onClick={back}
                  className="inline-flex items-center justify-center rounded-[12px] border border-white/10 bg-white/[0.02] py-3.5 text-[14px] font-medium text-white/75 transition-colors hover:border-white/20 hover:text-white"
                >
                  {t("back")}
                </button>
              </form>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="mt-10 flex items-center gap-1.5 text-[11px] font-medium text-white/45">
          <svg viewBox="0 0 24 24" className="h-3 w-3" fill="currentColor" aria-hidden>
            <path d="M12 1L4 5v6c0 5.55 3.84 10.74 8 12 4.16-1.26 8-6.45 8-12V5l-8-4z" />
          </svg>
          {t("trust")}
        </div>
      </section>
    </main>
  );
}

function FunnelField({
  label,
  value,
  error,
  onChange,
  type = "text",
  autoComplete,
  placeholder,
}: {
  label: string;
  value: string;
  error?: string;
  onChange: (v: string) => void;
  type?: string;
  autoComplete?: string;
  placeholder?: string;
}) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-[11px] font-medium tracking-wide text-white/55">
        {label}
      </span>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        autoComplete={autoComplete}
        placeholder={placeholder}
        className={`w-full rounded-[10px] border bg-white/[0.02] px-4 py-3 text-[14px] text-white placeholder:text-white/30 outline-none transition-all ${
          error
            ? "border-red-500/60 focus:border-red-500"
            : "border-white/10 focus:border-[#b554fa]/60 focus:bg-white/[0.04]"
        }`}
      />
      {error ? <span className="text-[12px] text-red-400">{error}</span> : null}
    </label>
  );
}
