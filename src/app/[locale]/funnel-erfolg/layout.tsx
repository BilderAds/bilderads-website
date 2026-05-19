import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Danke — Termin buchen",
  description: "Danke für deine Anfrage. Buche jetzt direkt deinen Termin.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function FunnelErfolgLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
