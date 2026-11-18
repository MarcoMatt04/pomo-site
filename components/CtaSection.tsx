import { WakeGlyph } from '@/components/ui/background-ascii-wake';

// shortcut: static mockup of the Ko-fi widget button, wire it up when the page goes live
const CONTACT_EMAIL = 'company@email.com';

export const CtaSection = () => (
  <section id="cta" className="relative overflow-hidden py-14 md:py-32">
    <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
      <WakeGlyph cellSize={12} className="h-full w-full" />
    </div>

    <div className="container mx-auto">
      <div className="mx-auto flex max-w-2xl flex-col items-center text-center">
        <span className="text-xs font-medium tracking-[0.2em] text-white/50 uppercase">
          Get in touch
        </span>
        <h2 className="mt-4 text-3xl font-semibold tracking-tight text-balance md:text-5xl">
          Start your first round today
        </h2>
        <p className="mt-5 text-sm leading-relaxed text-balance text-muted-foreground md:text-xl">
          Questions, bugs, ideas — they all land in the same inbox, and a person answers.
        </p>

        <a
          href={`mailto:${CONTACT_EMAIL}`}
          className="mt-10 text-xl font-medium text-foreground underline decoration-white/20 underline-offset-8 transition-colors hover:decoration-white/60 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white/40 md:text-2xl"
        >
          {CONTACT_EMAIL}
        </a>

        <div className="mt-14 flex flex-col items-center gap-4">
          <span className="text-sm text-white/40 max-w-xs">
            Pomoist is free and stays that way. If it earns a place in your day:
          </span>
          <button
            type="button"
            className="inline-flex items-center gap-2 rounded-xl bg-[#29abe0] px-3 py-3 text-[15px] font-bold text-white"
          >
            <svg
              viewBox="0 0 24 24"
              aria-hidden
              className="size-[22px]"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.9}
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M4 9h12v6a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4V9Z" />
              <path d="M16 10.5h1.5a2.25 2.25 0 0 1 0 4.5H16" />
              <path d="M7.5 3.5c-.7.9-1 1.6-1 2.2 0 .7.4 1.2 1 1.8" />
              <path d="M11.5 3.5c-.7.9-1 1.6-1 2.2 0 .7.4 1.2 1 1.8" />
            </svg>
            Support me on Ko-fi
          </button>
        </div>
      </div>
    </div>
  </section>
);
