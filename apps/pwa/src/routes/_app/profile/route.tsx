import Page from "@/lib/components/page-helpers";
import { TabNavigation } from "@/lib/components/tab-navigation";
import {
  createFileRoute,
  Link,
  LinkProps,
  Outlet,
  useRouterState,
} from "@tanstack/react-router";
import { useIsMobile } from "@workspace/ui/hooks/use-mobile";
import { cn } from "@workspace/ui/lib/utils";
import { UserProfile } from "./-components/user-profile";

export const Route = createFileRoute("/_app/profile")({
  component: RouteComponent,
});

function RouteComponent() {
  const navigation: { label: string; to: LinkProps["to"] }[] = [
    { label: "Profile", to: "/profile" },
    { label: "Appearance", to: "/profile/appearence" },
    { label: "Settings", to: "/profile/settings" },
  ];
  const pathname = useRouterState().location.pathname;
  const isMobile = useIsMobile();

  return (
    <>
      {!isMobile && (
        <Page.HeaderComponent
          headerProps={{
            title: "Profile",
          }}
          descriptionProps={{
            description: "Manage your profile and settings.",
          }}
        />
      )}
      {isMobile && <UserProfile className="mt-2" />}
      <TabNavigation.Root className={cn(isMobile && "mt-8")}>
        <TabNavigation.List
          className={cn("h-tab-navigation px-4", isMobile && "px-0 justify-center")}
        >
          {navigation.map((item) => (
            <TabNavigation.Item key={item.label} active={pathname === item.to} asChild>
              <Link to={item.to}>{item.label}</Link>
            </TabNavigation.Item>
          ))}
        </TabNavigation.List>
        <TabNavigation.Content>
          <Outlet />
        </TabNavigation.Content>
      </TabNavigation.Root>
    </>
  );
}
