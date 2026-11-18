import type { NextConfig } from "next";

const media = [{ key: "Cache-Control", value: "public, max-age=604800, immutable" }];

const nextConfig: NextConfig = {
  /* config options here */
  output: "standalone",
  experimental: {
    agentFeedback: true,
  },
  cacheComponents: true,
  partialPrefetching: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  async headers() {
    return [
      { source: "/sounds/:path*", headers: media },
      { source: "/notes/:path*", headers: media },
      { source: "/hero-background.mp4", headers: media },
      { source: "/pomoist-app-icon.png", headers: media },
    ];
  },
};

export default nextConfig;
