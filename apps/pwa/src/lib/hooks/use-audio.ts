import { useRef, useCallback, useEffect, useState } from "react";

interface UseAudioOptions {
  volume?: number;
  loop?: boolean;
  preload?: boolean;
  playbackRate?: number;
}

interface UseAudioReturn {
  play: () => Promise<void>;
  pause: () => void;
  stop: () => void;
  setVolume: (volume: number) => void;
  setPlaybackRate: (rate: number) => void;
  isPlaying: boolean;
  isLoading: boolean;
  duration: number;
  currentTime: number;
  error: string | null;
}

export const useAudio = (src: string, options: UseAudioOptions = {}): UseAudioReturn => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const { volume = 1, loop = false, preload = true, playbackRate = 1 } = options;

  // Initialize audio element
  useEffect(() => {
    if (!audioRef.current) {
      const audio = new Audio(src);
      audio.volume = volume;
      audio.loop = loop;
      audio.preload = preload ? "auto" : "none";
      audio.playbackRate = playbackRate;

      // Event listeners
      audio.addEventListener("loadstart", () => setIsLoading(true));
      audio.addEventListener("canplaythrough", () => setIsLoading(false));
      audio.addEventListener("loadedmetadata", () => {
        setDuration(audio.duration);
        setIsLoading(false);
      });

      audio.addEventListener("play", () => setIsPlaying(true));
      audio.addEventListener("pause", () => setIsPlaying(false));
      audio.addEventListener("ended", () => {
        setIsPlaying(false);
        setCurrentTime(0);
      });

      audio.addEventListener("timeupdate", () => {
        setCurrentTime(audio.currentTime);
      });

      audio.addEventListener("error", (e) => {
        const target = e.target as HTMLAudioElement;
        setError(`Audio error: ${target.error?.message || "Unknown error"}`);
        setIsLoading(false);
      });

      audioRef.current = audio;
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = "";
        audioRef.current = null;
      }
    };
  }, [src, volume, loop, preload, playbackRate]);

  const play = useCallback(async (): Promise<void> => {
    if (!audioRef.current) return;

    if (!window.navigator.userActivation.hasBeenActive) {
      console.warn("Cannot play audio: No permission granted");
      return;
    }

    try {
      setError(null);
      audioRef.current.currentTime = 0;
      await audioRef.current.play();
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Unknown error";
      setError(`Playback error: ${errorMessage}`);

      if (err instanceof DOMException && err.name === "NotAllowedError") {
        console.warn("Autoplay blocked. User interaction required.");
      } else {
        console.error("Error playing audio:", err);
      }
    }
  }, []);

  const pause = useCallback(() => {
    if (audioRef.current && isPlaying) {
      audioRef.current.pause();
    }
  }, [isPlaying]);

  const stop = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      setCurrentTime(0);
    }
  }, []);

  const setVolume = useCallback((newVolume: number) => {
    if (audioRef.current) {
      const clampedVolume = Math.max(0, Math.min(1, newVolume));
      audioRef.current.volume = clampedVolume;
    }
  }, []);

  const setPlaybackRate = useCallback((rate: number) => {
    if (audioRef.current) {
      audioRef.current.playbackRate = Math.max(0.25, Math.min(4, rate));
    }
  }, []);

  return {
    play,
    pause,
    stop,
    setVolume,
    setPlaybackRate,
    isPlaying,
    isLoading,
    duration,
    currentTime,
    error,
  };
};
