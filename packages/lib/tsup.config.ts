import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/main.ts"],
  outDir: "dist",
  format: ["cjs", "esm"],
  platform: "node",
  target: "es6",
  bundle: true,
  clean: true,
  minify: true,
  splitting: true,
  // noExternal: ['express'],
});
