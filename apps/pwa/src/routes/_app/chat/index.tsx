import { createFileRoute } from "@tanstack/react-router";
import { Button } from "@workspace/ui/components/button";
import { cn } from "@workspace/ui/lib/utils";
import { Mic, MonitorUp, Plus, ScreenShareOff, Video } from "lucide-react";
import { useRef, useState } from "react";

export const Route = createFileRoute("/_app/chat/")({
  component: RouteComponent,
});

function RouteComponent() {
  const [isScreenCapture, setIsScreenCapture] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  async function startCapture() {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      setIsScreenCapture(true);
    } catch (err) {
      console.error("Error:" + err);
    }
  }
  async function stopCapture() {
    const stream = videoRef.current?.srcObject as MediaStream;
    stream.getTracks().forEach((track) => track.stop());
    setIsScreenCapture(false);
  }

  return (
    <div className="relative h-full w-full">
      <div className="absolute bottom-4 left-[50%] flex translate-x-[-50%] gap-2 rounded-full bg-secondary shadow-md p-2 z-50">
        <Button className="rounded-full" size="icon">
          <Mic />
        </Button>
        <Button className="rounded-full" size="icon">
          <Video />
        </Button>
        <Button
          className={cn(
            "rounded-full",
            isScreenCapture ? "bg-orange-500" : "bg-green-500",
          )}
          onClick={isScreenCapture ? stopCapture : startCapture}
          size="icon"
        >
          {isScreenCapture ? <ScreenShareOff /> : <MonitorUp />}
        </Button>
        <Button className="rounded-full" size="icon" variant="destructive">
          <Plus className="rotate-45" />
        </Button>
      </div>
      <video ref={videoRef} className="scale-x-[-1]" autoPlay playsInline />
    </div>
  );
}
