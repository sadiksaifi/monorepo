import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/github",
        destination: "https://github.com/sadiksaifi",
        permanent: true,
      },
      {
        source: "/x",
        destination: "https://twitter.com/thesadiksaifi",
        permanent: true,
      },
      {
        source: "/linkedin",
        destination: "https://www.linkedin.com/in/sadiksaifi",
        permanent: true,
      },
      {
        source: "/mail",
        destination: "mailto:mail@sadiksaifi.dev",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
