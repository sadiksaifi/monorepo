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

const emailToSocketId = new Map<string, string>();
const socketIdToEmail = new Map<string, string>();

io.on("connection", (socket) => {
  console.log(`User connected: ${socket.id}`);

  socket.on("room:join", (data) => {
    console.log("room:join:data ", data);
    emailToSocketId.set(data.email, socket.id);
    socketIdToEmail.set(socket.id, data.email);
    console.log("socket.id ", socket.id);
    io.to(data.roomId).emit("user:joined", { email: data.email, id: socket.id });
    socket.join(data.roomId);
    io.to(socket.id).emit("room:join", data);
  });

  socket.on("user:call", (data) => {
    const { to, offer } = data;
    console.log("user:call:data ", data);
    io.to(to).emit("incoming:call", { from: socket.id, offer });
  });

  socket.on("call:accepted", (data) => {
    const { to, answer } = data;
    console.log("call:accepted:data ", data);
    io.to(to).emit("call:accepted", { from: socket.id, answer });
  });

  socket.on("peer:nego:needed", (data) => {
    const { to, offer } = data;
    console.log("peer:nego:needed:data ", data);
    io.to(to).emit("peer:nego:needed", { from: socket.id, offer });
  });

  socket.on("peer:nego:done", (data) => {
    const { to, answer } = data;
    console.log("peer:nego:done:data ", data);
    io.to(to).emit("peer:nego:final", { from: socket.id, answer });
  });

  socket.on("ice-candidate", (data) => {
    const { to, candidate } = data;
    console.log("ice-candidate:data ", data);
    io.to(to).emit("ice-candidate", { from: socket.id, candidate });
  });

  socket.on("call:ended", (data) => {
    const { to } = data;
    console.log("call:ended:data ", data);
    io.to(to).emit("call:ended", { from: socket.id });
  });

  socket.on("disconnect", () => {
    console.log(`User disconnected: ${socket.id}`);
  });
});
