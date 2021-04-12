const roomsManager = require('../utils/roomsManager');
const gameStateManager = require('../utils/gameStateManager');
const { startGameInterval } = require('./game');
const game = require('../game/gameState');
const { v4: uuidv4 } = require('uuid');

module.exports = (io) => {
  
  const handleNewGame = function () {
    const socket = this; 
    const roomId = uuidv4();
    
    roomsManager.addClient(socket.id, roomId);
    socket.join(roomId);
    socket.number = 'playerOne';
    socket.emit('gameCode', roomId);
    
    const initState =  game.initGame();
    gameStateManager.createInitState(roomId, initState);
  };

  const handleJoinGame = function (roomId) {
    // socket obj
    const socket = this;
    const roomUsers = io.sockets.adapter.rooms.get(roomId);
  
    let numClients = 0;
    if (roomUsers) {
      numClients = roomUsers.size;
    }
    
    if (numClients === 0 || numClients > 1) {
      socket.emit('errorJoin');
      return;
    } 
    
    roomsManager.addClient(socket.id, roomId);
    socket.join(roomId);
    socket.number = 'playerTwo';
    
    io.to(roomId).emit('initGame');
    // start game session
    startGameInterval(io, roomId);
  };
  
  const handleDisconnect = function() {
    const socket = this;
    roomsManager.removeUser(socket.id);
    console.log("Socket DisConnected");
  }
  
  const handleMoveKeyDown = function(dir) {
    const socket = this; 
    const roomId = roomsManager.getClientRoom(socket.id);
  
    if (!roomId) {
      return;
    }
    console.log(socket.number)
    movePlayer(dir, socket.number, roomId);
  } 

  function movePlayer(dir, playerNum, roomId) {
    const state = gameStateManager.getState(roomId);
    state[playerNum].move(dir);
    gameStateManager.updateState(roomId, state);
  }
  
  const handleFireKeyDown = function () {
    const socket = this; 
    const roomId = roomsManager.getClientRoom(socket.id);
  
    if (!roomId) {
      return;
    }
    fire(socket.number, roomId);
  } 
  
  function fire(playerNum, roomId) {
    const state = gameStateManager.getState(roomId);
    game.createProjectiles(state, playerNum, roomId);
  }

  return {
    handleNewGame,
    handleJoinGame,
    handleMoveKeyDown,
    handleFireKeyDown,
    handleDisconnect
  }
}
