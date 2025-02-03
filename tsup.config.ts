import { defineConfig } from "tsup";

export default defineConfig({
  format: ["esm", "cjs"],
  clean: true,
  minify: true,
  dts: true,
  entry: [
    "src/index.ts",
    "src/bid-requester/index.ts",
    "src/builder/index.ts",
    "src/builder/v26/index.ts",
    "src/schema/index.ts",
    "src/schema/v26/index.ts",
    "src/macro-replacer/index.ts"
  ],
});
