import { Provider } from "@/lib/provider";
import { createRootRouteWithContext, Outlet } from "@tanstack/react-router";
// import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { trpcClient } from "../lib/trpc-client";
import { QueryClient } from "@tanstack/react-query";
import { RouterLoaderMobile } from "@/lib/components/router-loader";
import { getUserSession, UserSession } from "@/lib/auth-client";

interface RouterAppContext extends UserSession {
  trpc: typeof trpcClient;
  queryClient: QueryClient;
}

declare global {
  interface Window {
    isSessionCached: UserSession | null;
  }
}

window.isSessionCached = null;
export const Route = createRootRouteWithContext<RouterAppContext>()({
  component: RootRouteComponent,
  beforeLoad: async () => {
    if (!window.isSessionCached) {
      window.isSessionCached = await getUserSession();
    } else {
      getUserSession().then((res) => {
        window.isSessionCached = res;
      });
    }
    return window.isSessionCached;
  },
  pendingComponent: RouterLoaderMobile,
});

function RootRouteComponent() {
  return (
    <Provider>
      <Outlet />
      {/* <TanStackRouterDevtools position="bottom-right" /> */}
    </Provider>
  );
}
