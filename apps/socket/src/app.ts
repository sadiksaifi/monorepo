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
    const existingUsers = roomIdToUser.get(roomId) ?? new Set();
    roomIdToUser.set(roomId, existingUsers.add(userId));
    socket.join(roomId);

    io.sockets.adapter.rooms.get(roomId)?.forEach((socketId) => {
      const sock = io.sockets.sockets.get(socketId);
      const userId = socketToUserId.get(socketId);
      const roomJoinedUser = roomIdToUser
        .get(roomId)
        ?.values()
        .filter((id) => id !== userId)
        .toArray()[0];
      console.log("RoomJoinedUser: ", roomJoinedUser);
      sock?.emit("room:joined", { userId: roomJoinedUser });
    });
  });

  socket.on("user:call", (data: { offer: string }) => {
    console.log("user:call:offer: ", data);
    const { offer } = data;
    const roomId = socketToRoomId.get(socket.id) ?? "";
    socket.to(roomId).emit("user:call:incoming", { from: socket.id, offer });
  });
  socket.on("user:call:accept", (data: { answer: string }) => {
    console.log("user:call:accept", data);
    const { answer } = data;
    const roomId = socketToRoomId.get(socket.id) ?? "";
    socket.to(roomId).emit("user:call:accepted", { from: socket.id, answer });
  });

  socket.on("user:nego", (data: { offer: string }) => {
    console.log("user:nego: ", data);
    const { offer } = data;
    const roomId = socketToRoomId.get(socket.id) ?? "";
    socket.to(roomId).emit("user:nego:incoming", { from: socket.id, offer });
  });
  socket.on("user:nego:accept", (data: { answer: string }) => {
    console.log("user:nego:accept", data);
    const { answer } = data;
    const roomId = socketToRoomId.get(socket.id) ?? "";
    socket.to(roomId).emit("user:nego:accepted", { from: socket.id, answer });
  });

  socket.on("user:call:media", () => {
    console.log("user:call:media");
    const roomId = socketToRoomId.get(socket.id) ?? "";
    socket.to(roomId).emit("user:call:media");
  });

  socket.on("ice:candidate", (data) => {
    const { to, candidate } = data;
    console.log("ice:candidate", data);
    socket.to(to).emit("ice:candidate", { from: socket.id, candidate });
  });

  // Messaging
  socket.on("user:msg:send", (data) => {
    console.log("user:msg:send: ", data);
    const roomId = socketToRoomId.get(socket.id);
    if (roomId) {
      socket.to(roomId).emit("user:msg:incoming", data);
    }
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
