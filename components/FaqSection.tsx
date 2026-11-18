import { BouncyAccordion, type BouncyAccordionItem } from '@/components/motion/bouncy-accordion';

const ITEMS: BouncyAccordionItem[] = [
  {
    id: 'offline',
    title: 'Does Pomoist work offline?',
    description:
      'Yes. Every sound, every station, and every beat is generated in the browser, so the whole app runs with the network off. Nothing streams, so nothing buffers and nothing drops out mid-block.'
  },
  {
    id: 'account',
    title: 'Do I need an account?',
    description:
      'No. Your scenes, lists, and notes live on your device. Nothing is uploaded anywhere, which also means nobody can see what you were working on — or admit to.'
  },
  {
    id: 'own-audio',
    title: 'Can I bring my own sounds?',
    description:
      'Yes. Drop your own files into any category and they sit alongside the built-in loops, with their own level and their own place in the mix.'
  },
  {
    id: 'round-saved',
    title: 'What happens if I close the app mid-round?',
    description:
      'The round is saved as it runs. Reopen the app and the timer picks up where it left off, with the mix you had built still intact.'
  },
  {
    id: 'binaural',
    title: 'How do the binaural beats actually work?',
    description:
      'Each ear gets its own tone, a hair apart in pitch. Your brain reads the difference between them as a single beat — that difference is the frequency, and it is the part you feel rather than hear.'
  }
];

export const FaqSection = () => (
  <section id="faq" className="relative overflow-hidden py-14 md:py-32">
    <div className="container mx-auto">
      <div className="mx-auto max-w-2xl text-left md:text-center">
        <span className="text-xs font-medium tracking-[0.2em] text-white/50 uppercase">FAQ</span>
        <h2 className="mt-3 text-3xl font-semibold tracking-tight text-balance md:text-4xl">
          Questions, answered
        </h2>
        <p className="mt-4 text-lg leading-relaxed text-balance text-muted-foreground">
          The things people ask before their first round, and the ones they ask on the third day.
        </p>
      </div>

      <div className="mx-auto mt-14 max-w-3xl">
        <BouncyAccordion items={ITEMS} />
      </div>
    </div>
  </section>
);
