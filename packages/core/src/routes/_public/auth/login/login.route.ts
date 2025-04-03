import { Router } from "express";
import Auth from "~/lib/auth";
import { setCookies } from "~/lib/cookies";
import db from "~/lib/db";
import { accessTokenTTL, refreshTokenTTL } from "~/utils/constants";

const router = Router();
const auth = new Auth();

router.post("/auth/login", async (req, res) => {
  try {
    const { password } = req.body;
    const email = (req.body.email as string).toLowerCase();

    if (!email || !password) {
      res.status(400).send({ message: "Email and password is required!" });
      return;
    }

    const user = await db.user.findUnique({ where: { email } });
    if (!user) {
      res.status(400).send({ message: "Invalid email or password!" });
      return;
    }

    const isPasswordValid = await auth.verifyPassword(user.password!, password);
    if (!isPasswordValid) {
      res.status(400).send({ message: "Invalid email or password!" });
      return;
    }

    const session = await auth.createSession(user.id);
    if (!session) {
      res.status(500).send({ message: "Something went wrong!" });
      return;
    }

    const accessToken = await auth.generateJwtToken(
      { userId: session.user.id },
      new Date(Date.now() + accessTokenTTL),
    );
    const refreshToken = await auth.generateJwtToken(
      { sessionId: session.id },
      new Date(Date.now() + refreshTokenTTL),
    );

    setCookies(
      res,
      { "access-token": accessToken },
      { maxAge: accessTokenTTL },
    );
    setCookies(
      res,
      { "refresh-token": refreshToken },
      { maxAge: refreshTokenTTL },
    );
    res.status(201).send();
  } catch (error) {
    if (error instanceof Error) {
      console.log("Error Message:", error.message);
    }
    console.error(error);
    res.status(500).send({ message: "Something went wrong!" });
  }
});

export default router;
