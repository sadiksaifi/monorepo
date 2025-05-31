import { useSocket } from "@/lib/provider/socket.provider";
import { useTRPC } from "@/lib/trpc-client";
import { useQuery } from "@tanstack/react-query";
import { createFileRoute, useRouter } from "@tanstack/react-router";
import { Avatar, AvatarFallback, AvatarImage } from "@workspace/ui/components/avatar";
import { Button } from "@workspace/ui/components/button";
import { Input } from "@workspace/ui/components/input";
import { Airplay, Loader, Phone, Send, Video, MessageSquareWarning } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import type { ErrorComponentProps } from "@tanstack/react-router";
import { getNameInitials } from "@/lib/utils/getNameInitials";
import { usePeer } from "@/lib/provider/peer.provider";
import { cn } from "@workspace/ui/lib/utils";
import {
  CallHandleDialog,
  ComingSoon,
  ErrorComponent,
  PendingComponent,
} from "./-component";
import { useUser } from "./-user-ctx";
import { getVideoStream } from "./-getVideoStream";

export const Route = createFileRoute("/_app/chat/$")({
  component: RouteComponent,
  // pendingComponent: PendingComponent,
  errorComponent: ErrorComponent,
  // loader: async () => {
  //   const session = await authClient.getSession();
  //   if (session.error) {
  //     console.log(session.error);
  //   }
  //   return session.data;
  // },
});

function RouteComponent() {
  const router = useRouter();
  const socket = useSocket();
  const trpc = useTRPC();
  const { _splat: roomId } = Route.useParams();
  // const userSession = Route.useLoaderData();
  // const userId = userSession?.user.id;
  const userSession = useUser();
  const userId = userSession?.user.id;
  const friendId = roomId?.split("--")?.find((id) => id !== userId);
  const { data: friend, isPending: isPendingFriend } = useQuery(
    trpc.friend.getById.queryOptions({ friendId: friendId ?? "" }),
  );
  const nameInitials = getNameInitials(friend?.name ?? "");
  const [isFriendOnline, setIsFriendOnline] = useState(false);
  const { createOffer, setRemoteAnswer, createAnswer, sendStream } = usePeer();
  const [isRemoteUserId, setRemoteUserId] = useState<string | null>(null);

  const handleRoomJoined = useCallback((remoteUserId: string) => {
    if (remoteUserId) {
      setIsFriendOnline(true);
    } else {
      setIsFriendOnline(false);
    }
  }, []);

  const [isIncomingCall, setIncomingCall] = useState(false);
  const [isOutGoingCall, setoutGoingCall] = useState(false);
  const [incomingCallOffer, setIncomingCallOffer] =
    useState<RTCSessionDescriptionInit | null>(null);

  const roomJoinRef = useRef(false);
  useEffect(() => {
    if (!roomJoinRef.current) {
      socket.emit("room:join", { userId, roomId });
      roomJoinRef.current = true;
    }

    return () => {
      socket.off("room:join");
    };
  }, [roomId, socket, userId]);

  async function handleOutGoingCall() {
    setoutGoingCall(true);
    const offer = await createOffer();
    console.log(offer);
    socket.emit("user:call", { userId, offer });
  }

  const handleIncomingCall = useCallback(
    async (data: { userId: string; offer: RTCSessionDescriptionInit }) => {
      console.log("user:call:incoming -> ", data);
      setRemoteUserId(data.userId);
      setIncomingCall(true);
      setIncomingCallOffer(data.offer);
    },
    [],
  );

  async function handleIncomingCallAccept() {
    setIncomingCall(false);
    if (!incomingCallOffer) {
      toast.error("Something went wrong", { description: "No incoming call offer" });
      return;
    }

    const answer = await createAnswer(incomingCallOffer);
    socket.emit("user:call:accept", { userId, answer });
      console.log("starting stream")
    sendStream(await getVideoStream());
      console.log("sending stream")
    router.navigate({
      to: "/chat/$/rtc",
      params: { _splat: roomId },
      search: { remoteUserId: isRemoteUserId! },
    });
  }

  const handleIncomingCallAccepted = useCallback(
    async (data: { userId: string; answer: RTCSessionDescriptionInit }) => {
      console.log("handleIncomingCallAccepted: ", data);
      await setRemoteAnswer(data.answer);
      setoutGoingCall(false);
      console.log("Call Connected");
      sendStream(await getVideoStream());
      console.log("sending stream")
      router.navigate({
        to: "/chat/$/rtc",
        params: { _splat: roomId },
        search: { remoteUserId: isRemoteUserId! },
      });
    },
    [isRemoteUserId, roomId, router, sendStream, setRemoteAnswer],
  );

  useEffect(() => {
    socket.on("room:joined", handleRoomJoined);
    socket.on("user:call:incoming", handleIncomingCall);
    socket.on("user:call:accepted", handleIncomingCallAccepted);

    return () => {
      socket.off("room:joined");
      socket.off("user:call:incoming");
      socket.off("user:call:accepted");
    };
  }, [handleIncomingCall, handleIncomingCallAccepted, handleRoomJoined, socket]);

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
              {isFriendOnline ? "Online" : "Offline"}
            </span>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="icon" onClick={handleOutGoingCall} type="button">
            <Phone className="size-5" />
          </Button>
          <Button variant="ghost" size="icon" onClick={ComingSoon}>
            <Video className="size-6" />
          </Button>
          <Button variant="ghost" size="icon" onClick={ComingSoon}>
            <Airplay className="size-5" />
          </Button>
        </div>
        <CallHandleDialog
          action1={ComingSoon}
          action2={ComingSoon}
          action1label="Mute"
          action2label="Decline"
          action1labelstyles="text-foreground"
          action2labelstyles="text-red-400"
          avatar={friend?.image ?? ""}
          isvisible={isOutGoingCall}
          name={friend?.name ?? ""}
        />
        <CallHandleDialog
          action1={handleIncomingCallAccept}
          action2={ComingSoon}
          action1label="Accept"
          action2label="Decline"
          avatar={friend?.image ?? ""}
          isvisible={isIncomingCall}
          name={friend?.name ?? ""}
        />
      </div>
      <div className="h-[calc(100vh-2*var(--app-header-height))] overflow-y-auto relative">
        {isRemoteUserId && <div>You are connected: {isRemoteUserId}</div>}
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
