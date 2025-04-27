import { useTRPC } from "@/lib/trpc-client";
import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_app/home")({
  component: RouteComponent,
});

function RouteComponent() {
  const trpc = useTRPC();
  const { data } = useQuery(trpc.user.list.queryOptions());
  console.log(data);

  return <div>Hello "/"!{JSON.stringify(data)}</div>;
}
