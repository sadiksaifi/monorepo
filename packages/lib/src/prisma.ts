import { PrismaClient } from "@prisma/client";

const globalForDb = global as unknown as { db: PrismaClient };

export const db = globalForDb.db || new PrismaClient();

if (process.env.NODE_ENV !== "production") globalForDb.db = db;

export { db as prisma };
