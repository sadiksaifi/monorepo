import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_app/chat/$")({
  component: RouteComponent,
});

function RouteComponent() {
  const params = Route.useParams();
  const address = params._splat;
  return <div>Hello "/_app/chat/$" {address}</div>;
}
