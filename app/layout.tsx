import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import { Outfit } from "next/font/google";

import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

const space_grotesk = Space_Grotesk({
  variable: "--font-space_grotesk",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
  title: {
    default: "Pomoist — focus rounds, ambient sound, and a radio you tune by hand",
    template: "%s · Pomoist"
  },
  description:
    "Pomoist is a focus companion for deep work: pomodoro and flowmodoro timers, an ambient sound library you mix by ear, and a synthesised FM radio. Everything is generated in your browser, and everything stays on your device.",
  icons: {
    icon: [{ url: "/pomoist-app-icon.png", type: "image/png" }]
  },
  alternates: {
    canonical: "/"
  },
  openGraph: {
    title: "Pomoist — focus rounds and ambient sound",
    description:
      "Pomodoro and flowmodoro timers, a mixable sound library, and an FM radio you tune by hand. Generated in the browser, stored on your device.",
    url: "/",
    siteName: "Pomoist",
    images: [{ url: "/pomoist-app-icon.png" }],
    type: "website"
  }
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${space_grotesk.variable} ${outfit.variable} h-full antialiased dark`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
