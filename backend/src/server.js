const express = require('express')
const socketio = require('socket.io')
const http = require('http')
const cors = require('cors');
const gameSetupEvents = require("./events/gameSetup.js");

const PORT = process.env.PORT || 4000;
const app = express();
const server = http.createServer(app);
const io = socketio(server);
const { handleNewGame,
   handleJoinGame,
   handleMoveKeyDown,
   handleFireKeyDown,
   handleDisconnect 
 } = gameSetupEvents(io);

app.use(cors());

const onConnection = (socket) => {
  socket.on("createGame", handleNewGame);
  socket.on("joinGame", handleJoinGame);
  socket.on("moveKeyDown", handleMoveKeyDown);
  socket.on("fireKeyDown", handleFireKeyDown);
  
  console.log("Socket Connected")
  socket.on("disconnect", handleDisconnect);
}

io.on("connection", onConnection);

server.listen(PORT);
