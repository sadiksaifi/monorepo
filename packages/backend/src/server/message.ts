import type { TRPCRouterRecord } from "@trpc/server";
import { protectedProcedure } from "@workspace/backend/trpc/setup";
import { z } from "zod";
import { db } from "../lib/db";
import { messageTable } from "../lib/schema";
import { eq } from "drizzle-orm";

const addMessageSchema = z.object({
  text: z.string(),
  roomId: z.string(),
});

export const message = {
  add: protectedProcedure.input(addMessageSchema).mutation(async ({ ctx, input }) => {
    const data = {
      senderId: ctx.session.user.id,
      ...input,
    };
    const msg = await db.insert(messageTable).values(data);

    console.log(msg);
    return msg;
  }),
  getAllByRoomId: protectedProcedure
    .input(z.object({ roomId: z.string() }))
    .query(async ({ ctx, input }) => {
      const userId = ctx.session.user.id;
      const messages = await db.query.messageTable.findMany({
        where: eq(messageTable.roomId, input.roomId),
      });
      const data = messages.map((message) => {
        let msg;
        if (message.senderId === userId) {
          msg = { outgoing: message.text };
        } else {
          msg = { incoming: message.text };
        }
        return msg;
      });

      return data;
    }),
} satisfies TRPCRouterRecord;
