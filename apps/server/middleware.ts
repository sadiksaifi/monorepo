import { NextResponse } from "next/server";

const CLIENT_ORIGIN = process.env.CLIENT_ORIGIN ?? "http://localhost:5173";

export default async function middleware() {
  const response = NextResponse.next();

  response.headers.set("Access-Control-Allow-Credentials", "true");
  response.headers.set("Access-Control-Allow-Origin", CLIENT_ORIGIN);
  response.headers.set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  response.headers.set(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization, X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Date, X-Api-Version, b3, traceparent, x-uploadthing-version, x-uploadthing-package",
  );

  return response;
}

export const config = {
  matcher: ["/api/:path*"],
};
