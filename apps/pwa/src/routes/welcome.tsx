import { useTRPC } from "@/lib/trpc-client";
import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/welcome")({
  component: RouteComponent,
});

function RouteComponent() {
  const trpc = useTRPC();
  const { data, isPending } = useQuery(trpc.user.list.queryOptions());

  return <div>{isPending ? "Loading..." : JSON.stringify(data)}</div>;
}
