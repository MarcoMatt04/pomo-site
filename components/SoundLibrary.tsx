"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { cn } from "@/lib/streamui/cn";

import { Pause, Play } from "lucide-react";
import FlexCarousel from "@/components/FlexCarousel";
import Folder from "@/components/Folder";
import PulseHeart from "@/components/PulseHeart";
import ElasticSlider from "@/components/ElasticSlider";

const CATEGORIES = [
  { src: "/sounds/rain.jpg", title: "Rain", subtitle: "steady · soft · distant" },
  { src: "/sounds/forest.jpg", title: "Forest", subtitle: "birds · leaves · wind" },
  { src: "/sounds/fire.jpg", title: "Fireplace", subtitle: "crackle · warm · low" },
  { src: "/sounds/cafe.jpg", title: "Café", subtitle: "murmur · cups · chairs" },
  { src: "/sounds/waves.jpg", title: "Waves", subtitle: "shore · hush · swell" },
  { src: "/sounds/night.jpg", title: "Night", subtitle: "crickets · air · calm" },
];

const FOLDERS = [
  { title: "Rainy desk", description: "Rain + keys + café" },
  { title: "Deep forest", description: "Birds + leaves + stream" },
  { title: "Late night", description: "Vinyl + crickets + fan" },
  { title: "Fire & waves", description: "Crackle + shore" },
];

function Row({
  eyebrow,
  title,
  text,
  children,
  reverse,
}: {
  eyebrow: string;
  title: string;
  text: string;
  children: ReactNode;
  reverse?: boolean;
}) {
  return (
    <div className="grid items-center gap-12 md:grid-cols-2 md:gap-16">
      <div className={cn("max-w-md", reverse && "md:order-2 md:justify-self-end")}>
        <span className="text-xs font-medium tracking-[0.2em] text-white/50 uppercase">
          {eyebrow}
        </span>
        <h3 className="mt-3 text-2xl font-semibold tracking-tight text-balance md:text-3xl">
          {title}
        </h3>
        <p className="mt-4 text-base leading-relaxed text-muted-foreground">{text}</p>
      </div>
      <div className={cn("relative", reverse && "md:order-1")}>
        <div className="overflow-hidden rounded-[28px]  bg-white/[0.02]">
          {children}
        </div>
      </div>
    </div>
  );
}

const TRACK_SECONDS = 216;

const clock = (seconds: number) =>
  `${Math.floor(seconds / 60)}:${String(seconds % 60).padStart(2, "0")}`;

export function SoundLibrary() {
  const [level, setLevel] = useState(68);
  const [playing, setPlaying] = useState(false);
  const [elapsed, setElapsed] = useState(165);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  // 2.6 MB clip: hold off the download until the player is near the viewport.
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setVideoLoaded(true);
        observer.disconnect();
      },
      { rootMargin: '400px' },
    );
    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = !playing;
    video.volume = level / 100;
    if (video.paused) void video.play().catch(() => {});
  }, [playing, level, videoLoaded]);

  useEffect(() => {
    if (!playing) return;
    const id = setInterval(() => setElapsed((s) => (s + 1) % TRACK_SECONDS), 1000);
    return () => clearInterval(id);
  }, [playing]);

  return (
    <section id="sound-library" className="relative overflow-hidden py-14 md:py-32">
      <div className="container mx-auto">
        <div className="mx-auto max-w-2xl text-left md:text-center">
          <span className="text-xs font-medium tracking-[0.2em] text-white/50 uppercase">
            Sound library
          </span>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-balance md:text-4xl">
            A room you can tune
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-balance text-muted-foreground">
            Every category is a texture. Layer them, keep the ones that help, and shape the
            whole mix until it sounds like your kind of focus.
          </p>
        </div>

        <div className="mt-16 flex flex-col gap-8 md:mt-20 md:gap-20">
          <Row
            eyebrow="01 — Combine"
            title="Stack sounds into one atmosphere"
            text="Each card holds a curated loop. Play several at once — rain under a fireplace, café murmur beneath forest birds — and the app blends them into a single, even scene instead of a pile of tracks."
          >
            <div className="h-[400px] w-full p-3 md:h-[480px] md:p-4">
              <FlexCarousel items={CATEGORIES} cardHeight={0.52} gap={16} radius={0} />
            </div>
          </Row>

          <Row
            reverse
            eyebrow="02 — Organize"
            title="Build your own categories"
            text="The library is yours to edit. Create a category, drop sounds in, remove the ones you never reach for. Folders keep scenes tidy and open like a real collection."
          >
            <div className="flex min-h-[440px] items-center justify-center md:p-8 md:min-h-[480px]">
              <Folder items={FOLDERS} label="My library" color="#52525b" defaultOpen />
            </div>
          </Row>

          <Row
            eyebrow="03 — Favorite"
            title="Heart what you reach for"
            text="Tap the heart on any sound to save it to your favorites. The count follows your collection, so the loops that work stay one tap away."
          >
            <div className="flex min-h-[440px] items-center justify-center md:p-8 md:min-h-[480px]">
              <PulseHeart defaultLiked count={1} size={48} label="Favorite" />
            </div>
          </Row>

          <Row
            reverse
            eyebrow="04 — Mix"
            title="Tune each layer by ear"
            text="Every sound has its own level. Pull one down until it sits behind the others, push another forward. The balance is saved with the scene."
          >
            <div className="flex min-h-[440px] items-center justify-center md:p-8 md:min-h-[480px]">
              <div className="flex w-full max-w-xl flex-col gap-5 rounded-[24px] bg-[#141416] p-4 sm:flex-row sm:items-center">
                <div className="aspect-square w-full shrink-0 overflow-hidden rounded-2xl bg-white/5 sm:w-[180px]">
                  <video
                    ref={videoRef}
                    src={videoLoaded ? "/sounds/rain.webm" : undefined}
                    aria-label="Rain falling"
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="h-full w-full object-cover"
                  />
                </div>

                <div className="flex min-w-0 flex-1 flex-col gap-4">
                  <div>
                    <p className="truncate text-lg font-semibold">Rain</p>
                    <p className="truncate text-sm text-white/50">Steady rainfall</p>
                  </div>

                  <div>
                    <div className="h-1 w-full overflow-hidden rounded-full bg-white/15">
                      <div
                        className="h-full rounded-full bg-white transition-[width] duration-1000 ease-linear"
                        style={{ width: `${(elapsed / TRACK_SECONDS) * 100}%` }}
                      />
                    </div>
                    <div className="mt-2 flex justify-between text-xs tabular-nums text-white/50">
                      <span>{clock(elapsed)}</span>
                      <span>-{clock(TRACK_SECONDS - elapsed)}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      aria-label={playing ? "Pause" : "Play"}
                      onClick={() => setPlaying((p) => !p)}
                      className="grid size-11 place-items-center rounded-xl bg-white/10 text-white transition-colors hover:bg-white/20"
                    >
                      {playing ? <Pause className="size-5" /> : <Play className="size-5" />}
                    </button>

                    <div className="ml-auto w-40 min-w-0">
                      <ElasticSlider
                        value={level}
                        onChange={setLevel}
                        maxValue={100}
                        ariaLabel="Volume"
                        valuePosition="none"
                        thickness={3}
                        activeThickness={5}
                        maxStretch={40}
                        trackColor="rgba(255,255,255,0.18)"
                        rangeColor="#ffffff"
                        iconColor="rgba(255,255,255,0.6)"
                        style={{ width: "100%" }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Row>
        </div>
      </div>
    </section>
  );
}
