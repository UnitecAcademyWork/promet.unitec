import type { NextConfig } from "next";

const nextConfig: NextConfig = {
 
  // ⚠️ serverActions com bodySizeLimit vai direto em nextConfig
  serverActions: {
    bodySizeLimit: "10mb",
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });
    return config;
  },
};

export default nextConfig;
