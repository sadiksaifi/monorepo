/**
 * This a minimal tRPC server
 */
import { z } from "zod";
import { fakeDb } from "../lib/fake-db";
import { publicProcedure } from "../lib/tprc";
import type { TRPCRouterRecord } from "@trpc/server";

export const user = {
  list: publicProcedure.query(async () => {
    // Retrieve users from a datasource, this is an imaginary database
    const users = await fakeDb.user.findMany();
    //    ^?
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return users;
  }),
  byIdOrName: publicProcedure
    .input(z.object({ id: z.string().optional(), name: z.string().optional() }))
    .query(async (opts) => {
      const { input } = opts;
      //      ^?
      // Retrieve the user with the given name or ID
      const users = await fakeDb.user.findByIdOrName(input.id, input.name);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      return users;
    }),
  byId: publicProcedure.input(z.string()).query(async (opts) => {
    const { input } = opts;
    //      ^?
    // Retrieve the user with the given ID
    const user = await fakeDb.user.findById(input);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return user;
  }),
  create: publicProcedure.input(z.object({ name: z.string() })).mutation(async (opts) => {
    const { input } = opts;
    //      ^?
    // Create a new user in the database
    const user = await fakeDb.user.create(input);
    //    ^?
    return user;
  }),
} satisfies TRPCRouterRecord;
