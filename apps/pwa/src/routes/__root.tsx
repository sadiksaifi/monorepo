import { Provider } from "@/lib/provider";
import { createRootRouteWithContext, Outlet } from "@tanstack/react-router";
// import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { trpcClient } from "../lib/trpc-client";
import { QueryClient } from "@tanstack/react-query";
import { getUser } from "@/lib/utils/get-user";

type RouterAppContext = {
  trpc: typeof trpcClient;
  queryClient: QueryClient;
  user: Awaited<ReturnType<typeof getUser>>;
};

export const Route = createRootRouteWithContext<RouterAppContext>()({
  beforeLoad: async () => {
    const user = await getUser();
    return { user };
  },
  component: RootRouteComponent,
});

function RootRouteComponent() {
  return (
    <Provider>
      <Outlet />
      {/* <TanStackRouterDevtools position="bottom-right" /> */}
    </Provider>
  );
}
