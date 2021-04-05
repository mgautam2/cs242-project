const rooms = require('../utils/rooms');
const { v4: uuidv4 } = require('uuid');

module.exports = (io) => {
  
  const handleNewGame = function (payload) {
    const socket = this; // socket obj
    const room = uuidv4();
    
    rooms.addClient(socket.id, room);
    socket.emit('gameCode', room);

    // state[roomName] = initGame();
    client.join(room);
    client.number = 1;
    client.emit('init', 1);
  };

  const handleJoinGame = function (code) {
    const room = io.sockets.adapter.rooms[code];

    let allUsers;
    if (room) {
      allUsers = room.sockets;
    }

    let numClients = 0;
    if (allUsers) {
      numClients = Object.keys(allUsers).length;
    }

    if (numClients === 0) {
      client.emit('unknownCode');
      return;
    } else if (numClients > 1) {
      client.emit('tooManyPlayers');
      return;
    }

    rooms.addClient(socket.id, room);

    client.join(room);
    client.number = 2;
    client.emit('init', 2);
    
    // startGameInterval(roomName);
  };

  return {
    handleNewGame,
    handleJoinGame
  }
}

