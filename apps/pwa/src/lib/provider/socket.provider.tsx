import { createContext, useMemo, useContext, useRef } from "react";
import { io, Socket } from "socket.io-client";

const SocketContext = createContext<Socket | null>(null);
const SOCKET_SERVER_URI = import.meta.env.DEV
  ? "http://localhost:3002"
  : "https://socket.sadiksaifi.dev";

export function SocketProvider({ children }: { children: React.ReactNode }) {
  const socketRef = useRef<Socket | null>(null);

  const socket = useMemo(() => {
    if (socketRef.current === null) {
      socketRef.current = io(SOCKET_SERVER_URI, {
        withCredentials: true,
        transports: ["websocket", "polling"],
        reconnection: true,
        reconnectionAttempts: 5,
        reconnectionDelay: 1000,
      });
      return socketRef.current;
    }
  }, []);
  return <SocketContext.Provider value={socket!}>{children}</SocketContext.Provider>;
}

export function useSocket() {
  const socket = useContext(SocketContext);
  if (!socket) {
    throw new Error("useSocket must be used within a SocketProvider");
  }
  return socket;
}
