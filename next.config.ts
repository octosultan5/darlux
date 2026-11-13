import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/rechaud",
        destination: "/redchau",
      },
    ];
  },
};

export default nextConfig;
