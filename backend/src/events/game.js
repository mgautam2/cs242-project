const roomsManager = require('../utils/roomsManager');
const gameStateManager = require('../utils/gameStateManager');
const game = require('../game/gameState');
const { FRAME_RATE } = require('../constants');


function startGameInterval(io, roomId) {
  const intervalId = setInterval(() => {
    let gameState = gameStateManager.getState(roomId);
    
    gameState = game.gameLoop(gameState);
    emitGameState(io, roomId, gameState)
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
