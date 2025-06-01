import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/_app/chat/rtc")({
  component: RouteComponent,
});

export function RouteComponent() {
  return <Outlet />;
}
