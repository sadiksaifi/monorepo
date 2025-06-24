import { type TRPCRouterRecord } from "@trpc/server";
import { protectedProcedure, publicProcedure } from "@workspace/backend/trpc/setup";
import { z } from "zod";
import { db } from "../lib/db";
import { flatTable } from "../lib/schema";
import { eq } from "drizzle-orm";
import { addFlatSchema } from "./flat.schema";

export const flat = {
  add: protectedProcedure.input(addFlatSchema).mutation(async ({ ctx, input }) => {
    const userId = ctx.session.user.id;
    const data = await db
      .insert(flatTable)
      .values({
        userId,
        ...input,
      })
      .returning();
    const id = data[0]?.id;
    return id;
  }),
  getAll: publicProcedure.query(async ({ ctx }) => {
    const isLoggedIn = ctx.session?.session.userId;
    const data = (await db.query.flatTable.findMany()) ?? [];

    if (isLoggedIn) {
      const userId = ctx.session?.user.id!;
      const items = data.map((item) => {
        let favorite: boolean = false;
        const isFavorite = item?.starred?.find((item) => item === userId);
        if (isFavorite) {
          favorite = true;
        }
        return {
          ...item,
          starred: favorite,
        };
      });
      return items;
    }
    let favorite: boolean = false;
    const items = data.map((item) => {
      return {
        ...item,
        starred: favorite,
      };
    });
    return items;
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
        ? await db
            .update(flatTable)
            .set({
              starred: starred.filter((item) => item !== userId),
            })
            .where(eq(flatTable.id, input))
        : await db
            .update(flatTable)
            .set({
              starred: [...starred, userId],
            })
            .where(eq(flatTable.id, input));
    }),
} satisfies TRPCRouterRecord;
