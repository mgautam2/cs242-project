const constants = require('../constants');
const Projectiles = require('./Projectiles');
const gameStateManager = require('../utils/gameStateManager');
const player = require('./player');

function initGame() {
  const state = createGameState()
  return state;
}

function createGameState() {
  let y =  player
  return {
    playerOne : new player(1),
    playerTwo : new player(2),
    gridsize: constants.GRID_SIZE,
    projectiles: []
  };
}

function gameLoop(state) {
  deleteProjectiles(state);
  moveProjectiles(state);
  return state
  
}

function createProjectiles(state, player) {
  if (player === 'playerOne') {
    const projectile = new Projectiles(state.playerOne);
    state.projectiles.push(projectile);
    gameStateManager.updateState(state);
  }
  else {
    const projectile = new Projectiles(state.playerTwo);
    state.projectiles.push(projectile);
    gameStateManager.updateState(state);
  }
}

function moveProjectiles(state) {
  state.projectiles.forEach((projectile) => {
    projectile.move();
  });
}

function deleteProjectiles(state) {
  const newProjectiles = state.projectiles.filter((projectile) => {
    const y = projectile.pos.y;
    if (y > 0 && y <= constants.CANVAS_HEIGHT/constants.GRID_SIZE)
      return true;
    else 
      return false;
  });
}

function checkWinner() {
  
}

module.exports = {
  initGame,
  createGameState,
  createProjectiles,
  gameLoop,
  moveProjectiles
}
