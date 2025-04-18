import * as api from "../api/index.js";
import { createTRPCRouter } from "./trpc.js";
export const router = createTRPCRouter(api);

export type TRPCRouter = typeof router;
