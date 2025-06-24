import { TRPCError, type TRPCRouterRecord } from "@trpc/server";
import { protectedProcedure, publicProcedure } from "@workspace/backend/trpc/setup";
import { z } from "zod";
import { db } from "../lib/db";
import { flatTable } from "../lib/schema";
import { eq } from "drizzle-orm";
import { addFlatSchema } from "./flat.schema";

export const flat = {
  add: publicProcedure.input(addFlatSchema).mutation(async ({ ctx, input }) => {
    console.log(input);
    const data = await db
      .insert(flatTable)
      .values({
        ...input,
      })
      .returning();
    const id = data[0]?.id;
    return id;
  }),
  getAll: publicProcedure.query(async ({ ctx }) => {
    return await db.query.flatTable.findMany();
  }),
  getById: publicProcedure.input(z.string()).query(async ({ ctx, input }) => {
    const data = await db.query.flatTable.findFirst({
      where: eq(flatTable.id, input),
    });
    const ownerPhone = `+${data?.ownerPhone?.split(" ").join("")}`;
    const mapsLocationLink = !data?.mapsLocationLink
      ? ""
      : data?.mapsLocationLink.toString().includes("http")
        ? data?.mapsLocationLink
        : `https://www.google.com/maps/search/?api=1&query=${data?.mapsLocationLink
            .split(",")
            .map((item) => item.trim())
            .join(",")}`;
    return {
      ...data,
      ownerPhone,
      mapsLocationLink,
    };
  }),
} satisfies TRPCRouterRecord;
