import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  output: "standalone",
  webpack: (config) => {
    config.experiments.asyncWebAssembly = true;
    return config;
  },
  outputFileTracingIncludes: {
    "/api//\\[\\[\\.\\.\\.query\\]\\]": [
      "./node_modules/@subzerocloud/nodejs/*.wasm",
      "./node_modules/**/*",
    ],
    "/api//\\[\\[\\.\\.\\.query\\]\\]/*": [
      "./node_modules/@subzerocloud/nodejs/*.wasm",
      "./node_modules/**/*",
    ],
    "/api/\\[\\.\\.\\.query\\]": [
      "./node_modules/@subzerocloud/nodejs/*.wasm",
      "./node_modules/**/*",
    ],
    "/api/\\[\\.\\.\\.query\\]/*": [
      "./node_modules/@subzerocloud/nodejs/*.wasm",
      "./node_modules/**/*",
    ],
    "/api/\\[query\\]": [
      "./node_modules/@subzerocloud/nodejs/*.wasm",
      "./node_modules/**/*",
    ],
    "/api/\\[query\\]/*": [
      "./node_modules/@subzerocloud/nodejs/*.wasm",
      "./node_modules/**/*",
    ],
    "/api/*": [
      "./node_modules/@subzerocloud/nodejs/*.wasm",
      "./node_modules/**/*",
    ],
    "/api/**": [
      "./node_modules/@subzerocloud/nodejs/*.wasm",
      "./node_modules/**/*",
    ],
    "/api/**/*": [
      "./node_modules/@subzerocloud/nodejs/*.wasm",
      "./node_modules/**/*",
    ],
    "/api/playing_with_neon/*": [
      "./node_modules/@subzerocloud/nodejs/*.wasm",
      "./node_modules/**/*",
    ],
    "/api/playing_with_neon": [
      "./node_modules/@subzerocloud/nodejs/*.wasm",
      "./node_modules/**/*",
    ],
    "/app/api//\\[\\[\\.\\.\\.query\\]\\]": [
      "./node_modules/@subzerocloud/nodejs/*.wasm",
    ],
    "/app/api//\\[\\[\\.\\.\\.query\\]\\]/*": [
      "./node_modules/@subzerocloud/nodejs/*.wasm",
    ],
    "/app/api/\\[\\.\\.\\.query\\]": [
      "./node_modules/@subzerocloud/nodejs/*.wasm",
    ],
    "/app/api/\\[\\.\\.\\.query\\]/*": [
      "./node_modules/@subzerocloud/nodejs/*.wasm",
    ],
    "/app/api/\\[query\\]": [
      "./node_modules/@subzerocloud/nodejs/*.wasm",
      "./node_modules/**/*",
    ],
    "/app/api/\\[query\\]/*": [
      "./node_modules/@subzerocloud/nodejs/*.wasm",
      "./node_modules/**/*",
    ],
    "/app/api/*": [
      "./node_modules/@subzerocloud/nodejs/*.wasm",
      "./node_modules/**/*",
    ],
    "/app/api/**": [
      "./node_modules/@subzerocloud/nodejs/*.wasm",
      "./node_modules/**/*",
    ],
    "/app/api/**/*": [
      "./node_modules/@subzerocloud/nodejs/*.wasm",
      "./node_modules/**/*",
    ],
    "/app/api/playing_with_neon": [
      "./node_modules/@subzerocloud/nodejs/*.wasm",
    ],
    "/app/api/playing_with_neon/*": [
      "./node_modules/@subzerocloud/nodejs/*.wasm",
    ],
    "/src/app/api//\\[\\[\\.\\.\\.query\\]\\]": [
      "./node_modules/@subzerocloud/nodejs/*.wasm",
    ],
    "/src/app/api//\\[\\[\\.\\.\\.query\\]\\]/*": [
      "./node_modules/@subzerocloud/nodejs/*.wasm",
    ],
    "/src/app/api/\\[\\.\\.\\.query\\]": [
      "./node_modules/@subzerocloud/nodejs/*.wasm",
    ],
    "/src/app/api/\\[\\.\\.\\.query\\]/*": [
      "./node_modules/@subzerocloud/nodejs/*.wasm",
    ],
    "/src/app/api/\\[query\\]": [
      "./node_modules/@subzerocloud/nodejs/*.wasm",
      "./node_modules/**/*",
    ],
    "/src/app/api/\\[query\\]/*": [
      "./node_modules/@subzerocloud/nodejs/*.wasm",
    ],
    "/src/app/api/*": [
      "./node_modules/@subzerocloud/nodejs/*.wasm",
      "./node_modules/**/*",
    ],
    "/src/app/api/**": [
      "./node_modules/@subzerocloud/nodejs/*.wasm",
      "./node_modules/**/*",
    ],
    "/src/app/api/**/*": [
      "./node_modules/@subzerocloud/nodejs/*.wasm",
      "./node_modules/**/*",
    ],
    "/src/app/api/playing_with_neon/*": [
      "./node_modules/@subzerocloud/nodejs/*.wasm",
      "./node_modules/**/*",
    ],
  },
};

export default nextConfig;
