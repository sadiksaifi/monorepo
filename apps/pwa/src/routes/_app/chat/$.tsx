import { useSocket } from "@/lib/provider/socket.provider";
import { useTRPC } from "@/lib/trpc-client";
import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { Avatar, AvatarFallback, AvatarImage } from "@workspace/ui/components/avatar";
import { Button } from "@workspace/ui/components/button";
import { Input } from "@workspace/ui/components/input";
import { Send } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { getNameInitials } from "@/lib/utils/getNameInitials";
import { ErrorComponent, PendingComponent } from "@/lib/components/router-components";
import { DialCall } from "@/lib/components/call";

export const Route = createFileRoute("/_app/chat/$")({
  component: RouteComponent,
  errorComponent: ErrorComponent,
  pendingComponent: PendingComponent,
});

function RouteComponent() {
  const context = Route.useRouteContext();

  const socket = useSocket();
  const trpc = useTRPC();
  const { _splat: roomId } = Route.useParams();
  const userId = context.user.id;
  const remoteUserId = roomId?.split("--")?.find((id) => id !== userId);
  const { data: friend, isPending: isPendingFriend } = useQuery(
    trpc.friend.getById.queryOptions({ friendId: remoteUserId ?? "" }),
  );
  const nameInitials = getNameInitials(friend?.name ?? "");
  const [isOnline, setIsOnline] = useState(false);

  const isRoomJoinRef = useRef(false);
  useEffect(() => {
    if (isRoomJoinRef.current) return;
    socket.emit("room:join", { userId, roomId });
    isRoomJoinRef.current = true;
  }, [roomId, socket, userId]);

  const handleRoomJoined = useCallback(
    (data: { userId?: string }) => {
      if (data && data.userId && remoteUserId === data.userId) {
        console.log("online user", data.userId);
        setIsOnline(true);
      } else {
        setIsOnline(false);
      }
    },
    [remoteUserId],
  );

  useEffect(() => {
    socket.on("room:joined", handleRoomJoined);

    return () => {
      socket.off("room:joined", handleRoomJoined);
    };
  }, [handleRoomJoined, roomId, socket, userId]);

  if (isPendingFriend) return <PendingComponent />;

  return (
    <div className="flex flex-col">
      <div className="flex justify-between items-center px-4 border-b h-[var(--app-header-height)]">
        <div className="flex items-center gap-2">
          <Avatar>
            <AvatarImage src={friend?.image ?? ""} />
            <AvatarFallback>{nameInitials}</AvatarFallback>
          </Avatar>
          <div>
            <p>
              {friend?.name}: {friend?.id}
            </p>
            <span className="text-xs text-muted-foreground">
              {isOnline ? "Online" : "Offline"}
            </span>
          </div>
        </div>
        <DialCall userId={userId} remoteUserId={remoteUserId!} />
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
