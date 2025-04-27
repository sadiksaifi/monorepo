import antfu from "@antfu/eslint-config";

export default antfu(
  {
    type: "app",
    typescript: true,
    formatters: true,
    stylistic: {
      indent: 2,
      semi: true,
      quotes: "double",
    },
    ignores: ["**/.drizzle/*", "dist/*", "dist-drizzle/*"],
  },
  {
    rules: {
      "no-console": ["warn"],
      "node/prefer-global/process": ["off"],
      "antfu/no-top-level-await": ["off"],
    },
  },
);
