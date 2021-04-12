const { GRID_SIZE } = require('../constants');
const player = require('./player');

function initGame() {
  const state = createGameState()
  return state;
}

function createGameState() {
  let y =  player
  return {
    playerOne : new player(1),
    gridsize: GRID_SIZE,
  };
}

function gameLoop(state) {
  return state
}


function checkWinner() {
  
}

module.exports = {
  initGame,
  createGameState,
  gameLoop
}
