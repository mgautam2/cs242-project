const roomsManager = require('../utils/roomsManager');
// create a gameState Manager like roomsManager
// import state from there
const { FRAME_RATE } = require('../constants');

function startGameInterval(io, roomId) {
  console.log("started Interval Bra");
  const intervalId = setInterval(() => {
    console.log("Sent some message")
    // const winner = gameLoop(state[roomId]);
    
    // if (!winner) {
      emitGameState(io, roomId, "Teri maa ki" /*state[roomId]*/)
    // } else {
      // emitGameOver(roomId, winner);
      // delete state[roomId];
      // clearInterval(intervalId);
    // }
  }, 1000 / FRAME_RATE);
}

function emitGameState(io, roomId, gameState) {
  // Send this event to everyone in the room.
  io.sockets.to(roomId)
    .emit('gameState', JSON.stringify(gameState));
}


function gameLoop() {
  
}

module.exports = {
  startGameInterval, 
  gameLoop
}