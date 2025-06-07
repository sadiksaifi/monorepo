import { useSocket } from "@/lib/provider/socket.provider";
import { trpcClient, useTRPC } from "@/lib/trpc-client";
import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { Avatar, AvatarFallback, AvatarImage } from "@workspace/ui/components/avatar";
import { Button } from "@workspace/ui/components/button";
import { Input } from "@workspace/ui/components/input";
import { Send } from "lucide-react";
import { Fragment, useCallback, useEffect, useRef, useState } from "react";
import { getNameInitials } from "@/lib/utils/getNameInitials";
import { ErrorComponent, PendingComponent } from "@/lib/components/router-components";
import { DialCall } from "@/lib/components/call";
import { cn } from "@workspace/ui/lib/utils";
import { MessageRender } from "@/lib/components/message-render";

export const Route = createFileRoute("/_app/chat/$")({
  component: RouteComponent,
  errorComponent: ErrorComponent,
  pendingComponent: PendingComponent,
  loader: async () => {
    return await trpcClient.message.getAllByRoomId.query({
      roomId: "aJVCm8LGarpfCuwfUfE2m2yusgihXJia--y5fXtYSE5kVw4biavMfThT5Pwa2VkmpV",
    });
  },
});

type Message = Record<"outgoing", string> | Record<"incoming", string>;

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

  const dbMessages = Route.useLoaderData();
  const [messages, setMessages] = useState<Message[]>([]);
  useEffect(() => {
    setMessages((prev) => [...prev, ...(dbMessages as unknown as Message[])]);
  }, [dbMessages]);

  const isRoomJoinRef = useRef(false);
  const scrollDownRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    scrollDownRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

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

  async function handleSendMsg(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const msg = data.get("msg") as string;
    console.log(msg);
    if (msg) {
      setMessages((prev) => [...prev, { outgoing: msg }]);
      socket.emit("user:msg:send", msg);
      event.currentTarget.reset();
      await trpcClient.message.add.mutate({
        roomId: roomId!,
        text: msg,
      });
    }
  }
  const handleIncomingMsg = useCallback((data: string) => {
    console.log("user:msg:incoming: ", data);
    if (data) {
      setMessages((prev) => [...prev, { incoming: data }]);
    }
  }, []);
  useEffect(() => {
    socket.on("user:msg:incoming", handleIncomingMsg);

    return () => {
      socket.off("user:msg:incoming", handleIncomingMsg);
    };
  }, [handleIncomingMsg, socket]);

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
            <p>{friend?.name}</p>
            <span className="text-xs text-muted-foreground">
              {isOnline ? "Online" : "Offline"}
            </span>
          </div>
        </div>
        <DialCall userId={userId} remoteUserId={remoteUserId!} />
      </div>
      <div className="h-[calc(100vh-2*var(--app-header-height))] flex flex-col">
        <div className="flex-1 flex gap-3 flex-col overflow-y-auto p-4" id="messages">
          {messages.map((data: Message) => {
            const msgType = Object.keys(data)[0] as keyof Message;
            return (
              <Fragment key={Math.random().toFixed(5)}>
                <div
                  className={cn(
                    "flex items-center",
                    msgType === "outgoing" && "justify-end",
                  )}
                >
                  <div className="bg-secondary p-1 px-4 rounded-xl flex items-center flex-wrap max-w-[80%]">
                    <MessageRender>{data[msgType]}</MessageRender>
                  </div>
                </div>
              </Fragment>
            );
          })}
          <div ref={scrollDownRef} />
        </div>
        <form
          onSubmit={handleSendMsg}
          className="flex items-center gap-2 py-4 px-2 bottom-0 w-full border-t justify-between"
        >
          <Input
            name="msg"
            className="border-none ring-0 rounded-none focus-visible:ring-0 !bg-transparent w-full"
            placeholder="Message"
            autoFocus
          />
          <Button variant="ghost" size="icon" typeof="submit">
            <Send className="size-5" />
          </Button>
        </form>
      </div>
    </div>
  );
}
