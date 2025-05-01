import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/app.ts"],
  outDir: "dist",
  target: "node18",
  format: ["esm"], // or 'cjs' if needed
  sourcemap: false,
  splitting: false,
  clean: true,
  dts: false,
  shims: true,
});
