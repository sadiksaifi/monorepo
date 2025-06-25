import { NextResponse } from "next/server";

const CLIENT_ORIGINS = [process.env.CLIENT_ORIGIN, process.env.FLAT_FINDER_ORIGIN];

export default async function middleware(request: Request) {
  const origin = request.headers.get("origin");
  const response = NextResponse.next();
  let CLIENT_ORIGIN = "";

  if (origin && CLIENT_ORIGINS.includes(origin)) {
    CLIENT_ORIGIN = origin;
  }

  response.headers.set("Access-Control-Allow-Credentials", "true");
  response.headers.set("Access-Control-Allow-Origin", CLIENT_ORIGIN);
  response.headers.set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  response.headers.set(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization, X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Date, X-Api-Version, b3, traceparent, ",
  );

  return response;
}

export const config = {
  matcher: ["/api/:path*"],
};
