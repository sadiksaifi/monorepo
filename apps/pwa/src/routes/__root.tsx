import { Provider } from "@/lib/provider";
import { createRootRouteWithContext, Link, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { buttonVariants } from "@workspace/ui/components/button";
import { cn } from "@workspace/ui/lib/utils";
import { trpcClient } from "../lib/trpc-client";

const links = [
  {
    label: "Calculator",
    to: "/calc",
  },
  {
    label: "Welcome",
    to: "/welcome",
  },
  {
    label: "Dashboard",
    to: "/dashboard",
  },
  {
    label: "Home",
    to: "/",
  },
];
type RouterAppContext = {
  trpc: typeof trpcClient;
}

export const Route = createRootRouteWithContext<RouterAppContext>()({
  component: ({ context }) => (
    <Provider>
      <div className="flex gap-2 justify-center w-full items-center h-14 border-b">
        {links.map((link) => (
          <Link
            key={link.to}
            to={link.to}
            className={cn(buttonVariants({ variant: "link" }))}
          >
            {link.label}
          </Link>
        ))}
      </div>
      <Outlet />
      <TanStackRouterDevtools />
    </Provider>
  ),
});
