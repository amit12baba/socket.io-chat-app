import { createServer } from "http";
import { Server } from "socket.io";
import express from "express";
import cors from "cors";

const app = express();
app.use(cors());

const server = createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log(`User Connected: ${socket.id}`);

  const onJoinRoom = (data) => {
    socket.join(data);
    console.log(`User with ID: ${socket.id} joined room: ${data}`);
  };

  const onMessageSent = (data) => {
    console.log({data})
    socket.to(data.room).emit("receive_message", data);
  };
  socket.on("join_room", onJoinRoom);

  socket.on("send_message", onMessageSent);

  socket.on("disconnect", () => {
    console.log("User Disconnected", socket.id);
  });
});

io.listen(3001, () => {
  console.log("server running");
});
