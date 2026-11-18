"use client"

import { Component, type ReactNode } from "react";
import { items as items } from "@/lib/navbar";
import { Hero115 } from "@/components/hero115";
import { SoundLibrary } from "@/components/SoundLibrary";
import { TimerSection } from "@/components/TimerSection";
import { CaptureSection } from "@/components/CaptureSection";
import { BreathingSection } from "@/components/BreathingSection";
import { BinauralSection } from "@/components/BinauralSection";
import { RadioSection } from "@/components/RadioSection";
import { ShortcutsSection } from "@/components/ShortcutsSection";
import { FaqSection } from "@/components/FaqSection";
import { CtaSection } from "@/components/CtaSection";
import { Footer2 } from "@/components/footer2";
import BubbleMenu from "@/components/ui/BubbleMenu";

// The Windows installer is published as a release asset:
// https://github.com/MarcoMatt04/pomo-site/releases/tag/v3.1.1
// It cannot live in public/ or in git: GitHub rejects repo files over 100 MB and
// Vercel caps static uploads at 100 MB, while release assets allow 2 GB.
// Keep the tag and asset name in sync with the release, or the button 404s.
const INSTALLER_URL: string | null =
  "https://github.com/MarcoMatt04/pomo-site/releases/download/v3.1.1/Pomoist_3.1.1_x64-setup.exe";

/**
 * A section that throws (a WebGL context iOS refuses, a canvas that dies
 * mid-scroll) must cost that section, not the whole page: an error in any
 * effect below this boundary used to unmount the entire React root.
 */
class SectionGuard extends Component<{ name: string; children: ReactNode }, { crashed: boolean }> {
  state = { crashed: false };

  static getDerivedStateFromError() {
    return { crashed: true };
  }

  componentDidCatch(error: Error) {
    console.error(`Section "${this.props.name}" crashed and was removed from the page:`, error.message);
  }

  render() {
    return this.state.crashed ? null : this.props.children;
  }
}

const guard = (name: string, section: ReactNode) => (
  <SectionGuard name={name}>{section}</SectionGuard>
);

export default function LandingPage1() {
  return (
    <main className="flex w-full flex-col min-h-screen">
      <BubbleMenu
        menuBg="#ffffff"
        menuContentColor="#111111"
        useFixedPosition={true}
        animationEase="back.out(1.5)"
        animationDuration={0.3}
        staggerDelay={0.08}
        logoPlain

        logo={
          INSTALLER_URL ? (
            <a
              href={INSTALLER_URL}
              download
              className="bg-slate-800 no-underline group cursor-pointer relative shadow-2xl shadow-zinc-900 rounded-full p-px text-md leading-6 text-white inline-block"
            >
              <span className="absolute inset-0 overflow-hidden rounded-full">
                <span className="absolute inset-0 rounded-full bg-[image:radial-gradient(75%_100%_at_50%_0%,rgba(56,189,248,0.6)_0%,rgba(56,189,248,0)_75%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              </span>
              <div className="relative flex space-x-2 items-center z-10 rounded-full bg-zinc-950 py-2 px-4 ring-1 ring-white/10">
                <span>Download</span>
                <svg
                  fill="none"
                  height="16"
                  viewBox="0 0 24 24"
                  width="16"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M10.75 8.75L14.25 12L10.75 15.25"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                  />
                </svg>
              </div>
              <span className="absolute -bottom-0 left-[1.125rem] h-px w-[calc(100%-2.25rem)] bg-gradient-to-r from-emerald-400/0 via-emerald-400/90 to-emerald-400/0 transition-opacity duration-500 group-hover:opacity-40" />
            </a>
          ) : (
            <span aria-hidden className="inline-block h-12 md:h-14" />
          )
        }
        items={ items }
      />
      {guard("hero", <Hero115 />)}
      {guard("sound library", <SoundLibrary />)}
      {guard("timer", <TimerSection />)}
      {guard("capture", <CaptureSection />)}
      {guard("breathing", <BreathingSection />)}
      {guard("binaural", <BinauralSection />)}
      {guard("radio", <RadioSection />)}
      {guard("shortcuts", <ShortcutsSection />)}
      {guard("faq", <FaqSection />)}
      {guard("cta", <CtaSection />)}
      {guard("footer", <Footer2 />)}
    </main>
  );
}
