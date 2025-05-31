import { authClient } from "@/lib/auth-client";
import { useSocket } from "@/lib/provider/socket.provider";
import { useTRPC } from "@/lib/trpc-client";
import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
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

export const Route = createFileRoute("/_app/chat/$")({
  component: RouteComponent,
  pendingComponent: PendingComponent,
  errorComponent: ErrorComponent,
  loader: async () => {
    const session = await authClient.getSession();
    if (session.error) {
      console.log(session.error);
    }
    return session.data;
  },
});

function RouteComponent() {
  const socket = useSocket();
  const trpc = useTRPC();
  const { _splat: roomId } = Route.useParams();
  const userSession = Route.useLoaderData();
  const userId = userSession?.user.id;
  const friendId = roomId?.split("--")?.find((id) => id !== userId);
  const { data: friend, isPending: isPendingFriend } = useQuery(
    trpc.friend.getById.queryOptions({ friendId: friendId ?? "" }),
  );
  const nameInitials = getNameInitials(friend?.name ?? "");
  const [isFriendOnline, setIsFriendOnline] = useState(false);
  const { createOffer, setRemoteAnswer, createAnswer, sendStream, peer } = usePeer();
  const [isRemoteUserId, setRemoteUserId] = useState<string | null>(null);

  const handleRoomJoined = useCallback((remoteUserId: string) => {
    console.log("remoteUserId: ", remoteUserId);
    setRemoteUserId(remoteUserId);
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
  }

  const [remoteVideoStream, setRemoteVideoStream] = useState<MediaStream | null>(null);
  const getVideoStream = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: false,
    });
    return stream;
  };

  const handleIncomingCallAccepted = useCallback(
    async (data: { userId: string; answer: RTCSessionDescriptionInit }) => {
      console.log("handleIncomingCallAccepted: ", data);
      await setRemoteAnswer(data.answer);
      setoutGoingCall(false);
      console.log("Call Connected");
    },
    [setRemoteAnswer],
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

  const handleIncomingStream = useCallback((event: RTCTrackEvent) => {
    const stream = event.streams[0];
    console.log(stream);
    setRemoteVideoStream(stream);
    console.log(stream);
  }, []);

  useEffect(() => {
    peer.addEventListener("track", handleIncomingStream);
    return () => {
      peer.removeEventListener("track", handleIncomingStream);
    };
  }, [handleIncomingStream, peer]);

  const handleNego = useCallback(() => {
    const localOffer = peer.localDescription;
    console.log("Nego Needed");
    socket.emit("user:call", { userId: isRemoteUserId, offer: localOffer });
  }, [isRemoteUserId, peer.localDescription, socket]);

  useEffect(() => {
    peer.addEventListener("negotiationneeded", handleNego);
    return () => {
      peer.removeEventListener("negotiationneeded", handleNego);
    };
  }, [handleIncomingStream, handleNego, peer]);

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
          <Button variant="ghost" size="icon" onClick={comingSoon}>
            <Video className="size-6" />
          </Button>
          <Button variant="ghost" size="icon" onClick={comingSoon}>
            <Airplay className="size-5" />
          </Button>
        </div>
        <CallHandleDialog
          action1={() => comingSoon()}
          action2={comingSoon}
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
          action2={comingSoon}
          action1label="Accept"
          action2label="Decline"
          avatar={friend?.image ?? ""}
          isvisible={isIncomingCall}
          name={friend?.name ?? ""}
        />
      </div>
      <div className="h-[calc(100vh-2*var(--app-header-height))] overflow-y-auto relative">
        {isRemoteUserId && <div>You are connected: {isRemoteUserId}</div>}
        <div className="relative">
          <Button
            onClick={async () => {
              console.log("sending stream");
              sendStream(await getVideoStream());
              console.log("sent stream");
            }}
          >
            Send my video
          </Button>
          <p className="font-bold text-2xl">Remote Video</p>
          <video
            ref={(node) => {
              if (node) {
                node.srcObject = remoteVideoStream;
              }
            }}
            muted
            autoPlay
            playsInline
          />
        </div>
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

function PendingComponent() {
  return (
    <div className="relative flex-1 h-full">
      <div className="absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[60%] flex flex-col gap-4 justify-center items-center">
        <Loader className="animate-spin size-10" />
        <p>Wait loading the chats...</p>
      </div>
    </div>
  );
}

function ErrorComponent({ error }: ErrorComponentProps) {
  return (
    <div className="relative flex-1 h-full">
      <div className="absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[60%] flex flex-col gap-4 justify-center items-center">
        <MessageSquareWarning className="size-10 text-destructive" />
        <p>{error.message ?? "Sorry an unknown error occured."}</p>
      </div>
    </div>
  );
}

function comingSoon() {
  toast.error("Coming soon!", {
    description: "Please be patient, we are working on it.",
  });
}

interface CallHandleDialogProps extends React.HTMLAttributes<HTMLDivElement> {
  avatar: string;
  name: string;
  action1: () => void;
  action2: () => void;
  action1label: string;
  action2label: string;
  action1labelstyles?: string;
  action2labelstyles?: string;
  isvisible: boolean;
}

function CallHandleDialog({
  className,
  action1,
  action2,
  action1label,
  action2label,
  action1labelstyles,
  action2labelstyles,
  isvisible = false,
  ...props
}: CallHandleDialogProps) {
  const nameInitials = getNameInitials(props.name);

  return (
    <div
      className={cn("absolute w-96 top-24 right-2 overflow-x-hidden z-50", className)}
      {...props}
    >
      <div
        className={cn(
          "flex items-center bg-transparent rounded-lg backdrop-filter backdrop-blur-md",
          "border ease-in-out overflow-x-hidden",
          isvisible ? "translate-x-0 duration-400" : " translate-x-[100%] duration-200",
        )}
      >
        <div className="flex flex-1 items-center gap-4 pl-3.5">
          <Avatar className="size-10">
            <AvatarImage src={props.avatar ?? ""} alt={props.name} />
            <AvatarFallback>{nameInitials}</AvatarFallback>
          </Avatar>
          <div>
            <p>{props?.name}</p>
            <p className="text-muted-foreground text-xs">Incoming Call</p>
          </div>
        </div>
        <div className="*:w-24 *:flex-1 *:cursor-pointer flex *:py-1.5 *:!mx-0 flex-col divide-y items-center justify-center border-l *:hover:bg-secondary/30">
          <button
            className={cn("text-green-300", action1labelstyles)}
            onClick={action1 ?? ""}
          >
            {action1label}
          </button>
          <button className={cn("text-red-400", action2labelstyles)} onClick={action2}>
            {action2label}
          </button>
        </div>
      </div>
    </div>
  );
}
