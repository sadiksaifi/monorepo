import { usePeer } from "@/lib/provider/peer.provider";
import { useSocket } from "@/lib/provider/socket.provider";
import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useCallback, useState } from "react";
import { useUser } from "./-user-ctx";
import { z } from "zod";
import { getVideoStream } from "./-getVideoStream";

export const Route = createFileRoute("/_app/chat/$/rtc")({
  component: RouteComponent,
  validateSearch: (remoteUserId) =>
    z.object({ remoteUserId: z.string() }).safeParse(remoteUserId).data,
});

function RouteComponent() {
  const { peer, sendStream, createAnswer, setRemoteAnswer } = usePeer();
  const socket = useSocket();
  const isRemoteUserId = Route.useSearch()?.remoteUserId;
  const userSession = useUser();
  const userId = userSession?.user.id;

  // Handle get Video Stream
  const [remoteVideoStream, setRemoteVideoStream] = useState<MediaStream | null>(null);
  // Handle Incoming Stream
  const handleIncomingStream = useCallback((event: RTCTrackEvent) => {
    const stream = event.streams[0];
    console.log(stream);
    setRemoteVideoStream(stream);
  }, []);
  useEffect(() => {
    peer.addEventListener("track", handleIncomingStream);
    return () => {
      peer.removeEventListener("track", handleIncomingStream);
    };
  }, [handleIncomingStream, peer]);

  // Handle Nego Needed
  const handleNego = useCallback(async () => {
    const localOffer = peer.localDescription;
    console.log("Nego Needed");
    socket.emit("user:nego", { userId: isRemoteUserId, offer: localOffer });
  }, [isRemoteUserId, peer.localDescription, socket]);

  // Handle Nego Incoming
  const handleNegoIncoming = useCallback(
    async (data: { userId: string; offer: RTCSessionDescriptionInit }) => {
      console.log("handleNegoIncoming: ", data);
      const answer = await createAnswer(data.offer);
      socket.emit("user:nego:accept", { userId, answer });
      console.log("Send stream to: ", isRemoteUserId);
      sendStream(await getVideoStream());
      console.log("Sent stream to: ", isRemoteUserId);
    },
    [createAnswer, isRemoteUserId, sendStream, socket, userId],
  );

  // Handle Nego Accepted
  const handleNegoAccepted = useCallback(
    async (data: { userId: string; answer: RTCSessionDescriptionInit }) => {
      console.log("handleNegoAccepted: ", data);
      await setRemoteAnswer(data.answer);
      console.log("Send stream to: ", isRemoteUserId);
      sendStream(await getVideoStream());
      console.log("Sent stream to: ", isRemoteUserId);
      console.log("Call Connected");
    },
    [isRemoteUserId, sendStream, setRemoteAnswer],
  );
  useEffect(() => {
    peer.addEventListener("negotiationneeded", handleNego);
    socket.on("user:nego:incoming", handleNegoIncoming);
    socket.on("user:nego:accepted", handleNegoAccepted);

    return () => {
      peer.removeEventListener("negotiationneeded", handleNego);
      socket.off("user:nego:incoming");
    };
  }, [
    handleIncomingStream,
    handleNego,
    handleNegoAccepted,
    handleNegoIncoming,
    peer,
    socket,
  ]);

  return (
    <div>
      <div className="relative">
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
    </div>
  );
}
