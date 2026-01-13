import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'imgur.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'i.imgur.com',   // ← очень важно! часто изображения лежат именно здесь
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
