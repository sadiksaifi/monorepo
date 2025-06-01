import { getVideoStream } from "@/lib/components/call/getVideoStream";
import { usePeer } from "@/lib/provider/peer.provider";
import { useSocket } from "@/lib/provider/socket.provider";
import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useCallback, useState, useRef, useId } from "react";
import { z } from "zod";

export const Route = createFileRoute("/_app/chat/rtc/$")({
  component: RouteComponent,
  validateSearch: (remoteUserId) =>
    z.object({ remoteUserId: z.string() }).safeParse(remoteUserId).data,
});

function RouteComponent() {
  const { peer, sendStream, createAnswer, setRemoteAnswer } = usePeer();
  const socket = useSocket();
  const roomId = Route.useParams()._splat;
  const remoteUserId = Route.useSearch()?.remoteUserId;
  const userId = roomId?.split("--")?.find((id) => id !== remoteUserId);
  const remoteVideoRef = useRef<HTMLVideoElement | null>(null);
  const localVideoRef = useRef<HTMLVideoElement | null>(null);

  // Handle Negotiation Initiated
  const handleNego = useCallback(() => {
    console.log("Negotiation Initiated");
    const offer = peer.localDescription;
    socket.emit("user:nego", { userId, offer });
    console.log("Negotiation Sent");
  }, [peer.localDescription, socket, userId]);
  useEffect(() => {
    peer.addEventListener("negotiationneeded", handleNego);
    return () => {
      peer.removeEventListener("negotiationneeded", handleNego);
    };
  }, [handleNego, peer]);

  // Handle Negotiation Incoming
  const handleIncomingNegotiation = useCallback(
    async (data: { userId: string; offer: RTCSessionDescriptionInit }) => {
      console.log("Handling incoming negotitation");
      await peer.setRemoteDescription(data.offer);
      const answer = peer.remoteDescription;
      socket.emit("user:nego:accept", { userId: data.userId, answer });
      const stream = await getVideoStream();
      localVideoRef.current!.srcObject = stream;
      sendStream(stream);
      console.log("Handling incoming negotitation done");
    },
    [peer, sendStream, socket],
  );

  // Handle Negotiation Accepted
  const handleNegoAccepted = useCallback(
    async (data: { userId: string; answer: RTCSessionDescriptionInit }) => {
      console.log("Handling nego accepted started");
      await setRemoteAnswer(data.answer);
      const stream = await getVideoStream();
      localVideoRef.current!.srcObject = stream;
      sendStream(stream);
      console.log("Handling nego accepted done");
    },
    [sendStream, setRemoteAnswer],
  );

  useEffect(() => {
    socket.on("user:nego:incoming", handleIncomingNegotiation);
    socket.on("user:nego:accepted", handleNegoAccepted);
  }, [handleIncomingNegotiation, handleNegoAccepted, socket]);

  // Handle Incoming Track
  const handleIncomingTrack = useCallback((event: RTCTrackEvent) => {
    try {
      console.log("Stream Incoming");
      const stream = event.streams[0];
      console.log(stream);
      remoteVideoRef.current!.srcObject = stream;
    } catch (e) {
      console.error("Error: Handle IncomingTrack Error");
      console.log(e);
    }
  }, []);
  useEffect(() => {
    peer.addEventListener("track", handleIncomingTrack);
    return () => {
      peer.removeEventListener("track", handleIncomingTrack);
    };
  }, [handleIncomingTrack, peer]);

  return (
    <div className="p-4 flex flex-col gap-4">
      <div className="space-y-2 relative">
        <p className="absolute top-2 right-2">Local Video</p>
        <video
          className="border w-full -scale-x-100"
          ref={localVideoRef}
          muted
          autoPlay
          playsInline
        />
      </div>

      <div className="space-y-2 relative">
        <p className="absolute top-2 right-2">Remote Video</p>
        <video
          className="border w-full -scale-x-100"
          ref={remoteVideoRef}
          muted
          autoPlay
          playsInline
        />
      </div>
    </div>
  );
}
