import { WakeGlyph } from '@/components/ui/background-ascii-wake';

// The contact address used by this section and the footer.
const CONTACT_EMAIL = 'mattei04@proton.me';

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

        {/* Restore the Ko-fi card here once the page exists:
            "Pomoist is free and stays that way. If it earns a place in your day:"
            + a blue #29abe0 button linking to the live Ko-fi page. It is hidden
            for now because the page is not published — a button that opens
            nothing is worse than no button. */}
      </div>
    </div>
  </section>
);
