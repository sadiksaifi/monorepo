import * as routes from "../../server";
import { createTRPCRouter } from "./setup";

export const appRouter = createTRPCRouter(routes);
export type TRPCRouter = typeof appRouter;
