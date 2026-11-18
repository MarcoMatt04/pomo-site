'use client';

import { useState } from 'react';

import WakeSlider from '@/components/WakeSlider';

const BANDS = [
  { name: 'Delta', range: '0.5 – 4 Hz', note: 'deep rest and sleep' },
  { name: 'Theta', range: '4 – 8 Hz', note: 'drifting, half-asleep focus' },
  { name: 'Alpha', range: '8 – 13 Hz', note: 'the reading hour' },
  { name: 'Beta', range: '13 – 30 Hz', note: 'sharp, alert work' }
];

const bandFor = (beat: number) => {
  if (beat < 4) return 'Delta';
  if (beat < 8) return 'Theta';
  if (beat < 13) return 'Alpha';
  return 'Beta';
};

const FrequencyDial = () => {
  const [carrier, setCarrier] = useState(300);
  const [beat, setBeat] = useState(10);

  const left = carrier;
  const right = carrier - beat;

  return (
    <div className="w-full max-w-md rounded-[24px] bg-white/[0.02] p-6 md:p-8">
      <div className="flex flex-col gap-8">
        <div>
          <div className="flex items-baseline justify-between gap-4">
            <span className="text-sm font-medium">Carrier tone</span>
            <span className="text-sm tabular-nums text-white/50">{carrier} Hz</span>
          </div>
          <p className="mt-1 text-xs text-white/40">The pitch both ears share.</p>
          <div className="mt-4">
            <WakeSlider
              value={carrier}
              onChange={setCarrier}
              min={200}
              max={500}
              step={1}
              bars={32}
              height={48}
              restHeight={10}
              showValue={false}
              fillColor="#f5f5f5"
              trackColor="#27272a"
              ariaLabel="Carrier tone in hertz"
            />
          </div>
        </div>

        <div>
          <div className="flex items-baseline justify-between gap-4">
            <span className="text-sm font-medium">Beat offset</span>
            <span className="text-sm tabular-nums text-white/50">{beat.toFixed(1)} Hz</span>
          </div>
          <p className="mt-1 text-xs text-white/40">The difference your brain has to build.</p>
          <div className="mt-4">
            <WakeSlider
              value={beat}
              onChange={setBeat}
              min={0.5}
              max={30}
              step={0.5}
              bars={32}
              height={48}
              restHeight={10}
              showValue={false}
              formatValue={value => `${value.toFixed(1)} Hz`}
              fillColor="#f5f5f5"
              trackColor="#27272a"
              ariaLabel="Beat offset in hertz"
            />
          </div>
        </div>
      </div>

      <div className="mt-8 border-t border-white/10 pt-6">
        <div className="flex flex-wrap items-baseline gap-x-6 gap-y-2 text-sm tabular-nums">
          <span className="text-white/50">
            left <span className="text-white">{left.toFixed(1)} Hz</span>
          </span>
          <span className="text-white/50">
            right <span className="text-white">{right.toFixed(1)} Hz</span>
          </span>
          <span className="text-white/50">
            beat <span className="text-white">{beat.toFixed(1)} Hz</span>
          </span>
          <span className="ml-auto text-white">{bandFor(beat)}</span>
        </div>
      </div>
    </div>
  );
};

export const BinauralSection = () => (
  <section id="binaural" className="relative overflow-hidden py-14 md:py-32">
    <div className="container mx-auto">
      <div className="mx-auto max-w-2xl text-left md:text-center">
        <span className="text-xs font-medium tracking-[0.2em] text-white/50 uppercase">
          Binaural beats
        </span>
        <h2 className="mt-3 text-3xl font-semibold tracking-tight text-balance md:text-4xl">
          Two tones, one frequency your ears build
        </h2>
        <p className="mt-4 text-lg leading-relaxed text-balance text-muted-foreground">
          A binaural beat isn&rsquo;t in the file. Send the left ear one tone and the right ear
          another, and your brain fills in the gap between them — that gap is the frequency, and it is
          the part you feel.
        </p>
      </div>

      <div className="mt-16 grid items-center gap-12 md:mt-20 md:grid-cols-2 md:gap-20">
        <div className="flex flex-col">
          <p className="text-base leading-relaxed text-muted-foreground md:text-lg">
            Pomoist lets you set both halves yourself, so the whole mix can lean toward the state you
            are aiming for instead of the state a preset assumed. Slide the carrier until the tone sits
            comfortably under the room, then slide the beat until the drift matches the work.
          </p>
          <div className="mt-10 flex flex-col gap-px overflow-hidden rounded-[20px] bg-white/[0.02]">
            {BANDS.map(band => (
              <div key={band.name} className="flex flex-wrap items-baseline gap-x-4 gap-y-1 px-5 py-4">
                <span className="w-14 shrink-0 text-sm font-medium">{band.name}</span>
                <span className="w-24 shrink-0 text-sm tabular-nums text-white/50">{band.range}</span>
                <span className="min-w-0 flex-1 text-sm text-muted-foreground max-md:basis-full">{band.note}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-center">
          <FrequencyDial />
        </div>
      </div>
    </div>
  </section>
);
