'use client';

import SoftAurora from "./SoftAurora";

const PATTERNS = [
  { counts: '4 in · 7 hold · 8 out', label: 'The long exhale — for winding down at the end of a day' },
  { counts: '4 · 4 · 4 · 4', label: 'Box breathing — for resetting between blocks' },
  { counts: '5 · 5', label: 'Coherent breathing — for the long, even stretch of work' }
];


export const BreathingSection = () => (
  <section id="breathing" className="relative overflow-hidden py-14 md:py-32">
    <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <SoftAurora
            speed={0.6}
            scale={1.5}
            brightness={0.4}
            color1="#E4E4E7"
            color2="#71717A"
            bandHeight={0.35}
            bandSpread={1}
            enableMouseInteraction
            mouseInfluence={0.25}
            spectrum={0}
            colorSpeed={1}
            noiseFrequency={1.5}
            noiseAmplitude={0.75}
            tilt={0}
            octaveDecay={0.1}
            layerOffset={0}
            clickPulse={false}
            intro
            lightMode={false}
        />
    </div>

    <div className="container mx-auto">
      <div className="mx-auto max-w-3xl text-left md:text-center">
        <span className="text-xs font-medium tracking-[0.2em] text-white/50 uppercase">Breathing</span>
        <h2 className="mt-4 text-3xl font-semibold tracking-tight text-balance md:text-4xl">
          Breathe with the round, not against it
        </h2>
        <p className="mt-6 text-lg leading-relaxed text-balance text-muted-foreground md:text-xl">
          Ending a block shouldn&rsquo;t mean the app simply goes quiet. When the timer closes, Pomoist
          thins the mix and lays a slow count over it, so the break is spent on a breath instead of on
          reaching for the next thing.
        </p>
        <p className="mt-4 text-lg leading-relaxed text-balance text-muted-foreground md:text-xl">
          Pick the pattern that matches the moment. The pacer runs through the whole rest, then hands
          you back to the round with the sounds already where you left them.
        </p>
      </div>

      <div className="mx-auto mt-16 flex max-w-2xl flex-col gap-px overflow-hidden rounded-[24px] bg-white/[0.02] backdrop-blur-lg">
        {PATTERNS.map(pattern => (
          <div
            key={pattern.counts}
            className="flex flex-col items-center gap-1 px-6 py-6 text-center md:flex-row md:items-baseline md:gap-6 md:text-left"
          >
            <span className="shrink-0 text-lg font-semibold tracking-tight tabular-nums text-white md:w-52">
              {pattern.counts}
            </span>
            <span className="text-sm leading-relaxed text-muted-foreground md:text-base">
              {pattern.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  </section>
);
