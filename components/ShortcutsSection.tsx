import { Kbd, KbdGroup } from '@/components/ui/kbd';
import GradientASCII from './GradientASCII';

const SHORTCUTS = [
  { keys: ['Space'], label: 'Start or pause the round' },
  { keys: ['N'], label: 'Add a task to the list' },
  { keys: ['S'], label: 'Save the mix you just built' },
  { keys: ['R'], label: 'Open the radio dial' },
  { keys: ['B'], label: 'Cycle the breathing pattern' },
  { keys: ['/'], label: 'Search every sound' },
  { keys: ['K'], label: 'Toggle the library panel' },
  { keys: ['Esc'], label: 'Close whatever is open' }
];

export const ShortcutsSection = () => (
  <section id="shortcuts" className="relative overflow-hidden py-14 md:py-32"
        style={{
          maskImage:
            'linear-gradient(to bottom, transparent 0, #000 44px, #000 calc(100% - 44px), transparent 100%)',
          WebkitMaskImage:
            'linear-gradient(to bottom, transparent 0, #000 44px, #000 calc(100% - 44px), transparent 100%)'
        }}
  >
    <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
      <GradientASCII
        colors={["#7b7b7b","#d4d4d4","#f0fdfa"]}
        shape="pinch"
        characters=" =+xX0S8#@"
        cellSize={12}
        density={0.92}
        glyphOpacity={0.21}
        glow={0.15}
        depthOfField={0}
        flicker={0.2}
        softness={0.5}
        scale={1}
        flow={0}
        speed={1}
        gradientOpacity={0.22}
        grain={0.08}
        variation={13}
        mouseInteraction
        scrambleRadius={0.1}
        clickEffect="wave"
        intro
        lightMode={false}
      />
      </div>
    <div className="container mx-auto">
      <div className="mx-auto max-w-2xl text-left md:text-center">
        <span className="text-xs font-medium tracking-[0.2em] text-white/50 uppercase">Shortcuts</span>
        <h2 className="mt-3 text-3xl font-semibold tracking-tight text-balance md:text-4xl">
          One key, not five clicks
        </h2>
        <p className="mt-4 text-lg leading-relaxed text-balance text-muted-foreground">
          Nothing in Pomoist needs a menu. Start the round, park a task, pull up the radio — each of
          them is a single keystroke, so your hands never have to leave the keyboard mid-block.
        </p>
      </div>

      <div
        className="mx-auto mt-16 grid max-w-3xl md:mt-20 gap-px rounded-[24px] bg-black/55 backdrop-blur-lg sm:grid-cols-2"
      >
        {SHORTCUTS.map(shortcut => (
          <div
            key={shortcut.label}
            className="flex items-center gap-4 px-8 py-5"
          >
            <KbdGroup className="shrink-0">
              {shortcut.keys.map(key => (
                <Kbd key={key} className="h-7 min-w-7 px-2 text-[13px]">
                  {key}
                </Kbd>
              ))}
            </KbdGroup>
            <span className="text-sm leading-snug text-muted-foreground md:text-base">
              {shortcut.label}
            </span>
          </div>
        ))}
      </div>

      <p className="mt-8 text-center text-sm text-white/40">
        Hold <Kbd className="h-6 min-w-6 px-1.5">?</Kbd> anywhere in the app to see the full list.
      </p>
    </div>
  </section>
);
