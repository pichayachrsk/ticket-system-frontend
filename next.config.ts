import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  env: {
    NEXT_PUBLIC_API_HOST: process.env.API_HOST
  }
};

export default nextConfig;
