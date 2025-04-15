import * as api from "../routes";
import { createTRPCRouter } from "./tprc";

export const router = createTRPCRouter(api);
export type TRPCRouter = typeof router;
