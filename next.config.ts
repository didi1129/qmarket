import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "enwhjnkfwjoxfswgelik.supabase.co",
        port: "",
      },
    ],
  },
};

export default nextConfig;
