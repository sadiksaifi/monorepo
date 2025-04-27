import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  transpilePackages: ["@workspace/lib", "@workspace/typescript-config"],
  headers: async () => [
    {
      source: "/api/(.*)",
      headers: [
        {
          key: "Access-Control-Allow-Origin",
          value: "http://localhost:5173",
        },
        {
          key: "Access-Control-Allow-Methods",
          value: "GET,POST,PUT,DELETE",
        },
        {
          key: "Access-Control-Allow-Headers",
          value: "X-CSRF-Token, Content-Type",
        },
        {
          key: "Access-Control-Allow-Credentials",
          value: "true",
        },
      ],
    },
  ],
};
export default nextConfig;
