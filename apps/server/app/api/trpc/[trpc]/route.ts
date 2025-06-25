import { fetchRequestHandler } from "@trpc/server/adapters/fetch";
import { appRouter } from "@workspace/backend/trpc/router";
import { createContext } from "@workspace/backend/trpc/context";

function trpcHandler(req: Request) {
  return fetchRequestHandler({
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
}

export { trpcHandler as GET, trpcHandler as POST };
