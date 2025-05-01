import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  transpilePackages: ["@workspace/lib", "@workspace/typescript-config"],
};
export default nextConfig;
