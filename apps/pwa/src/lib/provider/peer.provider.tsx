import { createContext, useContext, useRef } from "react";

export interface TPeerProvider {
  peer: RTCPeerConnection;
  createOffer: () => Promise<RTCSessionDescriptionInit>;
  createAnswer: (offer: RTCSessionDescriptionInit) => Promise<RTCSessionDescriptionInit>;
  setRemoteAnswer: (answer: RTCSessionDescriptionInit) => Promise<void>;
  sendStream: (stream: MediaStream) => void;
}

const PeerContext = createContext<TPeerProvider | null>(null);

export const PeerProvider = ({ children }: { children: React.ReactNode }) => {
  const isPeerActive = useRef<RTCPeerConnection | null>(null);

  function getPeer() {
    return new RTCPeerConnection({
      iceServers: [
        {
          urls: ["stun:stun.l.google.com:19302", "stun:global.stun.twilio.com"],
        },
      ],
    });
  }
  const peer = (() => {
    if (isPeerActive.current === null) {
      isPeerActive.current = getPeer();
    }
    return isPeerActive.current;
  })();

  async function createOffer() {
    const offer = await peer.createOffer();
    await peer.setLocalDescription(offer);
    return offer;
  }

  async function createAnswer(offer: RTCSessionDescriptionInit) {
    await peer.setRemoteDescription(offer);
    const answer = await peer.createAnswer();
    await peer.setLocalDescription(answer);
    return answer;
  }

  async function setRemoteAnswer(answer: RTCSessionDescriptionInit) {
    await peer.setRemoteDescription(answer);
  }

  function sendStream(stream: MediaStream) {
    const tracks = stream.getTracks();
    for (const track of tracks) {
      peer.addTrack(track, stream);
    }
  }

  return (
    <PeerContext.Provider
      value={{ peer, createOffer, createAnswer, setRemoteAnswer, sendStream }}
    >
      {children}
    </PeerContext.Provider>
  );
};

export const usePeer = () => {
  const context = useContext(PeerContext);
  if (context === null) {
    throw new Error("usePeer must be used within a PeerProvider");
  }
  return context;
};
