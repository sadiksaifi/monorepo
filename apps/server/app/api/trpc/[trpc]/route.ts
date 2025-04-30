import { fetchRequestHandler } from "@trpc/server/adapters/fetch";
import { appRouter } from "@workspace/backend/trpc/router";
import { withCorsHeaders, createCorsPreflightResponse } from "../../../utils/cors";
import { createContext } from "@workspace/backend/trpc/context";

const trpcHandler = (req: Request) =>
  fetchRequestHandler({
    endpoint: "/api/trpc",
    req,
    router: appRouter,
    createContext: () => createContext(req),
    onError:
      process.env.NODE_ENV === "development"
        ? ({ path, error }) => {
            console.error(`❌ tRPC failed on ${path ?? "<no-path>"}: ${error.message}`);
          }
        : undefined,
  });

export async function GET(request: Request) {
  const response = await trpcHandler(request);
  return withCorsHeaders(response, request);
}

export async function POST(request: Request) {
  const response = await trpcHandler(request);
  return withCorsHeaders(response, request);
}

export async function OPTIONS(request: Request) {
  return createCorsPreflightResponse(request);
}
