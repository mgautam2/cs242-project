const constants = require('../constants');
const Projectiles = require('./Projectiles');
const gameStateManager = require('../utils/gameStateManager');
const player = require('./player');
const Collision = require('./collision');


const collisionDist = Math.pow((constants.TANK_WIDTH + constants.BULLET_WIDTH) /  constants.GRID_SIZE, 2);

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
    projectiles: [],
    winner: '',
    collisions: [],
    time: 60
  };
}

function gameLoop(state) {
  deleteProjectiles(state);
  moveProjectiles(state);
  checkCollisons(state);
  animateCollisions(state);
  changeClock(state);
  winner(state);
  return state
}

function winner(state) {
  if (state.playerOne.isDead()) {
    state.winner = 'playerTwo';
  }
  else if (state.playerTwo.isDead()) {
    state.winner = 'playerOne';
  }
  else if (state.time <= 0) {
    state.winner = (state.playerTwo.getHealth() > state.playerOne.getHealth()) ?
                    'playerTwo' : 'playerOne';
  }
  gameStateManager.updateState(state);
}

function changeClock(state) {
  state.time -= 1 /  constants.FRAME_RATE;
  gameStateManager.updateState(state);
}

function animateCollisions(state) {
  state.collisions.forEach((collision) => {
    collision.reduceRadius();
  });
  // filter finished collisions
  const collisions = state.collisions.filter((collision) => {
    if (collision.isOver())
      return false;
    return true;
  });
  state.collisions = collisions;
  gameStateManager.updateState(state);
}


function checkCollisons(state) {
  // check for collsions
  const playerOnePos = state.playerOne.getPos();
  const playerTwoPos = state.playerTwo.getPos();
  
  const projectiles = state.projectiles.filter((projectile) => {

    if (projectile.getPlayer() === 1) { // of player one
      const isCollision = (projectile.getSqDistance(playerTwoPos)  < collisionDist)
      if (isCollision) {
        state.collisions.push(new Collision(projectile.getPos()));
        state.playerTwo.hit();
        return false;
      }
    }
    else if (projectile.getPlayer() === 2) { // of player Two
      const isCollision = ((projectile.getSqDistance(playerOnePos ) < collisionDist))
      if (isCollision) {
        state.collisions.push(new Collision(projectile.getPos()));
        state.playerOne.hit();
        return false;
      }
    }
    return true;
  });
  state.projectiles = projectiles;
  gameStateManager.updateState(state);
}



function createProjectiles(state, player) {
  if (player === 'playerOne') {
    const projectile = new Projectiles(state.playerOne);
    state.projectiles.push(projectile);
    gameStateManager.updateState(state);
  } else {
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
  if (state.projectiles.length === 0)
    return;
    
  const newProjectiles = state.projectiles.filter((projectile) => {
    const y = projectile.pos.y;
    if (y > 0 && y <= constants.CANVAS_HEIGHT/constants.GRID_SIZE)
      return true;
    else 
      return false;
  });
  state.projectiles = newProjectiles;
}


module.exports = {
  initGame,
  createGameState,
  createProjectiles,
  gameLoop,
  moveProjectiles,
  changeClock,
  winner,
  checkCollisons,
  animateCollisions,
  deleteProjectiles
}
