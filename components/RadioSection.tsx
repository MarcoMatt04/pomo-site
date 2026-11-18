import { RadioLab } from '@/components/streamui/radio-lab';

const STATIONS = [
  { f: '90.5', name: 'Stream FM', note: 'a driving square-wave loop for the sharp end of a block' },
  { f: '95.9', name: 'Lo-Fi Ink', note: 'slow, dusty, and slightly behind the beat' },
  { f: '101.3', name: 'Offset 101', note: 'fast enough to pull you out of a slump' },
  { f: '106.7', name: 'Paper Jams', note: 'warm sine tones that sit under reading' }
];

export const RadioSection = () => (
  <section id="radio" className="relative overflow-hidden py-14 md:py-32">
    <div className="container mx-auto">
      <div className="mx-auto max-w-2xl text-left md:text-center">
        <span className="text-xs font-medium tracking-[0.2em] text-white/50 uppercase">Radio</span>
        <h2 className="mt-3 text-3xl font-semibold tracking-tight text-balance md:text-4xl">
          A dial, not a list
        </h2>
        <p className="mt-4 text-lg leading-relaxed text-balance text-muted-foreground">
          The radio isn&rsquo;t a menu of streams. Four stations live somewhere between 90.5 and
          106.7, and everything in between is static — so finding one is something you do with your
          hands.
        </p>
      </div>

      <div className="mt-16 grid items-center gap-2 md:mt-20 md:grid-cols-2 md:gap-20">
        <div className="flex flex-col">
          <p className="text-base leading-relaxed text-muted-foreground md:text-lg">
            Turn the tuning knob and the hiss thins before the loop surfaces. Land on the frequency
            and the readout names the station; miss it by a hair and you get the name with a question
            mark, which is most of the fun. Every station is generated in the browser, so nothing
            buffers and nothing runs out.
          </p>
          <div className="mt-10 flex flex-col gap-px overflow-hidden rounded-[20px]">
            {STATIONS.map(station => (
              <div key={station.f} className="flex flex-wrap items-baseline gap-x-4 gap-y-1 px-5 py-4">
                <span className="w-12 shrink-0 text-sm font-semibold tabular-nums">{station.f}</span>
                <span className="w-28 shrink-0 text-sm font-medium">{station.name}</span>
                <span className="min-w-0 flex-1 text-sm text-muted-foreground max-md:basis-full">
                  {station.note}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="flex min-w-0 justify-center">
          <div className="w-full min-w-0 max-w-[620px] rounded-[28px] p-4 md:p-6">
            <RadioLab />
          </div>
        </div>
      </div>
    </div>
  </section>
);
