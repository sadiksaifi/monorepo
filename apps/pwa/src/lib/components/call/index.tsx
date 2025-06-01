import { useSocket } from "@/lib/provider/socket.provider";
import { useTRPC } from "@/lib/trpc-client";
import { useQuery } from "@tanstack/react-query";
import { Fragment, useCallback, useEffect, useState } from "react";
import { usePeer } from "@/lib/provider/peer.provider";

import { ComingSoon } from "@/lib/components/coming-soon";
import { PendingComponent } from "@/lib/components/router-components";
import { CallHandleDialog } from "@/lib/components/call/call-handle-dialog";
import { Button } from "@workspace/ui/components/button";
import { Airplay, Phone, Video } from "lucide-react";
import { useRouter } from "@tanstack/react-router";
import { getVideoStream } from "./getVideoStream";

type DialCallProps = {
  roomId: string;
  userId: string;
  remoteUserId: string;
};

export function DialCall({ roomId, userId, remoteUserId }: DialCallProps) {
  const socket = useSocket();
  const trpc = useTRPC();
  const router = useRouter();
  const { data: friend, isPending: isPendingFriend } = useQuery(
    trpc.friend.getById.queryOptions({ friendId: remoteUserId ?? "" }),
  );
  const { setRemoteAnswer, createAnswer, createOffer, sendStream } = usePeer();
  const [isRemoteOffer, setRemoteOffer] = useState<RTCSessionDescriptionInit>();
  const [isIncomingCall, setIncomingCall] = useState(false);
  const [isOutgoingCall, setOutgoingCall] = useState(false);

  // Handle Outgoing call
  const handleOutgoingCall = async () => {
    console.log("Outgoing Call");
    setOutgoingCall(true);
    const offer = await createOffer();
    socket.emit("user:call", { userId, offer });
  };

  // Handle Incoming call
  const handleIncomingCall = useCallback(
    async ({ userId, offer }: { userId: string; offer: RTCSessionDescriptionInit }) => {
      console.log("Call incoming: ", userId);
      setIncomingCall(true);
      setRemoteOffer(offer);
    },
    [],
  );

  // Handle Accept call
  const handleAcceptCall = async () => {
    const answer = await createAnswer(isRemoteOffer!);
    socket.emit("user:call:accept", { userId, answer: answer });
    console.log("Call Accepted");
    setIncomingCall(false);
    router.navigate({
      to: "/chat/rtc/$",
      params: {
        _splat: roomId,
      },
      search: {
        remoteUserId,
      },
    });
  };

  // Handle Accepted call
  const handleAcceptedCall = useCallback(
    async ({ userId, answer }: { userId: string; answer: RTCSessionDescriptionInit }) => {
      await setRemoteAnswer(answer);
      console.log("Call Connected Successfully", userId);
      setOutgoingCall(false);
      sendStream(await getVideoStream());
      router.navigate({
        to: "/chat/rtc/$",
        params: {
          _splat: roomId,
        },
        search: {
          remoteUserId,
        },
      });
    },
    [remoteUserId, roomId, router, sendStream, setRemoteAnswer],
  );

  useEffect(() => {
    socket.on("user:call:incoming", handleIncomingCall);
    socket.on("user:call:accepted", handleAcceptedCall);

    return () => {
      socket.off("user:call:incoming");
      socket.off("user:call:accepted");
    };
  }, [handleIncomingCall, handleAcceptedCall, socket]);

  if (isPendingFriend) return <PendingComponent />;
  return (
    <Fragment>
      <div className="flex items-center gap-1">
        <Button variant="ghost" size="icon" onClick={handleOutgoingCall} type="button">
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
        isvisible={isOutgoingCall}
        name={friend?.name ?? ""}
      />
      <CallHandleDialog
        action1={handleAcceptCall}
        action2={ComingSoon}
        action1label="Accept"
        action2label="Decline"
        avatar={friend?.image ?? ""}
        isvisible={isIncomingCall}
        name={friend?.name ?? ""}
      />
    </Fragment>
  );
}
