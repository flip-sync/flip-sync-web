/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  basePath: "",
  assetPrefix: "",
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "https://flip-sync.com/api/:path*",
      },
    ];
  },
};

module.exports = nextConfig;
