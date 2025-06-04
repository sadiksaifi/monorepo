import env from "../env";
import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import * as schema from "./schema";

const stubDbURL = "postgresql://postgres:postgres@stubDb.com/postgres?sslmode=require";
const dbURL = env.DATABASE_URL ?? stubDbURL;
console.log(dbURL);
const client = neon(dbURL);

export const db = drizzle({ client, schema });
