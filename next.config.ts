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
    ],
    "/api//\\[\\[\\.\\.\\.query\\]\\]/*": [
      "./node_modules/@subzerocloud/nodejs/*.wasm",
    ],
    "/api/\\[\\.\\.\\.query\\]": ["./node_modules/@subzerocloud/nodejs/*.wasm"],
    "/api/\\[\\.\\.\\.query\\]/*": [
      "./node_modules/@subzerocloud/nodejs/*.wasm",
    ],
    "/api/\\[query\\]": ["./node_modules/@subzerocloud/nodejs/*.wasm"],
    "/api/\\[query\\]/*": ["./node_modules/@subzerocloud/nodejs/*.wasm"],
    "/api/*": ["./node_modules/@subzerocloud/nodejs/*.wasm"],
    "/api/**": ["./node_modules/@subzerocloud/nodejs/*.wasm"],
    "/api/**/*": ["./node_modules/@subzerocloud/nodejs/*.wasm"],
    "/api/playing_with_neon/*": ["./node_modules/@subzerocloud/nodejs/*.wasm"],
    "/api/playing_with_neon": ["./node_modules/@subzerocloud/nodejs/*.wasm"],
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
    "/app/api/\\[query\\]": ["./node_modules/@subzerocloud/nodejs/*.wasm"],
    "/app/api/\\[query\\]/*": ["./node_modules/@subzerocloud/nodejs/*.wasm"],
    "/app/api/*": ["./node_modules/@subzerocloud/nodejs/*.wasm"],
    "/app/api/**": ["./node_modules/@subzerocloud/nodejs/*.wasm"],
    "/app/api/**/*": ["./node_modules/@subzerocloud/nodejs/*.wasm"],
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
    "/src/app/api/\\[query\\]": ["./node_modules/@subzerocloud/nodejs/*.wasm"],
    "/src/app/api/\\[query\\]/*": [
      "./node_modules/@subzerocloud/nodejs/*.wasm",
    ],
    "/src/app/api/*": ["./node_modules/@subzerocloud/nodejs/*.wasm"],
    "/src/app/api/**": ["./node_modules/@subzerocloud/nodejs/*.wasm"],
    "/src/app/api/**/*": ["./node_modules/@subzerocloud/nodejs/*.wasm"],
    "/src/app/api/playing_with_neon/*": [
      "./node_modules/@subzerocloud/nodejs/*.wasm",
    ],
  },
};

export default nextConfig;
