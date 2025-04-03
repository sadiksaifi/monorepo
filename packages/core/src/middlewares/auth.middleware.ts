import type { Request, Response, NextFunction } from "express";
import Auth from "~/lib/auth";
import { setCookies } from "~/lib/cookies";
import { accessTokenTTL } from "~/utils/constants";
import type { User } from "@prisma/client";

declare global {
  namespace Express {
    interface Request {
      user?: User;
    }
  }
}

const auth = new Auth();

async function middleware(req: Request, res: Response, next: NextFunction) {
  const accessToken = req.cookies["access-token"];
  const refreshToken = req.cookies["refresh-token"];

  if (!refreshToken) {
    res.status(401).send({ message: "Unauthorized!" });
    return;
  }

  const accessTokenPayload = await auth.verifyJwtToken(accessToken);
  if (!accessTokenPayload) {
    const refreshTokenPayload = await auth.verifyJwtToken(refreshToken);
    if (!refreshTokenPayload) {
      res.status(401).send({ message: "Unauthorized!" });
      return;
    }
    const sessionId = refreshTokenPayload.sessionId;
    const userSession = await auth.getSession(sessionId!);

    if (!userSession) {
      res.status(401).send({ message: "Unauthorized!" });
      return;
    }

    const dbUser = await auth.getUserBySessionId(sessionId!);
    if (!dbUser) {
      res.status(401).send({ message: "Unauthorized!" });
      return;
    }
    const newAccessTokenPayload = {
      id: dbUser.id,
    };
    const newAccessToken = await auth.generateJwtToken(
      newAccessTokenPayload,
      new Date(Date.now() + accessTokenTTL),
    );
    setCookies(
      res,
      { "access-token": newAccessToken },
      { maxAge: accessTokenTTL },
    );
    req.user = dbUser;
    return next();
  }

  const user = await auth.getUserById(accessTokenPayload.userId!);
  if (!user) {
    res.status(401).send("Unauthorized");
  }
  req.user = user!;

  return next();
}

export default middleware;
