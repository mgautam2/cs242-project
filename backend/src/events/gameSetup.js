const roomsManager = require('../utils/roomsManager');
const gameStateManager = require('../utils/gameStateManager');
const { startGameInterval } = require('./game');
const game = require('../game/gameState');
const { v4: uuidv4 } = require('uuid');

module.exports = (io) => {
  
  const handleNewGame = function () {
    // socket obj
    const socket = this; 
    const roomId = uuidv4();
    console.log(roomsManager.getAllRooms());
    
    roomsManager.addClient(socket.id, roomId);
    // state[roomName] = initGame();
    socket.join(roomId);
    socket.number = 'playerOne';
    // change the way you let the player know he is num 1
    socket.emit('gameCode', roomId, 1);
    
    const initState =  game.initGame();
    gameStateManager.createInitState(roomId, initState);
    // Change this later
    // ------
    // startGameInterval(io, roomId);
    // ------
  };

  const handleJoinGame = function (roomId) {
    // socket obj
    const socket = this;
    const roomUsers = io.sockets.adapter.rooms.get(roomId);
  
    let numClients = 0;
    if (roomUsers) {
      numClients = roomUsers.size;
    }
    
    if (numClients === 0) {
      socket.emit('unknownroomId');
      return;
    } else if (numClients > 1) {
      socket.emit('tooManyPlayers');
      return;
    }
    
    roomsManager.addClient(socket.id, roomId);
    socket.join(roomId);
    socket.number = 'playerTwo';
    // emit that person is player1 some how
    io.to(roomId).emit('initGame');
  };
  
  const handleDisconnect = function() {
    const socket = this;
    console.log("Socket DisConnected")
    roomsManager.removeUser(socket.id);
  }
  
  const handleMoveKeyDown = function(dir) {
    const socket = this; 
    const roomId = roomsManager.getClientRoom(socket.id);
  
    if (!roomId) {
      return;
    }
    movePlayer(dir, socket.number, roomId);
  } 

  function movePlayer(dir, playerNum, roomId) {
    const state = gameStateManager.getState(roomId);
    state[playerNum].move(dir);
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
    console.log(state)
  }


  return {
    handleNewGame,
    handleJoinGame,
    handleMoveKeyDown,
    handleFireKeyDown,
    handleDisconnect
  }
}
