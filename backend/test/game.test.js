const game = require('../src/game/gameState');

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