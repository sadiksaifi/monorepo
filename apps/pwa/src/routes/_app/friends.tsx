import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_app/friends")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/_app/friends"!</div>;
}
