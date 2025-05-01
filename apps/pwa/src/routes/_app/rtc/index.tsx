import { authClient } from "@/lib/auth-client";
import { useSocket } from "@/lib/socket-provider";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useCallback, useEffect } from "react";
import { z } from "zod";

export const Route = createFileRoute("/_app/rtc/")({
  component: RouteComponent,
  validateSearch: (search) => z.object({ roomId: z.string() }).parse(search),
});

function RouteComponent() {
  const socket = useSocket();
  const userSession = authClient.useSession();
  const email = userSession.data?.user.email;
  const { roomId } = Route.useSearch();
  const navigate = useNavigate();

  const handleRoomJoin = useCallback(() => {
    if (!email) return;

    const data = {
      roomId,
      email,
    };
    socket.emit("room:join", data);
    navigate({
      to: "/rtc/$",
      params: {
        _splat: roomId,
      },
    });
  }, [email, navigate, roomId, socket]);

  useEffect(() => {
    handleRoomJoin();
  }, [handleRoomJoin]);

  return null;
}
