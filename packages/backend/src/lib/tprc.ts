import { initTRPC } from "@trpc/server";
import superjson from "superjson";

/**
 * Initialization of tRPC backend
 * Should be done only once per backend!
 */
export const t = initTRPC.create({
  transformer: superjson,
});

/**
 * Export reusable router and procedure helpers
 * that can be used throughout the router
 */
export const createTRPCRouter = t.router;
export const publicProcedure = t.procedure;
