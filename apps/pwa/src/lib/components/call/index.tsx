import { useSocket } from "@/lib/provider/socket.provider";
import { useTRPC } from "@/lib/trpc-client";
import { useQuery } from "@tanstack/react-query";
import { Fragment, useCallback, useEffect, useRef, useState } from "react";
import { pc } from "@/lib/utils/peer";

import { ComingSoon } from "@/lib/components/coming-soon";
import { PendingComponent } from "@/lib/components/router-components";
import { CallHandleDialog } from "@/lib/components/call/call-handle-dialog";
import { Button } from "@workspace/ui/components/button";
import { Airplay, Phone, Video, X } from "lucide-react";
import { getVideoStream } from "./getVideoStream";

type DialCallProps = {
  userId: string;
  remoteUserId: string;
};

export function DialCall({ remoteUserId }: DialCallProps) {
  const socket = useSocket();
  const trpc = useTRPC();
  // const pc = useMemo(() => new Peer(), []);
  const { data: friend, isPending: isPendingFriend } = useQuery(
    trpc.friend.getById.queryOptions({ friendId: remoteUserId ?? "" }),
  );
  const [isRemoteOffer, setRemoteOffer] = useState<{
    from: string;
    offer: RTCSessionDescriptionInit;
  }>();
  const [isIncomingCall, setIncomingCall] = useState(false);
  const [isOutgoingCall, setOutgoingCall] = useState(false);
  const [isCallActive, setIsCallActive] = useState(false);
  const remoteVideoRef = useRef<HTMLVideoElement | null>(null);
  const localVideoRef = useRef<HTMLVideoElement | null>(null);

  // Handle ice candidates
  useEffect(() => {
    pc.onIceCandidate((event) => {
      if (event.candidate) {
        socket.emit("ice:candidate", {
          candidate: event.candidate,
        });
      }
    });

    socket.on("ice:candidate", (data: { from: string; candidate: RTCIceCandidate }) => {
      if (data.candidate) {
        pc.peer.addIceCandidate(new RTCIceCandidate(data.candidate));
      }
    });

    return () => {
      socket.off("ice:candidate");
    };
  }, [socket]);

  const sendStream = async () => {
    const stream = await getVideoStream();
    if (localVideoRef.current) {
      localVideoRef.current.srcObject = stream;
    }

    // Add tracks to peer connection
    stream.getTracks().forEach((track) => {
      pc.addTrack(track, stream);
    });
  };

  // Handle Outgoing call
  const handleOutgoingCall = async () => {
    console.log("Outgoing Call");
    const offer = await pc.getOffer();
    socket.emit("user:call", { offer });
    setOutgoingCall(true);
  };

  // Handle Incoming call
  const handleIncomingCall = useCallback(
    async (data: { from: string; offer: RTCSessionDescriptionInit }) => {
      console.log("Incoming call", data);
      setIncomingCall(true);
      setRemoteOffer(data);
    },
    [],
  );

  // Handle Accept call
  const handleAcceptCall = async () => {
    const answer = await pc.getAnswer(isRemoteOffer!.offer);
    socket.emit("user:call:accept", { answer: answer });
    console.log("Call Accepted");
    console.log("Call Connected Successfully");
    setIncomingCall(false);
    setIsCallActive(true);
  };

  // Handle Accepted call
  const handleAcceptedCall = useCallback(
    async (data: { from: string; answer: RTCSessionDescriptionInit }) => {
      await pc.setRemoteDescription(data.answer);
      console.log("Call Connected Successfully", data);
      setOutgoingCall(false);
      setIsCallActive(true);
    },
    [],
  );

  // Handle Negotiation Initiated
  const handleNego = useCallback(async () => {
    console.log("Negotiation Initiated");
    const offer = await pc.getOffer();
    socket.emit("user:nego", { offer });
    console.log("Negotiation Sent");
  }, [socket]);
  useEffect(() => {
    pc.peer.addEventListener("negotiationneeded", handleNego);
    return () => {
      pc.peer.removeEventListener("negotiationneeded", handleNego);
    };
  }, [handleNego]);

  // Handle Negotiation Incoming
  const handleIncomingNegotiation = useCallback(
    async (data: { from: string; offer: RTCSessionDescriptionInit }) => {
      console.log("Handling incoming negotitation");
      const answer = await pc.getAnswer(data.offer);
      socket.emit("user:nego:accept", { answer });
      console.log("Handling incoming negotitation done");
    },
    [socket],
  );

  // Handle Negotiation Accepted
  const handleNegoAccepted = useCallback(
    async (data: { from: string; answer: RTCSessionDescriptionInit }) => {
      console.log("Handling nego accepted started", data);
      await pc.setRemoteDescription(data.answer);
      console.log("Handling nego accepted done");
    },
    [],
  );

  useEffect(() => {
    socket.on("user:call:incoming", handleIncomingCall);
    socket.on("user:call:accepted", handleAcceptedCall);
    socket.on("user:nego:incoming", handleIncomingNegotiation);
    socket.on("user:nego:accepted", handleNegoAccepted);

    return () => {
      socket.off("user:call:incoming", handleIncomingCall);
      socket.off("user:call:accepted", handleAcceptedCall);
      socket.off("user:nego:incoming", handleIncomingNegotiation);
      socket.off("user:nego:accepted", handleNegoAccepted);
    };
  }, [
    handleIncomingCall,
    handleAcceptedCall,
    socket,
    handleIncomingNegotiation,
    handleNegoAccepted,
  ]);

  useEffect(() => {
    pc.onTrack((event) => {
      console.log("Received remote stream");
      const remoteStream = event.streams[0];
      if (remoteVideoRef.current) {
        remoteVideoRef.current.srcObject = remoteStream;
      }
    });
  }, []);

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
      {isCallActive && (
        <div className="p-4 backdrop-blur-md flex justify-center items-center gap-4 fixed w-full h-[100vh] top-1/2 left-1/2 -translate-1/2 bg-background/40 z-50">
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-4 right-4"
            onClick={() => {
              setIsCallActive(false);
            }}
          >
            <X className="size-6" />
          </Button>
          <div className="space-y-2 relative flex-1">
            <p className="absolute bottom-0 -mb-1 w-full text-center rounded-b-sm bg-secondary left-1/2 -translate-x-1/2">
              Local Video
            </p>
            <video
              className="border w-full -scale-x-100 rounded-md"
              ref={localVideoRef}
              muted
              autoPlay
              playsInline
            />
            <Button
              onClick={() => {
                sendStream();
              }}
              className="absolute bottom-0"
            >
              Send my Video
            </Button>
          </div>

          <div className="space-y-2 relative flex-1">
            <p className="absolute bottom-0 -mb-1 w-full text-center rounded-b-sm bg-secondary left-1/2 -translate-x-1/2">
              Remote Video
            </p>
            <video
              className="border w-full -scale-x-100 rounded-md"
              ref={remoteVideoRef}
              playsInline
              autoPlay
            />
          </div>
        </div>
      )}
    </Fragment>
  );
}
