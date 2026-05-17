# CLAUDE.md — BilderAds Website

Briefing for future Cee sessions working on this repo.

## What this is

Brand-new Next.js implementation of **bilderads.de**, replacing the Framer build. Long-term home for the marketing site plus future lead-gen tools and dashboards.

## Stack

- **Next.js 15+** App Router, TypeScript, ESLint
- **Tailwind CSS v4** (PostCSS plugin, no separate config file by default)
- **shadcn/ui** (New York, neutral, CSS vars) — components live in `src/components/ui/`
- **framer-motion** for animations
- **lucide-react** for icons
- **react-hook-form** + **zod** for forms
- **pnpm** as package manager (run `pnpm install`, `pnpm dev`, `pnpm build`)

## Conventions

- All page sections go in `src/components/sections/` — one file per section (Hero, Pain, Solution, Cases, Process, Pricing, FAQ, CTA, Footer ...).
- `src/app/page.tsx` is the assembly point: imports section components in order.
- Use the `@/*` import alias (e.g. `import { Hero } from "@/components/sections/hero"`).
- Use the `cn` helper from `@/lib/utils` for class merging.
- Use shadcn primitives where they exist; only roll custom when needed.
- Tailwind v4 syntax: CSS vars in `globals.css`, no `tailwind.config.ts` needed.
- Always `lang="de"`. Copy follows the BilderAds Copywriting Master (see `/Users/victoria/Projekte/BilderAds/copywriting_master.md`).

## Design language

Must mimic the existing bilderads.de (Framer build). Key elements:

- **Dark theme** — base `#0a0a0a`, off-white text
- **Purple accent** — start with `#6366f1` (indigo-500) and iterate
- **Hero** — Particles / animated background, large headline
- **Marquee sliders** — for tool logos + customer logos (`public/logos/white/`)
- **Animated cards** — framer-motion fade/slide on viewport entry
- **Section spacing** — generous vertical rhythm (py-24 / py-32)
- **Typography** — Inter, tight tracking on headlines, comfortable line height on body

Source assets for reference live at `/Users/victoria/Projekte/BilderAds/framer_components/` and screenshots at `/Users/victoria/Projekte/BilderAds/dokumente/`.

## Avatar + copy rules

- Single avatar: **lokaler Dienstleister, Inhaber 25-40, hungrig** (see global memory `project_bilderads_single_niche_pivot`)
- Site = Trust Layer, not Funnel — Sale happens on call/DM, Site validates trust
- Copy must pass the **Drunk-Grandma-Test** (3.-Klasse-Sprache, no buzzwords, no dashes as stylistic element)
- Standard cases: Köln 300k Anfragen / 15,40€ CPL / 3 Jahre + Abfluss 1,8 Mio in 6 Monaten

## Logos

`public/logos/` contains:
- `white/` — white-only tool/customer logos for dark backgrounds
- `text-white/` — logo + brand name combo, white
- `branchen/` — industry icons
- Root level — colored versions

## Don't

- Don't push `.env*.local` or secrets
- Don't break the Framer site — DNS still points there
- Don't add Turbopack flags (we explicitly disabled it during scaffold)
- Don't use emojis in committed source unless Kevin asks
- Don't introduce dashes (— or -) as stylistic separators in German copy
