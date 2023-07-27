const express = require("express");
const app = express();
const http = require("http");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();

const { Server } = require("socket.io");

app.use(cors());

const server = http.createServer(app);
const { SERVER_HOST, SERVER_PORT } = process.env;
const io = new Server(server, {
    cors: {
        origin: `http://${SERVER_HOST}:${SERVER_PORT}`,
        // origin: "http://localhost:3000",
        // origin: `*`,
        methods: ["GET", "POST"],
        credentionals: true,
    },
});

io.on("connection", (socket) => {
    console.log(`User Connected: ${socket.id}`);

    socket.on("join_room", (data) => {
        socket.join(data);
        console.log(`User with ID: ${socket.id} joined room: ${data}`);
    });

    socket.on("send_message", (data) => {
        socket.to(data.room).emit("receive_message", data);
    });

    socket.on("disconnect", () => {
        console.log("User Disconnected", socket.id);
    });
});

server.listen(3001, () => {
    console.log("Sever Running");
});
