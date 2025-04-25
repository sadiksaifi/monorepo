import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/_app/")({
  component: RouteComponent,
  loader: () => {
    return redirect({ to: "/home" });
  },
});

function RouteComponent() {
  return <div>Hello "/"!</div>;
}
