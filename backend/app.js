const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*"
  }
});

io.on("connection", (socket) => {
    console.log("User connected:", socket.id);
    
    socket.on("chat", chat => {
        console.log("Received chat:", chat);
        io.emit("chat", chat);
    });

    socket.on("disconnect", () => {
        console.log("User disconnected:", socket.id);
    });
});

// Optional: Add a basic route to test if server is running
app.get("/", (req, res) => {
    res.send("Chat server is running!");
});

server.listen(3001, () => {
    console.log("🚀 Server listening on port 3001");
    console.log("📡 Visit http://localhost:3001 to test");
});