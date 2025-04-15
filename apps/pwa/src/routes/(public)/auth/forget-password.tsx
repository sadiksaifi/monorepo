import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(public)/auth/forget-password")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/(public)/_auth/forget-password"!</div>;
}
