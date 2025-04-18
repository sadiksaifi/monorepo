import * as schema from "./schema/index.js";
import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import { config } from "dotenv";

config({ path: ".env" }); // or .env.local

const client = neon(process.env.DATABASE_URL!);
export const db = drizzle({ client, schema });
