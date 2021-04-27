const roomsManager = require('../utils/roomsManager');
const gameStateManager = require('../utils/gameStateManager');
const game = require('../game/gameState');
const { FRAME_RATE } = require('../constants');


function startGameInterval(io, roomId) {
  const intervalId = setInterval(() => {
    let gameState = gameStateManager.getState(roomId);
    
    gameState = game.gameLoop(gameState);
    emitGameState(io, roomId, gameState)
    // if (gameState.winner !== '') {
    //   gameEndCleanUp (io, roomId, intervalId);
    // }
  }, 1000 / FRAME_RATE);
}

function emitGameState(io, roomId, gameState) {
  // Send this event to everyone in the room.
  io.sockets.to(roomId)
    .emit('gameState', JSON.stringify(gameState));
}

function gameEndCleanUp (io, roomId, intervalId) {
  console.log(intervalId)
  gameStateManager.removeState(roomId);
  clearInterval(intervalId);
  console.log("Game ended!")
}

module.exports = {
  startGameInterval
}
