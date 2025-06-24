import { type TRPCRouterRecord } from "@trpc/server";
import { protectedProcedure, publicProcedure } from "@workspace/backend/trpc/setup";
import { z } from "zod";
import { db } from "../lib/db";
import { flatTable } from "../lib/schema";
import { eq } from "drizzle-orm";
import { addFlatSchema } from "./flat.schema";

export const flat = {
  add: protectedProcedure.input(addFlatSchema).mutation(async ({ ctx, input }) => {
    console.log("sesssion: ", ctx.session);
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
    const isLoggedIn = ctx.session?.session.userId;
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

    let favorite: boolean = false;
    if (isLoggedIn) {
      const userId = ctx.session?.user.id!;
      const isFavorite = data?.starred?.find((item) => item === userId);
      if (isFavorite) {
        favorite = true;
      }
    }

    return {
      ...data,
      ownerPhone,
      mapsLocationLink,
      starred: favorite,
    };
  }),
  toggleFavorite: protectedProcedure
    .input(z.string())
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.session?.user.id!;

      const dt = await db.query.flatTable.findFirst({
        where: eq(flatTable.id, input),
        columns: {
          starred: true,
        },
      });
      const starred = dt?.starred ?? [];
      starred.includes(userId)
        ? await db.update(flatTable).set({
            starred: starred.filter((item) => item !== userId),
          })
        : await db.update(flatTable).set({
            starred: [...starred, userId],
          });
      console.log("starred: ", starred);
    }),
} satisfies TRPCRouterRecord;
