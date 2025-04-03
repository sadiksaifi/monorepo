import { Router } from "express";
import authRouter from "./_public/auth/auth.route";
import healthcheckRouter from "./_public/healthcheck/healthcheck.route";

const router = Router();

router.use(authRouter);
router.use(healthcheckRouter);

export default router;
