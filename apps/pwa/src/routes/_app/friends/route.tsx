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

export const Route = createFileRoute("/_app/friends")({
  component: RouteComponent,
});

function RouteComponent() {
  const navigation: { label: string; to: LinkProps["to"] }[] = [
    { label: "All Friends", to: "/friends" },
    { label: "Add Friend", to: "/friends/add" },
    { label: "Friend Requests", to: "/friends/requests" },
  ];
  const pathname = useRouterState().location.pathname;

  return (
    <>
      <Page.HeaderComponent
        headerProps={{
          title: "Friends",
        }}
        descriptionProps={{
          description: "Manage your friends and requests.",
        }}
      />
      <TabNavigation.Root>
        <TabNavigation.List className={cn("h-tab-navigation")}>
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
