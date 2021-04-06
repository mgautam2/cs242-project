const roomsManager = require('../utils/roomsManager');
const { v4: uuidv4 } = require('uuid');

module.exports = (io) => {
  
  const handleNewGame = function () {
    // socket obj
    const socket = this; 
    const room = uuidv4();
    
    roomsManager.addClient(socket.id, room);
    // state[roomName] = initGame();
    socket.join(room);
    socket.number = 1;
    // change the way you let the player know he is num 1
    socket.emit('gameCode', room, 1);
  };

  const handleJoinGame = function (code) {
    // socket obj
    const socket = this;
    const roomUsers = io.sockets.adapter.rooms.get(code);
  
    let numClients = 0;
    if (roomUsers) {
      numClients = roomUsers.size;
    }
    
    if (numClients === 0) {
      socket.emit('unknownCode');
      return;
    } else if (numClients > 1) {
      socket.emit('tooManyPlayers');
      return;
    }
    
    roomsManager.addClient(socket.id, code);
    socket.join(code);
    socket.number = 2;
    // emit that person is player1 some how
    io.to(code).emit('initGame');
    // startGameInterval(roomName);
  };

  return {
    handleNewGame,
    handleJoinGame
  }
}
