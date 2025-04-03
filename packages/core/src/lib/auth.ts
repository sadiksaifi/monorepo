import type { JWTPayload } from "jose";
import { SignJWT, jwtVerify } from "jose";
import { createSecretKey } from "node:crypto";
import { accessTokenTTL } from "~/utils/constants";
import argon2 from "argon2";
import db from "~/lib/db";

declare module "jose" {
  interface JWTPayload extends CustomJWTPayload {}
}

class Auth {
  #JWT_AUTH_SECRET = createSecretKey(process.env.JWT_AUTH_SECRET!, "utf-8");

  async generateJwtToken(payload: JWTPayload, expiresIn?: Date) {
    const accessToken = await new SignJWT(payload)
      .setProtectedHeader({
        alg: "HS256",
        typ: "JWT",
      })
      .setIssuedAt()
      .setExpirationTime(expiresIn ?? new Date(Date.now() + accessTokenTTL))
      .sign(this.#JWT_AUTH_SECRET);
    return accessToken;
  }

  async verifyJwtToken(token: string) {
    try {
      const { payload } = await jwtVerify(token, this.#JWT_AUTH_SECRET);
      return payload;
    } catch (error) {
      return null;
    }
  }

  async hashPassword(password: string) {
    return await argon2.hash(password);
  }

  async verifyPassword(hashedPassword: string, password: string) {
    return await argon2.verify(hashedPassword, password);
  }

  generateOtp({ len = 6 }: { len?: number } = {}) {
    return Math.random().toString().slice(-len);
  }

  async getSession(sessionId: string) {
    try {
      const session = await db.userSession.findUnique({
        where: { id: sessionId },
      });

      return session && session.isValid ? session : null;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async invalidateSession(sessionId: string) {
    await db.userSession.update({
      where: { id: sessionId },
      data: {
        isValid: false,
      },
    });
  }

  async createSession(userId: string) {
    try {
      const session = await db.userSession.upsert({
        include: {
          user: true,
        },
        where: { userId },
        create: {
          userId,
          isValid: true,
        },
        update: {
          userId,
          isValid: true,
        },
      });

      return session;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async getUserBySessionId(sessionId: string) {
    try {
      const sessionUser = await db.userSession.findUnique({
        where: {
          id: sessionId,
        },
        select: {
          user: true,
        },
      });
      return sessionUser?.user;
    } catch (e) {
      console.log(e);
      return null;
    }
  }

  async getUserById(userId: string) {
    try {
      return await db.user.findUnique({
        where: {
          id: userId,
        },
      });
    } catch (e) {
      console.log(e);
      return null;
    }
  }
}

export default Auth;
