import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  output: "standalone",
  outputFileTracingIncludes: {
    "/api//\\[\\[\\.\\.\\.query\\]\\]": [
      "./node_modules/@subzerocloud/nodejs/subzero_wasm_bg.wasm",
    ],
    "/api/\\[\\.\\.\\.query\\]": [
      "./node_modules/@subzerocloud/nodejs/subzero_wasm_bg.wasm",
    ],
    "/api/*": ["./node_modules/@subzerocloud/nodejs/subzero_wasm_bg.wasm"],
    "/api/**": ["./node_modules/@subzerocloud/nodejs/subzero_wasm_bg.wasm"],
  },
};

export default nextConfig;
