import { cn } from "@/lib/streamui/cn";

import SlicedWaves from './SlicedWaves';
import MaskedHeading from "./MaskedHeading";
import { ButtonGradient } from "./ButtonGradient";

interface Button {
  text: string;
  url: string;
  icon?: React.ReactNode;
}
interface Buttons {
  primary?: Button;
  secondary?: Button;
}

interface HeroBasicProps {
  heading: string;
  description: string;
  buttons?: Buttons;
  byline?: string;
  className?: string;
}

type Props = Partial<HeroBasicProps>;

const defaultProps: HeroBasicProps = {
  heading: "Pomoist",
  description: "Your focus companion — ambient sounds, timers, and gentle reminders to help you flow.",
  buttons: {
    primary: { text: "Get started", url: "#" },
    secondary: { text: "Learn more", url: "#" },
  },
  byline: "Built for deep work and calm focus",
};

const Hero115 = (props: Props) => {
  const { heading, description, buttons, className } = {
    ...defaultProps,
    ...props,
  };

  return (
    <section className={cn("relative isolate overflow-hidden py-32 min-h-[90vh]", className)}>
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <SlicedWaves
          color1="#ffd9a8"
          color2="#ff5fa2"
          color3="#5b8cff"
          ribbons={3}
          spacing={14}
          perspective={0.45}
          blur={0.75}
          glow={1.45}
          position={0.78}
          mouseInteraction
          barWidth={0.6}
          ribbonHeight={0.3}
          spread={0.1}
          amplitude={0.065}
          frequency={1.05}
          curve={0.5}
          slices={14}
          speed={-0.8}
          brightness={1.25}
          rotation={0}
          grain={0.2}
          fade={0.4}
          opacity={1}
          intro
          lightMode={false}
        />
      </div>
      <div className="container relative mx-auto">
        <div className="flex flex-col gap-5">
          <div className="relative isolate flex flex-col gap-5">
            <div
              aria-hidden
              className="pointer-events-none absolute top-1/2 left-1/2 -z-10 mx-auto size-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-border mask-[linear-gradient(to_top,transparent,transparent,white,white,white,transparent,transparent)] p-16 [-webkit-mask-image:linear-gradient(to_top,transparent,transparent,white,white,white,transparent,transparent)] md:size-[1300px] md:p-32"
            >
              <div className="size-full rounded-full border border-border p-16 md:p-32">
                <div className="size-full rounded-full border border-border" />
              </div>
            </div>
            <span className="mx-auto flex size-16 items-center justify-center md:size-20">
              <img src="/pomoist-app-icon.png" alt="Pomoist app icon" className="size-full" />
            </span>
            <MaskedHeading
              text={heading}
              tag="h1"
              align="center"
              weight={700}
              tracking={-0.03}
              textScale={0.115}
              mediaType="video"
              src="/hero-background.mp4"
              poster="/sounds/rain.jpg"
              brightness={1.4}
              saturation={0.8}
              fillScale={1}
              parallax={30}
              drift={20}
              className="mx-auto max-w-3xl"
            />
            <p className="mx-auto max-w-3xl text-left md:text-center text-lg text-balance text-muted-foreground md:text-xl">
              {description}
            </p>
            <div className="flex flex-col items-center gap-3 pt-3 pb-12">
              {buttons?.primary && (
                <ButtonGradient text="Get Started"></ButtonGradient>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export { Hero115 };
