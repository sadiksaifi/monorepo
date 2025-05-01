import { useTRPC } from "@/lib/trpc-client";
import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { Avatar, AvatarFallback, AvatarImage } from "@workspace/ui/components/avatar";
import { Button } from "@workspace/ui/components/button";
import { Input } from "@workspace/ui/components/input";
import { Airplay, Phone, Send, Video } from "lucide-react";

export const Route = createFileRoute("/_app/chat/$")({
  component: RouteComponent,
});

function RouteComponent() {
  const params = Route.useParams();
  const trpc = useTRPC();
  const address = params._splat;
  const friendId = address?.split("--")[0];
  const { data: friend } = useQuery(
    trpc.friend.getById.queryOptions({ friendId: friendId ?? "" }),
  );
  const nameInitials = friend?.name
    .split(" ")
    .map((name) => name[0])
    .join("");
  return (
    <div className="flex flex-col">
      <div className="flex justify-between items-center px-4 border-b h-[var(--app-header-height)]">
        <div className="flex items-center gap-2">
          <Avatar>
            <AvatarImage src={friend?.image ?? ""} />
            <AvatarFallback>{nameInitials}</AvatarFallback>
          </Avatar>
          <div>
            <p>{friend?.name}</p>
            <span className="text-xs text-muted-foreground">Online</span>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="icon">
            <Phone className="size-5" />
          </Button>
          <Button variant="ghost" size="icon">
            <Video className="size-6" />
          </Button>
          <Button variant="ghost" size="icon">
            <Airplay className="size-5" />
          </Button>
        </div>
      </div>
      <div className="h-[calc(100vh-2*var(--app-header-height))] overflow-y-auto relative">
        <div className="flex items-center gap-2 py-4 px-2 absolute bottom-0 w-full border-t justify-between">
          <Input
            className="border-none ring-0 rounded-none focus-visible:ring-0 !bg-transparent w-full"
            placeholder="Message"
          />
          <Button variant="ghost" size="icon">
            <Send className="size-5" />
          </Button>
        </div>
      </div>
    </div>
  );
}
