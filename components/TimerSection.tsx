'use client';

import { useEffect, useState } from 'react';

import Counter from '@/components/Counter';
import MagicRings from '@/components/MagicRings';

const BLOCK = 25 * 60;

const METHODS = [
  {
    label: 'Pomodoro',
    text: 'Work in fixed 25-minute blocks, then take 5 minutes off — and a longer rest after every fourth block. The deadline is set before you start, so deciding when to stop is never part of the work.'
  },
  {
    label: 'Flowmodoro',
    text: 'Start the timer when you sit down and let it run while you stay in flow. When you finally surface, you log how long you actually worked and rest for exactly that long — depth first, accounting after.'
  },
  {
    label: 'Sleep Timer',
    text: 'Set a duration before you lie down and the mix puts itself to bed: levels fade to nothing, playback stops, and the session closes on its own so you never reach for the screen in the dark.'
  }
];

const TimerRings = () => (
  <div
    aria-hidden
    className="pointer-events-none absolute -inset-32"
    style={{
      maskImage: 'radial-gradient(circle closest-side, #000 76%, transparent 100%)',
      WebkitMaskImage: 'radial-gradient(circle closest-side, #000 76%, transparent 100%)'
    }}
  >
    <MagicRings
      color="#ffffff"
      colorTwo="#a1a1a1"
      ringCount={5}
      motion="breathe"
      speed={0.5}
      lineThickness={1.5}
      glow={0.55}
      baseRadius={0.09}
      radiusStep={0.065}
      expansion={0.05}
      taper={1.6}
      opacity={0.7}
      intro
    />
  </div>
);

const TimerDial = () => {
  const [left, setLeft] = useState(BLOCK);

  useEffect(() => {
    const id = window.setInterval(() => setLeft(value => (value <= 1 ? BLOCK : value - 1)), 1000);
    return () => window.clearInterval(id);
  }, []);

  return (
    <div className="relative mx-auto aspect-square w-full max-w-[420px]">
      <TimerRings />
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
        <div className="flex items-baseline text-white">
          <Counter
            value={Math.floor(left / 60)}
            minDigits={2}
            fontSize={92}
            fontWeight={600}
            gap={2}
            duration={0.6}
            stagger={0.03}
          />
          <span className="px-1 text-4xl font-light text-white/40">:</span>
          <Counter
            value={left % 60}
            minDigits={2}
            fontSize={92}
            fontWeight={600}
            gap={2}
            duration={0.6}
            stagger={0.03}
          />
        </div>
        <span className="text-xs font-medium tracking-[0.2em] text-white/50 uppercase">
          focus block
        </span>
      </div>
    </div>
  );
};

export const TimerSection = () => (
  <section id="timer" className="relative overflow-hidden py-14 md:py-32">
    <div className="container mx-auto">
      <div className="mx-auto max-w-2xl text-left md:text-center">
        <span className="text-xs font-medium tracking-[0.2em] text-white/50 uppercase">Focus timer</span>
        <h2 className="mt-3 text-3xl font-semibold tracking-tight text-balance md:text-4xl">
          Two rhythms, one flow
        </h2>
        <p className="mt-4 text-lg leading-relaxed text-balance text-muted-foreground">
          Pomoist runs the way you work: a clock that keeps you honest, a clock that waits for you,
          and a clock that puts itself to bed. Every round still closes with a real break.
        </p>
      </div>

      <div className="mt-16 grid items-center gap-14 md:mt-20 md:grid-cols-2 md:gap-20">
        <div className="flex flex-col gap-10">
          {METHODS.map((method, index) => (
            <div key={method.label}>
              <span className="text-xs font-medium tracking-[0.2em] text-white/50 uppercase">
                {String(index + 1).padStart(2, '0')} — {method.label}
              </span>
              <p className="mt-3 text-base leading-relaxed text-muted-foreground">{method.text}</p>
            </div>
          ))}
        </div>

        <TimerDial />
      </div>
    </div>
  </section>
);
