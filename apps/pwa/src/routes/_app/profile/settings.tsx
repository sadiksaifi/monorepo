import { TabNavigation } from "@/lib/components/tab-navigation";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_app/profile/settings")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <TabNavigation.Content className="p-6">
      <div>Hello "/_app/profile/settings"!</div>
    </TabNavigation.Content>
  );
}
