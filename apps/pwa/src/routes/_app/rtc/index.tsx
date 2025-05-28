import { BackButton } from "@/lib/components/back-button";
import Peer from "@/lib/peer";
import { useSocket } from "@/lib/socket-provider";
import { createFileRoute } from "@tanstack/react-router";
import { Button } from "@workspace/ui/components/button";
import { PhoneOff, Video } from "lucide-react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { z } from "zod";

export const Route = createFileRoute("/_app/rtc/")({
  component: RouteComponent,
  validateSearch: (search) => z.object({ roomId: z.string() }).parse(search),
});

function RouteComponent() {
  const [remoteSocketId, setRemoteSocketId] = useState<string | null>(null);
  const [isCallActive, setIsCallActive] = useState(false);
  const localVideoRef = useRef<HTMLVideoElement | null>(null);
  const remoteVideoRef = useRef<HTMLVideoElement | null>(null);
  const { roomId } = Route.useSearch();
  const socket = useSocket();
  const peer = useMemo(() => new Peer(), []);

  const cleanupMediaStreams = useCallback(() => {
    // Stop all local tracks
    const localStream = localVideoRef.current?.srcObject as MediaStream;
    if (localStream) {
      localStream.getTracks().forEach((track) => track.stop());
      localVideoRef.current!.srcObject = null;
    }

    // Clear remote video
    if (remoteVideoRef.current) {
      remoteVideoRef.current.srcObject = null;
    }
  }, []);

  const remoteSocketIdRef = useRef("");
  const handleUserJoin = useCallback(
    (data: { email: string; id: string }) => {
      console.log(`Email: ${data.email}, ID: ${data.id}`);
      setRemoteSocketId(data.id);
      console.log("remoteSocketId after set:", remoteSocketId); // Will likely log null
      remoteSocketIdRef.current = data.id; // Update the ref
      console.log("remoteSocketId ref:", remoteSocketId); // Will likely log null
    },
    [remoteSocketId],
  );

  const handleCall = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });
      if (localVideoRef.current) {
        localVideoRef.current.srcObject = stream;
      }

      // Add tracks to peer connection
      stream.getTracks().forEach((track) => {
        peer.addTrack(track, stream);
      });

      const offer = await peer.getOffer();
      socket.emit("user:call", { to: remoteSocketId, offer });
      setIsCallActive(true);
    } catch (error) {
      console.error("Error accessing media devices:", error);
    }
  }, [peer, remoteSocketId, socket]);

  const handleIncomingCall = useCallback(
    async (data: { from: string; offer: RTCSessionDescriptionInit }) => {
      console.log(`Incoming call from ${data.from}`, data.offer);
      setRemoteSocketId(data.from);

      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true,
        });
        if (localVideoRef.current) {
          localVideoRef.current.srcObject = stream;
        }

        // Add tracks to peer connection
        stream.getTracks().forEach((track) => {
          peer.addTrack(track, stream);
        });

        const answer = await peer.getAnswer(data.offer);
        socket.emit("call:accepted", { to: data.from, answer });
        setIsCallActive(true);
      } catch (error) {
        console.error("Error accessing media devices:", error);
      }
    },
    [peer, socket],
  );

  const handleCallAccepted = useCallback(
    async (data: { from: string; answer: RTCSessionDescriptionInit }) => {
      await peer.setRemoteDescription(data.answer);
      console.log(`Call accepted from ${data.from}`, data.answer);
      setIsCallActive(true);
    },
    [peer],
  );

  const handleEndCall = useCallback(() => {
    // Notify the other peer
    if (remoteSocketId) {
      socket.emit("call:ended", { to: remoteSocketId });
    }

    // Clean up local resources
    cleanupMediaStreams();
    setIsCallActive(false);
    setRemoteSocketId(null);

    // Reset peer connection
    peer.peer.close();
  }, [remoteSocketId, socket, cleanupMediaStreams, peer]);

  const handleCallEnded = useCallback(() => {
    cleanupMediaStreams();
    setIsCallActive(false);
    setRemoteSocketId(null);
    peer.peer.close();
  }, [cleanupMediaStreams, peer]);

  const handlePeerNegoIncoming = useCallback(
    async (data: { from: string; offer: RTCSessionDescriptionInit }) => {
      console.log(`Peer negotiation needed from ${data.from}`, data.offer);
      const answer = await peer.getAnswer(data.offer);
      socket.emit("peer:nego:done", { to: data.from, answer });
    },
    [peer, socket],
  );

  const handlePeerNegoFinal = useCallback(
    async (data: { from: string; answer: RTCSessionDescriptionInit }) => {
      console.log(`Peer negotiation final from ${data.from}`, data.answer);
      await peer.setRemoteDescription(data.answer);
    },
    [peer],
  );

  // Handle ICE candidates
  useEffect(() => {
    peer.onIceCandidate((event) => {
      if (event.candidate && remoteSocketId) {
        socket.emit("ice-candidate", {
          to: remoteSocketId,
          candidate: event.candidate,
        });
      }
    });

    socket.on("ice-candidate", (data: { from: string; candidate: RTCIceCandidate }) => {
      if (data.candidate) {
        peer.peer.addIceCandidate(new RTCIceCandidate(data.candidate));
      }
    });

    return () => {
      socket.off("ice-candidate");
    };
  }, [peer, remoteSocketId, socket]);

  // Handle remote tracks
  useEffect(() => {
    peer.onTrack((event) => {
      const remoteStream = event.streams[0];
      console.log("Received remote stream");
      if (remoteVideoRef.current) {
        remoteVideoRef.current.srcObject = remoteStream;
      }
    });
  }, [peer]);

  useEffect(() => {
    socket.on("user:joined", handleUserJoin);
    socket.on("incoming:call", handleIncomingCall);
    socket.on("call:accepted", handleCallAccepted);
    socket.on("peer:nego:needed", handlePeerNegoIncoming);
    socket.on("peer:nego:final", handlePeerNegoFinal);
    socket.on("call:ended", handleCallEnded);

    return () => {
      socket.off("user:joined", handleUserJoin);
      socket.off("incoming:call", handleIncomingCall);
      socket.off("call:accepted", handleCallAccepted);
      socket.off("peer:nego:needed", handlePeerNegoIncoming);
      socket.off("peer:nego:final", handlePeerNegoFinal);
      socket.off("call:ended", handleCallEnded);
    };
  }, [
    socket,
    handleUserJoin,
    remoteSocketId,
    handleIncomingCall,
    handleCallAccepted,
    handlePeerNegoIncoming,
    handlePeerNegoFinal,
    handleCallEnded,
  ]);

  const handleNegotiationNeeded = useCallback(async () => {
    const offer = await peer.getOffer();
    socket.emit("peer:nego:needed", { to: remoteSocketId, offer });
  }, [peer, remoteSocketId, socket]);

  useEffect(() => {
    peer.peer.addEventListener("negotiationneeded", handleNegotiationNeeded);
    return () => {
      peer.peer.removeEventListener("negotiationneeded", handleNegotiationNeeded);
    };
  }, [peer.peer, remoteSocketId, socket, handleNegotiationNeeded]);

  return (
    <>
      <BackButton />
      <div>
        <h1>Room: {roomId}</h1>
        <h2>remoteSocketId: {remoteSocketId}</h2>
        <h2>{remoteSocketId ? "Connected" : "Not connected"}</h2>
        <div className="flex gap-2 my-4 flex-col">
          <div className="flex gap-2">
            <Button
              onClick={handleCall}
              disabled={!remoteSocketId || isCallActive}
              className="max-w-fit"
            >
              <Video />
              Call
            </Button>
            <Button
              onClick={handleEndCall}
              disabled={!isCallActive}
              variant="destructive"
              className="max-w-fit"
            >
              <PhoneOff />
              End Call
            </Button>
          </div>
          <div className="flex gap-2">
            <div className="flex flex-col gap-2">
              <h4>Local Stream</h4>
              <video className="scale-x-[-1]" ref={localVideoRef} autoPlay playsInline />
            </div>
            <div className="flex flex-col gap-2">
              <h4>Remote Stream</h4>
              <video className="scale-x-[-1]" ref={remoteVideoRef} autoPlay playsInline />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
