import Page from "@/lib/components/page-helpers";
import { TabNavigation } from "@/lib/components/tab-navigation";
import {
  createFileRoute,
  Link,
  LinkProps,
  Outlet,
  useRouterState,
} from "@tanstack/react-router";
import { cn } from "@workspace/ui/lib/utils";

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

  return (
    <>
      <Page.HeaderComponent
        headerProps={{
          title: "Profile",
        }}
        descriptionProps={{
          description: "Manage your profile and settings.",
        }}
      />
      <TabNavigation.Root>
        <TabNavigation.List className={cn("h-tab-navigation px-4")}>
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
