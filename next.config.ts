import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    agentFeedback: true,
  },
  cacheComponents: true,
  partialPrefetching: true,
  reactCompiler: true,

  images: {
    remotePatterns : [
      new URL("https://ecommerce.routemisr.com/**/**"),
      {
         protocol: "https",
        hostname: "img.icons8.com",
      }
    ]
  },
};

export default nextConfig;
