import type { TRPCRouterRecord } from "@trpc/server";
import { publicProcedure } from "@workspace/backend/trpc/setup";

/**
 * This a minimal tRPC server
 */
import { z } from "zod";

export const user = {
  list: publicProcedure.query(async () => {
    return Array.from({ length: 10 }, (_, i) => ({
      id: i,
      name: `User ${i}`,
    }));
  }),
} satisfies TRPCRouterRecord;
