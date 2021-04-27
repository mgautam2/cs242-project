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
    game.createProjectiles(state, playerNum);
  }
  
  function handleSendSignal(payload) {
    const socket = this;
    let roomId = roomsManager.getClientRoom(payload.callerID);
    socket.broadcast.to(roomId).emit('getSignal', payload);
    console.log('sent signal')
  }
  
  function handleReturningSignal(payload) {
    const socket = this;
    const { signal, callerID } = payload;
    socket.to(callerID).emit('getReturningSignal', {signal});
    console.log("returning signal sent")
  }
  
  function handleReadyPeer(payload) {
    const socket = this;
    let roomId = roomsManager.getClientRoom(socket.id);
    socket.broadcast.to(roomId).emit('setStreamP2');
  }

  return {
    handleNewGame,
    handleJoinGame,
    handleMoveKeyDown,
    handleFireKeyDown,
    handleDisconnect,
    handleSendSignal,
    handleReturningSignal,
    handleReadyPeer
  }
}


// socket.on("sending signal", payload => {
//       io.to(payload.userToSignal).emit('user joined', { signal: payload.signal, callerID: payload.callerID });
//   });
// 
//   socket.on("returning signal", payload => {
//       io.to(payload.callerID).emit('receiving returned signal', { signal: payload.signal, id: socket.id });
//   })