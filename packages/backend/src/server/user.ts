import type { TRPCRouterRecord } from "@trpc/server";
import { protectedProcedure, publicProcedure } from "@workspace/backend/trpc/setup";

/**
 * This a minimal tRPC server
 */
import { z } from "zod";

export const user = {
  session: protectedProcedure.query(async ({ ctx }) => {
    return ctx.session;
  }),
} satisfies TRPCRouterRecord;
