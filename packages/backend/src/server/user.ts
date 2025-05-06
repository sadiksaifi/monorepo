import type { TRPCRouterRecord } from "@trpc/server";
import { protectedProcedure } from "@workspace/backend/trpc/setup";

export const user = {
  session: protectedProcedure.query(async ({ ctx }) => {
    return ctx.session;
  }),
} satisfies TRPCRouterRecord;
