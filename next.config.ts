import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ["firebasestorage.googleapis.com"], // Si usas Firebase Storage
  },
  experimental: {
    serverActions: true, // Si usas Server Actions en Next.js 14+
  },
};

export default nextConfig;
