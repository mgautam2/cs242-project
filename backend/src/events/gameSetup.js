const roomsManager = require('../utils/roomsManager');
const game = require('./gameManager');
const { v4: uuidv4 } = require('uuid');

module.exports = (io) => {
  
  const handleNewGame = function () {
    // socket obj
    const socket = this; 
    const roomId = uuidv4();
    
    roomsManager.addClient(socket.id, roomId);
    // state[roomName] = initGame();
    socket.join(roomId);
    socket.number = 1;
    // change the way you let the player know he is num 1
    socket.emit('gameCode', roomId, 1);
    // Change this later
    // ------
    game.startGameInterval(io, roomId);
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
    socket.number = 2;
    // emit that person is player1 some how
    io.to(roomId).emit('initGame');
  };

  return {
    handleNewGame,
    handleJoinGame
  }
}
