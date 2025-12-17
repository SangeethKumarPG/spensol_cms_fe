import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "spensol-cms-images.s3.ap-south-2.amazonaws.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
