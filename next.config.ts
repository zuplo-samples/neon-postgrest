import type { NextConfig } from "next";

//   output: "standalone",

const nextConfig: NextConfig = {
  reactStrictMode: true,
  webpack: (config) => {
    config.experiments.asyncWebAssembly = true;
    return config;
  },
  outputFileTracingIncludes: {
    "/api//\\[\\[\\.\\.\\.query\\]\\]": [
      "./node_modules/@subzerocloud/nodejs/*.wasm",
      "./node_modules/styled-jsx/**/*",
    ],
    "/api//\\[\\[\\.\\.\\.query\\]\\]/*": [
      "./node_modules/@subzerocloud/nodejs/*.wasm",
      "./node_modules/styled-jsx/**/*",
    ],
    "/api/\\[\\.\\.\\.query\\]": [
      "./node_modules/@subzerocloud/nodejs/*.wasm",
      "./node_modules/styled-jsx/**/*",
    ],
    "/api/\\[\\.\\.\\.query\\]/*": [
      "./node_modules/@subzerocloud/nodejs/*.wasm",
      "./node_modules/styled-jsx/**/*",
    ],
    "/api/\\[query\\]": [
      "./node_modules/@subzerocloud/nodejs/*.wasm",
      "./node_modules/styled-jsx/**/*",
    ],
    "/api/\\[query\\]/*": [
      "./node_modules/@subzerocloud/nodejs/*.wasm",
      "./node_modules/styled-jsx/**/*",
    ],
    "/api/*": [
      "./node_modules/@subzerocloud/nodejs/*.wasm",
      "./node_modules/styled-jsx/**/*",
    ],
    "/api/**": [
      "./node_modules/@subzerocloud/nodejs/*.wasm",
      "./node_modules/styled-jsx/**/*",
    ],
    "/api/**/*": [
      "./node_modules/@subzerocloud/nodejs/*.wasm",
      "./node_modules/styled-jsx/**/*",
    ],
    "/api/playing_with_neon/*": [
      "./node_modules/@subzerocloud/nodejs/*.wasm",
      "./node_modules/styled-jsx/**/*",
    ],
    "/api/playing_with_neon": [
      "./node_modules/@subzerocloud/nodejs/*.wasm",
      "./node_modules/styled-jsx/**/*",
    ],
    "/app/api//\\[\\[\\.\\.\\.query\\]\\]": [
      "./node_modules/@subzerocloud/nodejs/*.wasm",
      "./node_modules/styled-jsx/**/*",
    ],
    "/app/api//\\[\\[\\.\\.\\.query\\]\\]/*": [
      "./node_modules/@subzerocloud/nodejs/*.wasm",
      "./node_modules/styled-jsx/**/*",
    ],
    "/app/api/\\[\\.\\.\\.query\\]": [
      "./node_modules/@subzerocloud/nodejs/*.wasm",
      "./node_modules/styled-jsx/**/*",
    ],
    "/app/api/\\[\\.\\.\\.query\\]/*": [
      "./node_modules/@subzerocloud/nodejs/*.wasm",
      "./node_modules/styled-jsx/**/*",
    ],
    "/app/api/\\[query\\]": [
      "./node_modules/@subzerocloud/nodejs/*.wasm",
      "./node_modules/styled-jsx/**/*",
    ],
    "/app/api/\\[query\\]/*": [
      "./node_modules/@subzerocloud/nodejs/*.wasm",
      "./node_modules/styled-jsx/**/*",
    ],
    "/app/api/*": [
      "./node_modules/@subzerocloud/nodejs/*.wasm",
      "./node_modules/styled-jsx/**/*",
    ],
    "/app/api/**": [
      "./node_modules/@subzerocloud/nodejs/*.wasm",
      "./node_modules/styled-jsx/**/*",
    ],
    "/app/api/**/*": [
      "./node_modules/@subzerocloud/nodejs/*.wasm",
      "./node_modules/styled-jsx/**/*",
    ],
    "/app/api/playing_with_neon": [
      "./node_modules/@subzerocloud/nodejs/*.wasm",
      "./node_modules/styled-jsx/**/*",
    ],
    "/app/api/playing_with_neon/*": [
      "./node_modules/@subzerocloud/nodejs/*.wasm",
      "./node_modules/styled-jsx/**/*",
    ],
    "/src/app/api//\\[\\[\\.\\.\\.query\\]\\]": [
      "./node_modules/@subzerocloud/nodejs/*.wasm",
      "./node_modules/styled-jsx/**/*",
    ],
    "/src/app/api//\\[\\[\\.\\.\\.query\\]\\]/*": [
      "./node_modules/@subzerocloud/nodejs/*.wasm",
      "./node_modules/styled-jsx/**/*",
    ],
    "/src/app/api/\\[\\.\\.\\.query\\]": [
      "./node_modules/@subzerocloud/nodejs/*.wasm",
      "./node_modules/styled-jsx/**/*",
    ],
    "/src/app/api/\\[\\.\\.\\.query\\]/*": [
      "./node_modules/@subzerocloud/nodejs/*.wasm",
      "./node_modules/styled-jsx/**/*",
    ],
    "/src/app/api/\\[query\\]": [
      "./node_modules/@subzerocloud/nodejs/*.wasm",
      "./node_modules/styled-jsx/**/*",
    ],
    "/src/app/api/\\[query\\]/*": [
      "./node_modules/@subzerocloud/nodejs/*.wasm",
      "./node_modules/styled-jsx/**/*",
    ],
    "/src/app/api/*": [
      "./node_modules/@subzerocloud/nodejs/*.wasm",
      "./node_modules/styled-jsx/**/*",
    ],
    "/src/app/api/**": [
      "./node_modules/@subzerocloud/nodejs/*.wasm",
      "./node_modules/styled-jsx/**/*",
    ],
    "/src/app/api/**/*": [
      "./node_modules/@subzerocloud/nodejs/*.wasm",
      "./node_modules/styled-jsx/**/*",
    ],
    "/src/app/api/playing_with_neon/*": [
      "./node_modules/@subzerocloud/nodejs/*.wasm",
      "./node_modules/styled-jsx/**/*",
    ],
  },
};

export default nextConfig;
