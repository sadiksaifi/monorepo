class Peer {
  peer!: RTCPeerConnection;
  constructor() {
    if (!this.peer) {
      this.peer = new RTCPeerConnection({
        iceServers: [
          {
            urls: ["stun:stun.l.google.com:19302", "stun:global.stun.twilio.com"],
          },
        ],
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
    console.log("setRemoteDescription:description ", description);
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
