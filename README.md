# BilderAds Website

Marketing site for **BilderAds.de** — Google Ads, Website & Anzeigen für lokale Dienstleister.

This project replaces the Framer-built bilderads.de with a fully custom Next.js implementation. It will grow to include lead-gen tools, dashboards, and case study pages.

## Tech Stack

- **Next.js 15+** (App Router, TypeScript, Turbopack disabled for stability)
- **Tailwind CSS v4**
- **shadcn/ui** (New York style, neutral base, CSS vars)
- **framer-motion** — animations
- **lucide-react** — icons
- **react-hook-form** + **zod** + **@hookform/resolvers** — forms
- **clsx** + **tailwind-merge** + **class-variance-authority** — styling utilities
- **pnpm** package manager

## Local Development

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

## Folder Structure

```
src/
  app/                    # Next.js App Router pages
  components/
    sections/             # Page sections (Hero, Pain, Solution, Cases, ...)
    ui/                   # shadcn/ui components
  lib/                    # Utilities (cn, helpers)
  styles/                 # Extra global CSS (if needed)
public/
  logos/                  # Brand + customer + tool logos
    white/                # White-only logo variants
    text-white/           # Logo + text combo, white version
    branchen/             # Industry/niche logos
```

## Deployment

Connected to Vercel — `main` branch auto-deploys to a preview URL. DNS for bilderads.de stays on Framer until cutover is approved.
