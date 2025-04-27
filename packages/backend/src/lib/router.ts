import * as routes from "../server";
import { createTRPCRouter } from "./tprc";

export const appRouter = createTRPCRouter(routes);
export type TRPCRouter = typeof appRouter;
