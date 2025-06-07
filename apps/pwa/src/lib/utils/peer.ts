const iceServers = [
  { urls: "stun:freestun.net:3478" },
  {
    urls: "turn:freestun.net:3478",
    username: "free",
    credential: "free",
  },
];

// const iceServers = [
//   {
//     urls: [
//       // Note: STUN won't work if 'no-stun' is truly disabling all STUN functionality,
//       // but usually, a TURN server still handles STUN requests that lead to allocations.
//       // It's safer to include both turn and turns if you want to test both.
//       `turn:127.0.0.1:3478?transport=udp`, // Explicitly UDP as no-tcp-relay is set
//       `turns:127.0.0.1:5349?transport=udp`, // Explicitly UDP and secure
//     ],
//     username: "testuser",
//     credential: "testpass",
//     // If realm is specified by your application:
//     // options: {
//     //   iceTransportPolicy: 'relay' // Optional: force relay for testing TURN
//     // }
//   },
// ];

class Peer {
  peer!: RTCPeerConnection;
  constructor() {
    if (!this.peer) {
      this.peer = new RTCPeerConnection({
        iceServers,
      });
    }
  }

  async getOffer() {
    if (this.peer) {
      const offer = await this.peer.createOffer();
      await this.peer.setLocalDescription(new RTCSessionDescription(offer));
      return offer;
    }
  }

  async getAnswer(offer: RTCSessionDescriptionInit) {
    if (this.peer) {
      await this.peer.setRemoteDescription(new RTCSessionDescription(offer));
      const answer = await this.peer.createAnswer();
      await this.peer.setLocalDescription(new RTCSessionDescription(answer));
      return answer;
    }
  }

  async setLocalDescription(description: RTCSessionDescriptionInit | null | undefined) {
    if (!description) {
      console.error("Cannot set local description: description is null or undefined");
      return;
    }
    console.log("setLocalDescription:description ", description);
    if (this.peer) {
      await this.peer.setLocalDescription(new RTCSessionDescription(description));
    }
  }

  async setRemoteDescription(description: RTCSessionDescriptionInit | null | undefined) {
    if (!description) {
      console.error("Cannot set remote description: description is null or undefined");
      return;
    }
    if (this.peer) {
      await this.peer.setRemoteDescription(new RTCSessionDescription(description));
    }
  }

  addTrack(track: MediaStreamTrack, stream: MediaStream) {
    if (this.peer) {
      this.peer.addTrack(track, stream);
    }
  }

  onTrack(callback: (event: RTCTrackEvent) => void) {
    if (this.peer) {
      this.peer.ontrack = callback;
    }
  }

  onIceCandidate(callback: (event: RTCPeerConnectionIceEvent) => void) {
    if (this.peer) {
      this.peer.onicecandidate = callback;
    }
  }
}

export default Peer;
export const pc = new Peer();
