import { Router } from "express";
import Auth from "~/lib/auth";
import { clearCookies } from "~/lib/cookies";

const router = Router();
const auth = new Auth();

router.delete("/auth/logout", async (req, res) => {
  const refreshToken = req?.cookies["refresh-token"];
  const token = await auth.verifyJwtToken(refreshToken);
  if (!token) {
    res.status(401).send({ message: "Something went wrong!" });
    return;
  }
  clearCookies(res, ["access-token", "refresh-token"]);
  await auth.invalidateSession(token.sessionId!);

  res.status(204).send();
});

export default router;
