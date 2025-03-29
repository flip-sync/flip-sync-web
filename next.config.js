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
  webpack: (config, { isServer }) => {
    // 웹팩 설정 최적화
    if (!isServer) {
      config.optimization = {
        ...config.optimization,
        splitChunks: {
          chunks: "all",
          minSize: 20000,
          maxSize: 244000,
        },
      };
    }
    return config;
  },
};

module.exports = nextConfig;
