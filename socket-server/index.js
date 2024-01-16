const http = require("http");
const { Server } = require("socket.io");
const express = require("express");
const cors = require("cors");

const app = express();
const httpServer = http.createServer(app);

const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:3000", // Replace with your frontend URL
    methods: ["GET", "POST"],
    allowedHeaders: ["my-custom-header"],
    credentials: true,
  },
});

// Socket.io logic (unchanged)
io.on("connection", (socket) => {
  console.log("A user connected:", socket.id);
  socket.on("abc", (roomId) => {
    socket.join(roomId);
    console.log(roomId);
    io.emit("refetch", roomId);
  });

  socket.on("disconnect", () => {
    console.log("A user disconnected:", socket.id);
  });
});

// Express route
app.get("/", (req, res) => {
  res.send("Hello, World! This is your HTTP route.");
});

const PORT = 3001;
httpServer.listen(PORT, () => {
  console.log(`Socket.io server is running on port ${PORT}`);
});
