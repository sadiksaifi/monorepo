import { authClient } from "@/lib/auth-client";
import { useSocket } from "@/lib/socket-provider";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Button } from "@workspace/ui/components/button";
import { Input } from "@workspace/ui/components/input";
import { Label } from "@workspace/ui/components/label";
import { useEffect } from "react";

export const Route = createFileRoute("/_app/rtc/")({
  component: RouteComponent,
});

function RouteComponent() {
  const socket = useSocket();
  const userSession = authClient.useSession();
  const email = userSession.data?.user.email;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const roomId = formData.get("roomId");
    const data = {
      roomId,
      email,
    };
    console.log("room:join:data ", data);
    socket.emit("room:join", data);
  };
  const navigate = useNavigate();

  function handleRoomJoin(data: { roomId: string; email: string }) {
    const { roomId } = data;
    console.log("room:join:data:incoming ", data);
    navigate({
      to: "/rtc/$",
      params: {
        _splat: roomId,
      },
    });
  }

  useEffect(() => {
    socket.on("room:join", handleRoomJoin);

    return () => {
      socket.off("room:join", handleRoomJoin);
    };
  }, [socket]);

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl font-bold">Lobby</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 max-w-md">
        <Label htmlFor="roomId">Room ID</Label>
        <Input type="text" id="roomId" name="roomId" placeholder="Room ID" />
        <Button type="submit">Join</Button>
      </form>
    </div>
  );
}
