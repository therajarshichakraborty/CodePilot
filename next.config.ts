import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  serverExternalPackages: ["winston", "winston-daily-rotate-file"],
  images: {
    remotePatterns: [{ protocol: "https", hostname: "avatars.githubusercontent.com" }],
  },
};

export default nextConfig;
