import { Server } from "socket.io";

const PORT = Number(process.env.PORT) || 3002;
const CLIENT_ORIGIN = process.env.CLIENT_ORIGIN || "http://localhost:5173";

const io = new Server(PORT, {
  cors: {
    origin: [CLIENT_ORIGIN, "http://localhost:5173", "https://socket.sadiksaifi.dev"],
    methods: ["GET", "POST"],
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
  },
  transports: ["websocket", "polling"],
  allowEIO3: true,
});

const socketToRoomId = new Map<string, string>();
const roomIdToUser = new Map<string, Set<string>>();
const socketToUserId = new Map<string, string>();

io.on("connection", (socket) => {
  socket.on("room:join", (data: { userId: string; roomId: string }) => {
    const { userId, roomId } = data;

    socketToRoomId.set(socket.id, roomId);
    socketToUserId.set(socket.id, userId);
    socket.join(roomId);
    const existingUsers = roomIdToUser.get(roomId) ?? new Set();
    roomIdToUser.set(roomId, existingUsers.add(userId));

    io.sockets.adapter.rooms.get(roomId)?.forEach((socketId) => {
      const sock = io.sockets.sockets.get(socketId);
      const userId = socketToUserId.get(socketId);
      sock?.emit(
        "room:joined",
        roomIdToUser
          .get(roomId)
          ?.values()
          .filter((id) => id !== userId)
          .toArray()[0],
      );
    });
  });

  socket.on("user:call", (data: { userId: string; offer: string }) => {
    console.log("user:call:offer: ", data);
    const roomId = socketToRoomId.get(socket.id) ?? "";
    socket.join(roomId);
    socket.to(roomId).emit("user:call:incoming", data);
  });
  socket.on("user:call:accept", (data: { userId: string; answer: string }) => {
    console.log("user:call:accept", data);
    const roomId = socketToRoomId.get(socket.id) ?? "";
    socket.join(roomId);
    socket.to(roomId).emit("user:call:accepted", data);
  });

  socket.on("disconnect", (reason) => {
    console.log(`User disconnected: ${socket.id}, reason: ${reason}`);
    const socketId = socket.id;
    const roomId = socketToRoomId.get(socketId) ?? "";
    if (roomId) {
      const users = roomIdToUser.get(roomId);
      const leaveUser = socketToUserId.get(socketId) ?? "";
      users?.delete(leaveUser);
    }
    socketToUserId.delete(socketId);
    socketToRoomId.delete(socketId);
    socket.to(roomId).emit("room:joined", null);
  });
});
