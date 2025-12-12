import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [{
      hostname: "localhost"
    }, {
      hostname: "enduring-eggs-93543058c5.media.strapiapp.com"
    }]
  }
};

export default nextConfig;
