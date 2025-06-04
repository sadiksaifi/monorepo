import { publicProcedure } from "../lib/trpc/setup";

export const healthcheck = publicProcedure.query(() => {
  return {
    message: "Server is up and running!",
  };
});
