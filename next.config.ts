import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ['res.cloudinary.com'], // Разрешить загрузку из Cloudinary
  },
};

export default nextConfig;
