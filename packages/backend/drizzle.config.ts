import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: "./src/lib/schema/index.ts",
  out: "./.drizzle",
  dialect: "postgresql",
  dbCredentials: {
    // eslint-disable-next-line node/prefer-global/process
    url: process.env.DATABASE_URL!,
  },
});
