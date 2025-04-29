import { auth } from "@workspace/backend/auth";
import { toNextJsHandler } from "better-auth/next-js";
import { withCorsHeaders, createCorsPreflightResponse } from "../../../utils/cors";

const { GET: authGet, POST: authPost } = toNextJsHandler(auth.handler);

export async function GET(request: Request) {
  const response = await authGet(request);
  return withCorsHeaders(response, request);
}

export async function POST(request: Request) {
  const response = await authPost(request);
  return withCorsHeaders(response, request);
}

export async function OPTIONS(request: Request) {
  return createCorsPreflightResponse(request);
}
