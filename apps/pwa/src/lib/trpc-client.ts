import { createTRPCContext, createTRPCOptionsProxy } from "@trpc/tanstack-react-query";
import { QueryClient } from "@tanstack/react-query";
import superjson from "superjson";
import { createTRPCClient, httpBatchLink } from "@trpc/client";
import type { TRPCRouter } from "@workspace/backend/trpc/router";

export const queryClient = new QueryClient({
  defaultOptions: {
    dehydrate: { serializeData: superjson.serialize },
    hydrate: { deserializeData: superjson.deserialize },
  },
});

export const trpcClient = createTRPCClient<TRPCRouter>({
  links: [
    httpBatchLink({
      url: `${import.meta.env.VITE_BACKEND_URL ?? "http://localhost:3000"}` + "/api/trpc",
      transformer: superjson,
      fetch(url, options) {
        return fetch(url, {
          ...options,
          credentials: "include",
        });
      },
    }),
  ],
});

export const serverHelpers = createTRPCOptionsProxy<TRPCRouter>({
  queryClient,
  client: trpcClient,
});

export const { TRPCProvider, useTRPC } = createTRPCContext<TRPCRouter>();
