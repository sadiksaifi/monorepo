import env from "../env";
import { drizzle as drizzleNeon } from "drizzle-orm/neon-http";
import { drizzle as drizzleNodePg } from "drizzle-orm/node-postgres";
import { neon } from "@neondatabase/serverless";
import { Pool } from "pg";
import * as schema from "./schema";

const dbURL =
  env.DATABASE_URL ??
  "postgresql://postgres:postgres@stubDb.com/postgres?sslmode=require";
const clientNeon = neon(dbURL);
const clientPg = new Pool({
  connectionString: process.env.DATABASE_URL!,
});

const dbNeon = drizzleNeon({ client: clientNeon, schema });
const dbNodePg = drizzleNodePg({ client: clientPg, schema });

export const db = env.NODE_ENV === "development" ? dbNodePg : dbNeon;
