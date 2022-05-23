const http = require("http");
const express = require("express");

const app = express()
const server = http.createServer(app)

const io = require('socket.io')(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],
        allowedHeaders: ["my-custom-header"],
        credentials: true,
    },
});

const PORT = 8082

const {addUser, removeUser} = require('./user')

io.on("connection", (socket) => {
    socket.on("join", ({ name, room }, callBack) => {
        console.log(room)
        const { user, error } = addUser({ id: socket.id, name, room });
        if (error) return callBack(error);
    
        socket.join('sociappchat');
    
        socket.broadcast
          .to('sociappchat')
          .emit("message", { user: "Admin", text: `${user.name} has joined!`, timestamp: new Date() });
        callBack(null);
    
        socket.on("sendMessage", ({ message }) => {
          io.to('sociappchat').emit("message", {
            user: user.name,
            text: message,
            timestamp: new Date()
          });
        });
      });
      socket.on("disconnect", () => {
        const user = removeUser(socket.id);
        console.log(user);
        io.to('sociappchat').emit("message", {
          user: "Admin",
          text: `${user.name} just left the room`,
          timestamp: new Date()
        });
        console.log("A disconnection has been made");
      });
})

server.listen(PORT, () => console.log(`Chat server running on Port ${PORT}...`));
