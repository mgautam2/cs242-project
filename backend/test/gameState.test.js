const game = require('../src/game/gameState');
const constants = require('../src/constants');

let gameState;

beforeAll(() => {
  gameState = game.initGame();
});

test("Init Game", () => {
  const projectiles = gameState.projectiles.length;
  expect(projectiles).toBe(0);
})

test("Fire PlayerTwo", () => {
  game.createProjectiles(gameState, 'playerTwo')
  const projectiles = gameState.projectiles;
  expect(projectiles.length).toBe(1);
  expect(projectiles[0].player).toBe(2);
})

test("Move Projectile", () => {
  const prevHeight = gameState.projectiles[0].getHeight();
  
  game.moveProjectiles(gameState);
  const projectile = gameState.projectiles[0];
  const bulletSpeed = gameState.playerTwo.getBulletVelo();
  expect(projectile.pos.y).toBe(prevHeight + bulletSpeed);
})

test("Get Projectiles Distance", () => {
  const playerOnePos = gameState.playerOne.getPos();
  const dist = gameState.projectiles[0].getSqDistance(playerOnePos);
  expect(dist).toBe(1225);
})

test("Delete Projectiles", () => {
  game.createProjectiles(gameState, 'playerOne')
  expect(gameState.projectiles.length).toBe(2);
  
  gameState.projectiles[1].changePos({x: 10, y:100});
  game.deleteProjectiles(gameState);
  expect(gameState.projectiles.length).toBe(1);
})

test("Change Timer", () => {
  const origTime = gameState.time;
  game.changeClock(gameState);
  expect(gameState.time).toBe(origTime - 1/constants.FRAME_RATE);
})

test("Player hit", () => {
  const { playerOne } = gameState;
  playerOne.hit();
  expect(playerOne.getHealth()).toBe(90);
  expect(playerOne.isDead()).toBe(false);
})

test("Player Dead", () => {
  const { playerOne } = gameState;
  for (let t = 1; t < 10; t++) 
    playerOne.hit();
  expect(playerOne.isDead()).toBe(true);
})


