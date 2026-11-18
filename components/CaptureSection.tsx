'use client';

import { useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';

import SpringCheck from '@/components/SpringCheck';

// three.js is ~1 MB: only load and mount the note when it scrolls into view.
const PaperCrumple = dynamic(() => import('@/components/PaperCrumple'), { ssr: false });

const TASKS = [
  'Outline the release notes',
  'Block 25 minutes for the API draft',
  'Review the new focus sounds',
  'Reply to the design review'
];

const FEATURES = [
  {
    label: 'Lists',
    title: "Keep this block's to-do next to the timer",
    text: 'Write down the handful of things the round is for. Checking one off strikes it through and keeps the count honest, so when the timer stops you can see what the block actually bought you.'
  },
  {
    label: 'Notes',
    title: 'Catch the idea, then crumple it away',
    text: "An idea that arrives mid-block does not have to cost you the block. Park it on a note in one keystroke, finish the round, and unfold it once the timer stops. Hold the sheet to crumple it back into a ball."
  }
];

const TaskList = () => {
  const [done, setDone] = useState<boolean[]>(() => TASKS.map((_, index) => index < 2));

  return (
    <div className="w-full max-w-sm rounded-[24px] p-6">
      <div className="flex flex-col">
        {TASKS.map((task, index) => (
          <SpringCheck
            key={task}
            label={task}
            checked={done[index]}
            onChange={next =>
              setDone(previous => previous.map((value, position) => (position === index ? next : value)))
            }
            color="#f5f5f5"
            fillColor="#f5f5f5"
            checkColor="#111113"
            fontSize={16}
            ariaLabel={task}
          />
        ))}
      </div>
      <p className="mt-5 border-t border-white/5 pt-4 text-xs text-white/40">
        {done.filter(Boolean).length} of {TASKS.length} done this block
      </p>
    </div>
  );
};

const QuickNote = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setVisible(true);
        observer.disconnect();
      },
      { rootMargin: '400px' },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className="flex min-h-[480px] w-full justify-center">
      {visible && (
        <PaperCrumple
          src="/notes/note.jpg"
          alt="A handwritten note: rain and vinyl for the long edits, ship the folder reorder, ask about the radio list"
          width={400}
          height={500}
          sceneHeight={480}
          releaseBehavior="stay"
          paperColor="#f4f0e8"
        />
      )}
    </div>
  );
};

export const CaptureSection = () => (
  <section id="capture" className="relative overflow-hidden py-14 md:py-32">
    <div className="container mx-auto">
      <div className="mx-auto max-w-2xl text-left md:text-center">
        <span className="text-xs font-medium tracking-[0.2em] text-white/50 uppercase">Capture</span>
        <h2 className="mt-3 text-3xl font-semibold tracking-tight text-balance md:text-4xl">
          The list, and the loose ends
        </h2>
        <p className="mt-4 text-lg leading-relaxed text-balance text-muted-foreground">
          Focus falls apart for two reasons: you forgot what the round was for, or an idea would not
          leave you alone. Pomoist gives both somewhere to go.
        </p>
      </div>

      <div className="mt-16 flex flex-col gap-16 md:mt-20 md:gap-20">
        {FEATURES.map((feature, index) => (
          <div key={feature.label} className="grid items-center gap-10 md:grid-cols-2 md:gap-20">
            <div className="flex flex-col">
              <span className="text-xs font-medium tracking-[0.2em] text-white/50 uppercase">
                {String(index + 1).padStart(2, '0')} — {feature.label}
              </span>
              <h3 className="mt-3 text-2xl font-semibold tracking-tight text-balance md:text-3xl">
                {feature.title}
              </h3>
              <p className="mt-4 text-base leading-relaxed text-balance text-muted-foreground md:text-lg">
                {feature.text}
              </p>
            </div>
            <div className="flex justify-center">{index === 0 ? <TaskList /> : <QuickNote />}</div>
          </div>
        ))}
      </div>
    </div>
  </section>
);
