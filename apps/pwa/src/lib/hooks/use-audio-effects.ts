import { useAudio } from "./use-audio";

interface VideoCallAudioSounds {
  incomingCall: ReturnType<typeof useAudio>;
  acceptCall: ReturnType<typeof useAudio>;
  hungUpCall: ReturnType<typeof useAudio>;
  denyCall: ReturnType<typeof useAudio>;
  newMessage: ReturnType<typeof useAudio>;
  disconnect: ReturnType<typeof useAudio>;
}

interface UseVideoCallAudioOptions {
  basePath?: string;
  volumes?: {
    incomingCall?: number;
    acceptCall?: number;
    hungUpCall?: number;
    denyCall?: number;
    newMessage?: number;
    disconnect?: number;
  };
}

export const useVideoCallAudio = (
  options: UseVideoCallAudioOptions = {},
): VideoCallAudioSounds => {
  const { basePath = "/assets/sounds", volumes = {} } = options;

  const incomingCall = useAudio(`${basePath}/incoming-call.mp3`, {
    loop: true,
    volume: volumes.incomingCall ?? 0.8,
  });

  const acceptCall = useAudio(`${basePath}/accept-call.mp3`, {
    volume: volumes.acceptCall ?? 0.6,
  });

  const hungUpCall = useAudio(`${basePath}/hung-up.mp3`, {
    volume: volumes.hungUpCall ?? 0.7,
  });

  const denyCall = useAudio(`${basePath}/deny-call.mp3`, {
    volume: volumes.denyCall ?? 0.6,
  });

  const newMessage = useAudio(`${basePath}/message.mp3`, {
    volume: volumes.newMessage ?? 0.5,
  });

  const disconnect = useAudio(`${basePath}/disconnect.mp3`, {
    volume: volumes.disconnect ?? 0.7,
  });

  return {
    incomingCall,
    acceptCall,
    hungUpCall,
    denyCall,
    newMessage,
    disconnect,
  };
};
