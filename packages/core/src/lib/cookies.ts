import type { Response } from "express";

interface CookieOptions {
  maxAge?: number;
  httpOnly?: boolean;
  sameSite?: "none" | "lax" | "strict";
  secure?: boolean;
}

class Cookie {
  #defaultOptions: CookieOptions = {
    maxAge: 5 * 60 * 1000,
    httpOnly: true,
    sameSite: "none",
    secure: true,
  };

  set(res: Response, cookies: Record<string, string>, options?: CookieOptions) {
    Object.entries(cookies).forEach(([name, value]) => {
      res.cookie(name, value, {
        ...this.#defaultOptions,
        ...options,
      });
    });
  }

  clear(res: Response, cookies: string[] | string) {
    if (Array.isArray(cookies)) {
      cookies.forEach((cookie) => res.cookie(cookie, "", { maxAge: 0 }));
    } else {
      res.cookie(cookies, "", { maxAge: 0 });
    }
  }
}

const cookie = new Cookie();
export const setCookies = cookie.set.bind(cookie);
export const clearCookies = cookie.clear.bind(cookie);
export default Cookie;
