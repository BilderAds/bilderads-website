import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kostenlose Analyse — Mehr zahlende Kunden",
  description:
    "Beantworte 7 Fragen und sichere dir deine kostenlose Analyse. In 1 Minute zu mehr zahlenden Kunden.",
  robots: {
    index: false,
    follow: true,
  },
  alternates: {
    canonical: "https://bilderads.de/funnel-start",
  },
};

export default function FunnelStartLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
