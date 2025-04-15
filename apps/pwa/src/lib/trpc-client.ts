import { createTRPCContext, createTRPCOptionsProxy } from "@trpc/tanstack-react-query";
import { QueryClient } from "@tanstack/react-query";
import superjson from "superjson";
import { createTRPCClient, httpBatchLink } from "@trpc/client";
import type { TRPCRouter } from "@workspace/backend/router";

export const queryClient = new QueryClient({
  defaultOptions: {
    dehydrate: { serializeData: superjson.serialize },
    hydrate: { deserializeData: superjson.deserialize },
  },
});

export const trpcClient = createTRPCClient<TRPCRouter>({
  links: [
    httpBatchLink({
      url: import.meta.env.BACKEND_URL ?? "http://localhost:3000/trpc",
      transformer: superjson,
    }),
  ],
});

export const serverHelpers = createTRPCOptionsProxy<TRPCRouter>({
  queryClient,
  client: trpcClient,
});

export const { TRPCProvider, useTRPC } = createTRPCContext<TRPCRouter>();
