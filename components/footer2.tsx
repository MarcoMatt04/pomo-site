'use client';

import { ArrowUp } from 'lucide-react';

import TextPressure from '@/components/TextPressure';

const CONTACT_EMAIL = 'company@email.com';

const NAVIGATION = [
  { label: 'Sound Library', href: '#sound-library' },
  { label: 'Timer', href: '#timer' },
  { label: 'Capture', href: '#capture' },
  { label: 'Breathing', href: '#breathing' },
  { label: 'Binaural', href: '#binaural' },
  { label: 'Radio', href: '#radio' },
  { label: 'Shortcuts', href: '#shortcuts' },
  { label: 'FAQ', href: '#faq' }
];

const FOLLOW = [
  { label: 'Instagram', href: '#' },
  { label: 'GitHub', href: '#' },
  { label: 'Ko-fi', href: 'https://ko-fi.com/pomoist' }
];

const LEGAL = [
  { label: 'Legal', href: '#' },
  { label: 'Privacy', href: '#' },
  { label: 'Cookies', href: '#' }
];

const toTop = () =>
  window.scrollTo({ top: 0, behavior: 'smooth' });

export const Footer2 = () => (
  <footer className="relative overflow-hidden text-white">
    <div className="container mx-auto pt-16 md:pt-20 px-6">
      <div className="flex items-start justify-between gap-6">
        <p className="text-sm leading-snug font-semibold tracking-tight uppercase md:text-base">
          Focus, relax
          <br />
          Create your safe space
        </p>
        <button
          type="button"
          onClick={toTop}
          aria-label="Back to top"
          className="grid size-10 shrink-0 place-items-center rounded-full border border-white/15 text-white/70 transition-colors hover:border-white/50 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-white/50"
        >
          <ArrowUp className="size-4.5" />
        </button>
      </div>

      <div className="mt-14 grid gap-10 sm:grid-cols-3 md:mt-16">
        <div>
          <h2 className="text-xs font-semibold tracking-[0.2em] text-white/50 uppercase">
            Pomoist
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-white/50">
            Rounds, mixes and notes stay on your device. Nothing to sign up for.
          </p>
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="mt-4 inline-block text-sm text-white/70 underline decoration-white/20 underline-offset-4 transition-colors hover:text-white hover:decoration-white/60"
          >
            {CONTACT_EMAIL}
          </a>
        </div>

        <div>
          <h2 className="text-xs font-semibold tracking-[0.2em] text-white/50 uppercase">
            Navigation
          </h2>
          <ul className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-sm font-medium text-white/60">
            {NAVIGATION.map(link => (
              <li key={link.href}>
                <a href={link.href} className="transition-colors hover:text-white">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="text-xs font-semibold tracking-[0.2em] text-white/50 uppercase">
            Follow
          </h2>
          <ul className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-sm font-medium text-white/60">
            {FOLLOW.map(link => (
              <li key={link.label}>
                <a
                  href={link.href}
                  target={link.href === '#' ? undefined : '_blank'}
                  rel="noreferrer noopener"
                  className="transition-colors hover:text-white"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-10 px-4 md:mt-12 md:px-6">
        <div className="relative h-[260px] md:h-[300px]">
          <TextPressure
            text="POMOIST"
            flex
            alpha={false}
            stroke={false}
            width={false}
            weight
            italic={false}
            radius={0.55}
            smoothing={0.5}
            idle="wave"
            idleSpeed={0.2}
            clickRipple={false}
            strokeColor="#ff5a1f"
            strokeWidth={3}
            minFontSize={36}
            scale
            className="text-white"
          />
        </div>
      </div>

      <div className="mt-10 flex flex-col justify-between gap-3 border-t border-white/10 pt-6 pb-8 text-xs text-white/40 md:flex-row md:items-center">
        <p>
          <span className="text-white/60">©2026 Pomoist</span> — sounds, loops and beats
          generated in the browser
        </p>
        <ul className="flex gap-4">
          {LEGAL.map(link => (
            <li key={link.label}>
              <a href={link.href} className="transition-colors hover:text-white">
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  </footer>
);
