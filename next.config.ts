import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: '*.supabase.co',
      },
      {
        protocol: 'https',
        hostname: 'bpetipktftbvmbsqjmtg.supabase.co',
      },
    ],
    // Allow all external images in development
    unoptimized: process.env.NODE_ENV === 'development',
  },
};

export default nextConfig;
