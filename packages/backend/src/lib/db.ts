"use server";

import env from "../env";
import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import * as schema from "./schema";

const client = neon(env.DATABASE_URL!);

export const db = drizzle({ client, schema });
