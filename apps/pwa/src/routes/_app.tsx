import { MobileAppLayout } from "@/lib/components/mobile-app-layout";
import { AppHeader } from "@/lib/components/app-header";
import { AppSidebar } from "@/lib/components/app-sidebar";
import { createFileRoute, Outlet, Link, LinkOptions } from "@tanstack/react-router";
import { SidebarInset, SidebarProvider } from "@workspace/ui/components/sidebar";
import { useIsMobile } from "@workspace/ui/hooks/use-mobile";
import { BellIcon } from "lucide-react";
import { Button } from "@workspace/ui/components/button";
import { Badge } from "@workspace/ui/components/badge";
import { useRouterState } from "@tanstack/react-router";
import { getUser } from "@/lib/utils/get-user";

let userPromiseFlag = false;
export const Route = createFileRoute("/_app")({
  component: RouteComponent,
  beforeLoad: async () => {
    async function fetchUser() {
      const user = await getUser();
      if (!user?.id) {
        const href: LinkOptions["to"] = "/auth/sign-in";
        window.location.href = href;
      }
    }
    const fetchUserPromise = fetchUser();
    if (userPromiseFlag) await fetchUserPromise;
    userPromiseFlag = true;
  },
});

function RouteComponent() {
  const isMobile = useIsMobile();
  const { location } = useRouterState();
  const currentPath = location.pathname;

  // Check if we're on the home page to show the notification bell
  const isHomePage = currentPath === "/home" || currentPath === "/_app/home";

  // Example notification data
  const hasNotifications = true;
  const notificationCount = 3;

  // Notification bell component for the header right slot
  const NotificationBell = isHomePage ? (
    <Button variant="ghost" size="icon" className="rounded-full h-9 w-9 relative" asChild>
      <Link to="/test/notifications">
        <BellIcon className="h-5 w-5" />
        {hasNotifications && (
          <Badge
            variant="destructive"
            className="absolute top-0 right-0 h-4 min-w-4 p-0 flex items-center justify-center text-[10px]"
          >
            {notificationCount > 99 ? "99+" : notificationCount}
          </Badge>
        )}
        <span className="sr-only">Notifications</span>
      </Link>
    </Button>
  ) : null;

  return (
    <>
      {isMobile ? (
        <MobileAppLayout bottomBarVariant="default" headerRightSlot={NotificationBell} />
      ) : (
        <SidebarProvider>
          <AppSidebar />
          <SidebarInset>
            <AppHeader />
            <Outlet />
          </SidebarInset>
        </SidebarProvider>
      )}
    </>
  );
}
