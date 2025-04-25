import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_app/discover")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/_app/discover"!</div>;
}
