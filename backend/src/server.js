const express = require('express')
const socketio = require('socket.io')
const http = require('http')
const cors = require('cors');
const gameSocketEvents = require("./events/game.js");


const PORT = process.env.PORT || 4000;

const app = express();
const server = http.createServer(app);
const io = socketio(server);

app.use(cors());
const { handleNewGame, handleJoinGame } = gameSocketEvents(io);

const onConnection = (socket) => {
  socket.on("createGame", handleNewGame);
  socket.on("joinGame", handleJoinGame);

  console.log("Socket joined")
}

io.on("connection", onConnection);

server.listen(PORT);
