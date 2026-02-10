# planned-port

Digital Noir portfolio for Rithik Reddy. Monorepo powered by Turborepo and pnpm.

## Tech Stack & Libraries
- Framework: Next.js 14 (App Router), React 18, TypeScript
- Styling: Tailwind CSS, PostCSS, Autoprefixer
- Motion: Framer Motion, GSAP, Lenis (smooth scroll)
- Icons: Lucide React
- State: Zustand (theme store)
- Fonts: Geist (plus custom DM Sans/Aeonik-style stack)
- Testing: Vitest
- Tooling: Turborepo, pnpm workspaces
- Database package: Prisma (`@planned-port/database`)

## Monorepo Structure
- `apps/web` — portfolio site (Next.js app)
- `packages/ui` — shared React UI package
- `packages/config` — shared configuration package
- `packages/database` — Prisma client + schema tooling

## `apps/web` App Layout
- `app/layout.tsx` — global layout; smooth scroll, theme toggle, CV button, footer branding
- `app/page.tsx` — page composition (Hero, Narrative, Projects, Skills, Contact)
- `app/fonts.ts` — font setup (Geist + display stack)
- `app/globals.css` — global styles, CSS variables, theme base
- `tailwind.config.ts` — Tailwind config
- `hooks/use-theme-store.ts` — Zustand theme store
- `lib/content.ts` — experience + project data
- `lib/types.ts` — `Project` + `Experience` type definitions

## Components

### Sections (`apps/web/components/sections`)
- `hero.tsx` — hero poster, identity block, animated headline
- `hero-reveal-wrapper.tsx` — header cover/curtain logic (snap/unlock scroll flow)
- `about.tsx` — dual-identity header + 4-node data grid
- `narrative.tsx` — “Command Centre” experience layout
- `projects.tsx` — projects grid + hover previews + modal details
- `skills.tsx` — skills section
- `contact.tsx` — contact + CTA block
- `footer-branding.tsx` — fixed footer branding line

### Motion (`apps/web/components/motion`)
- `smooth-scroll.tsx` — Lenis integration
- `cursor-spotlight.tsx` — cursor spotlight effect

### UI (`apps/web/components/ui`)
- `theme-toggle.tsx` — theme switcher
- `cv-button.tsx` — CV download / link button

## Features & Behavior
- Digital Noir styling with dark theme defaults
- Header cover that snaps out to unlock scroll flow
- “Command Centre” narrative layout with sticky controller and scrollable cards
- Projects grid with hover video previews and modal details
- Smooth scrolling via Lenis and micro-interactions via Framer Motion

## Getting Started
1. Install dependencies
   - `pnpm install`
2. Run the dev server
   - `pnpm dev`

## Scripts
- `pnpm dev` — run all apps in dev mode
- `pnpm build` — build all apps
- `pnpm lint` — lint all apps
- `pnpm test` — run tests (if configured)

## Notes
- This repo uses pnpm workspaces and Turborepo tasks.
- The main app lives in `apps/web`.
