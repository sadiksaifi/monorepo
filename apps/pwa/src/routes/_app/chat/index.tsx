import { createFileRoute } from "@tanstack/react-router";
import { Button } from "@workspace/ui/components/button";
import { MessageSquareMore } from "lucide-react";

export const Route = createFileRoute("/_app/chat/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="flex h-[calc(100vh-var(--height-app-header))] -mt-10 flex-col items-center justify-center gap-4">
      <div className="flex flex-col items-center justify-center gap-2">
        <MessageSquareMore className="size-20" />
      </div>
      <div className="flex flex-col items-center justify-center gap-2">
        <h1>Your messages</h1>
        <p>Send a message to start a chat.</p>
      </div>
      <Button>Start a chat</Button>
    </div>
  );
}
