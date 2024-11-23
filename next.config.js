// @ts-check

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  output: "standalone",
  outputFileTracingIncludes: {
    "/api//\\[\\[\\.\\.\\.query\\]\\]": [
      "./node_modules/@subzerocloud/nodejs/subzero_wasm_bg.wasm",
    ],
    "/api/\\[\\.\\.\\.query\\]": [
      "./node_modules/@subzerocloud/nodejs/subzero_wasm_bg.wasm",
    ],
  },
  webpack: (config) => {
    config.module.rules.push({
      test: /\.md$/,
      use: "raw-loader",
    });
    return config;
  },
};

module.exports = nextConfig;
