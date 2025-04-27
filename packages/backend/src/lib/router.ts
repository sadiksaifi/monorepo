import * as routes from "../server";
import { createTRPCRouter } from "./trpc";

export const appRouter = createTRPCRouter(routes);
export type TRPCRouter = typeof appRouter;
