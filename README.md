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

## The Download button

The Download button in the top bar links to the installer as a **GitHub release
asset** — not a file inside this site.

It cannot be a repo file or a `public/` asset:

- GitHub refuses any repo file over **100 MB**
- Vercel caps static uploads at **100 MB** (Hobby)
- GitHub release assets allow up to **2 GB**, cost nothing, and are served on a
  fast CDN with the right `content-disposition`

To publish a new version:

```bash
# in the app repo
pnpm desktop:build
# → src-tauri/target/release/bundle/nsis/Pomoist_<version>_x64-setup.exe

# upload it (116 MB is fine for a release asset)
gh release create v<version> \
  path/to/Pomoist_<version>_x64-setup.exe \
  --title "Pomoist <version>" --notes "What changed"
```

Then point `INSTALLER_URL` in `app/home/page.tsx` at
`https://github.com/<owner>/pomo-site/releases/download/v<version>/Pomoist_<version>_x64-setup.exe`.

`public/downloads/` still exists (git-ignored) only for the self-hosted Docker
path below, where a local file is easier than a release.

## Deploy on Vercel

1. Push to GitHub — import the repo on Vercel.
2. Set the env var **before the first build** (it is baked in, not read at
   runtime): `NEXT_PUBLIC_SITE_URL` = the final domain, e.g.
   `https://pomoist.app`. Without it, canonical URLs, Open Graph tags and
   `sitemap.xml` fall back to `http://localhost:3000`.
3. Deploy. No Vercel-specific config is needed — the Next.js build is detected
   automatically.

To check locally with the same value you will deploy with:

```bash
NEXT_PUBLIC_SITE_URL=https://your-domain pnpm build && pnpm start
```

## Docker (self-hosting alternative)

```bash
docker compose build --build-arg NEXT_PUBLIC_SITE_URL=https://pomoist.app
docker compose up -d          # port 3000
```

The image is a multi-stage build: `deps` → `build` → a standalone `runner` that ships
only `public/`, `.next/static` and the standalone server.