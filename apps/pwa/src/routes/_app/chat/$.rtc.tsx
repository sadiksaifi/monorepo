import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_app/chat/$/rtc")({
  component: RouteComponent,
});

function RouteComponent() {
  const { _splat: roomId } = Route.useParams();

  console.log("roomId: ", roomId);

  return <div>this is rtc screen</div>;
}
