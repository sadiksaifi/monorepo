import { Router } from "express";
import meRouter from "./_private/me/me.route";

const router = Router();

router.use(meRouter);

export default router;
