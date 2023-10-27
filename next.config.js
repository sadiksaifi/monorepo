/** @type {import('next').NextConfig} */
const nextConfig = {
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
        destination: "mailto:contact@sadiksaifi.dev",
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
