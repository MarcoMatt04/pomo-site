# Pomoist — landing site

Marketing site for Pomoist, the desktop focus app: pomodoro and
flowmodoro timers, a mixable ambient sound library, and an FM radio you tune by hand.
Everything the app plays is generated in the browser, so the site shows the real thing
instead of screenshots.

## Stack

- **Next.js 16** (App Router, Turbopack) · **React 19** · **TypeScript**
- **Tailwind CSS 4** (via `@tailwindcss/turbopack`)
- **GSAP** and **motion** for the section animations
- **ogl** (hero ribbons) and **three** (paper crumple) for the WebGL pieces
- Node's built-in test runner (`node --test`) for the unit tests — no test framework

## Getting started

```bash
pnpm install          # pnpm 12 (see packageManager), Node >= 22.18
pnpm dev              # http://localhost:3000
```

`NEXT_PUBLIC_SITE_URL` is the canonical URL baked into metadata and Open Graph tags at
build time. It defaults to `http://localhost:3000`, so local builds need no config:

```bash
NEXT_PUBLIC_SITE_URL=https://pomoist.app pnpm build
```

## Scripts

| Command | What it does |
| --- | --- |
| `pnpm dev` | Dev server |
| `pnpm build` | Production build (`.next`, standalone output) |
| `pnpm start` | Serve a production build |
| `pnpm lint` | ESLint (warnings are expected in the animation components) |
| `pnpm test` | `node --test` over `tests/` |

## Layout

```
app/                  routes, layout, metadata, globals.css
components/           section components + the animation/WebGL primitives they use
  motion/ ui/         shared building blocks (accordion, kbd, bubble menu, …)
lib/                  utilities (cn, the FM synth the radio section plays)
public/               sounds/ (cover jpgs + webm clips), notes/, hero video, app icon
tests/                unit tests for cn, the synth, and the timer rule
```

The FM radio on the page is the same synth the app ships: a step sequencer rendered to
audio in `lib/streamui/audio/synth.ts`, driven by the UI in
`components/streamui/radio-lab.tsx`. Nothing about it is pre-rendered.

Each heavy section is wrapped in an error boundary (`SectionGuard` in
`app/home/page.tsx`), so a WebGL context that fails costs one section, not the page.

## Docker

```bash
docker compose build --build-arg NEXT_PUBLIC_SITE_URL=https://pomoist.app
docker compose up -d          # port 3000
```

The image is a multi-stage build: `deps` → `build` → a standalone `runner` that ships
only `public/`, `.next/static` and the standalone server.