import type { JWTPayload } from "jose";
import { SignJWT, jwtVerify } from "jose";
import { createSecretKey } from "node:crypto";
import argon2 from "argon2";
import { accessTokenTTL } from "./constants";

class Auth<CustomJWTPayload extends JWTPayload> {
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
}

export { Auth };
