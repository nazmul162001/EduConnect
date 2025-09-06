import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Allow any external image domain (NOT RECOMMENDED for production)
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
      {
        protocol: "http",
        hostname: "**",
      },
    ],
  },
};

export default nextConfig;
