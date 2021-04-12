const roomsManager = require('../utils/roomsManager');
const gameStateManager = require('../utils/gameStateManager');
const game = require('../game/gameState');
const { FRAME_RATE } = require('../constants');


function startGameInterval(io, roomId) {
  
  console.log("started Interval Bra");
  
  const intervalId = setInterval(() => {
    // const winner = gameLoop(state[roomId]);
    let gameState = gameStateManager.getState(roomId);
    gameState = game.gameLoop(gameState);
     // console.log(gameState)
    // if (!winner) {
    emitGameState(io, roomId, gameState)
    // console.log(gameState)
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


function gameEndCleanUp (io, roomId, IntervalId) {
  // game.disconnect() CLEAN UP
}




module.exports = {
  startGameInterval
}