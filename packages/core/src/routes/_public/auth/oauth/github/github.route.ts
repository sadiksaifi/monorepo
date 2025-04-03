import { Router } from "express";
import { getGithubOAuthUser } from "./github.service";
import { db } from "~/lib/db";
import { Provider } from "@prisma/client";
import Auth from "~/lib/auth";
import { accessTokenTTL, refreshTokenTTL } from "~/utils/constants";
import { setCookies } from "~/lib/cookies";

const router = Router();
const auth = new Auth();

router.get("/auth/oauth/github", async (req, res) => {
  try {
    const { code } = req.query as {
      code: string;
    };
    const oAuthGithubUser = await getGithubOAuthUser(code);
    if (!oAuthGithubUser) {
      res.status(401).send("Something went wrong!");
      return;
    }
    const dbUser = await db.user.findFirst({
      where: {
        email: oAuthGithubUser.email,
      },
    });

    if (dbUser) {
      console.log("Existing user found");
      const user = await db.account.update({
        where: {
          userId: dbUser.id,
        },
        data: {
          providerAccountId: oAuthGithubUser.providerAccountId.toString(),
          provider: Provider.GITHUB,
        },
      });
      const session = await auth.createSession(user.id);

      const accessToken = await auth.generateJwtToken(
        { userId: session?.user.id },
        new Date(Date.now() + accessTokenTTL),
      );
      const refreshToken = await auth.generateJwtToken(
        { sessionId: session?.id },
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

      res.status(201).send({
        message: "Existing user found",
      });
      return;
    }

    await db.user.create({
      data: {
        email: oAuthGithubUser.email,
        name: oAuthGithubUser.name,
        avatarUrl: oAuthGithubUser.avatarUrl,
        Account: {
          create: {
            providerAccountId: oAuthGithubUser.providerAccountId.toString(),
            provider: Provider.GITHUB,
          },
        },
      },
    });

    res.status(201).send({
      message: "New user created",
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Something went wrong!" });
  }
});

export default router;
