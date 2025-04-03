import { Router } from "express";
import authLoginRouter from "./login/login.route";
import authLogoutRouter from "./logout/logout.route";
import authSignupRouter from "./signup/signup.route";
import authVerifyRouter from "./verify/verify.route";
import githubAuthOauthRouter from "./oauth/github/github.route";

const router = Router();

router.use(authLoginRouter);
router.use(authLogoutRouter);
router.use(authSignupRouter);
router.use(authVerifyRouter);
router.use(githubAuthOauthRouter);

export default router;
