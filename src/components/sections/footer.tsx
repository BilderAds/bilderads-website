"use client";

type LinkItem = {
  label: string;
  href: string;
};

const QUICK_LINKS: LinkItem[] = [
  { label: "Ergebnisse", href: "#ergebnisse" },
  { label: "Preise", href: "#preise" },
  { label: "FAQ", href: "#faq" },
  { label: "Kontakt", href: "#kontakt" },
];

const LEGAL_LINKS: LinkItem[] = [
  { label: "Impressum", href: "/impressum" },
  { label: "Datenschutz", href: "/datenschutz" },
  { label: "AGB", href: "/agb" },
];

/**
 * Site footer. 4-column on desktop (Brand / Quick Links / Rechtliches / Kontakt),
 * stacks on mobile. Bottom strip with copyright.
 */
export function Footer() {
  return (
    <footer className="relative w-full border-t border-white/10 bg-[#0a0a0a]">
      <div className="mx-auto w-full max-w-7xl px-6 py-14 md:px-10 md:py-20">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-4 md:gap-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="text-xl font-semibold tracking-tight text-white">
              BilderAds
            </div>
            <p className="mt-3 text-sm leading-relaxed text-[#a1a1aa]">
              Performance Marketing für lokale Dienstleister.
            </p>
          </div>

          {/* Quick Links */}
          <FooterColumn title="Quick Links">
            {QUICK_LINKS.map((link) => (
              <FooterLink key={link.label} href={link.href}>
                {link.label}
              </FooterLink>
            ))}
          </FooterColumn>

          {/* Rechtliches */}
          <FooterColumn title="Rechtliches">
            {LEGAL_LINKS.map((link) => (
              <FooterLink key={link.label} href={link.href}>
                {link.label}
              </FooterLink>
            ))}
          </FooterColumn>

          {/* Kontakt */}
          <FooterColumn title="Kontakt">
            <FooterLink href="mailto:info@bilderads.de">
              info@bilderads.de
            </FooterLink>
            <div className="text-sm text-[#a1a1aa]">+49 [Nummer]</div>
            <div className="mt-2 flex items-center gap-3">
              <a
                href="#"
                aria-label="Instagram"
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/[0.02] text-[#a1a1aa] transition-all hover:border-[#7c3aed]/40 hover:bg-white/[0.04] hover:text-white"
              >
                <InstagramIcon />
              </a>
              <a
                href="#"
                aria-label="TikTok"
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/[0.02] text-[#a1a1aa] transition-all hover:border-[#7c3aed]/40 hover:bg-white/[0.04] hover:text-white"
              >
                <TikTokIcon />
              </a>
            </div>
          </FooterColumn>
        </div>

        {/* Bottom strip */}
        <div className="mt-14 border-t border-white/10 pt-8 text-center text-xs text-[#71717a] md:mt-20">
          © 2026 BilderAds. Alle Rechte vorbehalten.
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="text-xs font-medium tracking-wider text-[#71717a] uppercase">
        {title}
      </div>
      <div className="mt-4 flex flex-col gap-2.5">{children}</div>
    </div>
  );
}

function FooterLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      className="text-sm text-[#a1a1aa] transition-colors hover:text-white"
    >
      {children}
    </a>
  );
}

function InstagramIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

function TikTokIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
    >
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5.8 20.1a6.34 6.34 0 0 0 10.86-4.43V8.83a8.16 8.16 0 0 0 4.77 1.52V6.9a4.85 4.85 0 0 1-1.84-.21Z" />
    </svg>
  );
}
