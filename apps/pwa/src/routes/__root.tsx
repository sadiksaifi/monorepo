import { Provider } from "@/lib/provider";
import { createRootRouteWithContext, Outlet } from "@tanstack/react-router";
// import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { trpcClient } from "../lib/trpc-client";
import { QueryClient } from "@tanstack/react-query";

type RouterAppContext = {
  trpc: typeof trpcClient;
  queryClient: QueryClient;
};

export const Route = createRootRouteWithContext<RouterAppContext>()({
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
