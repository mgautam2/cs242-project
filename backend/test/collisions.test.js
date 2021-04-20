const game = require('../src/game/gameState');
const collision = require('../src/game/collision');
const projectile = require('../src/game/projectiles');
const constants = require('../src/constants');

let gameState;

beforeAll(() => {
  gameState = game.initGame();
});

test("Check Winner", () => {
  gameState.playerTwo.hit();
  gameState.time = 0;
  game.winner(gameState);
  expect(gameState.winner).toBe('playerOne');
})

test("Check Collisions", () => {
  const p1 = new projectile(gameState.playerOne);
  const p2 = new projectile(gameState.playerOne);
  
  p1.changePos(gameState.playerTwo.getPos());
  gameState.projectiles = [p1, p2];
  game.checkCollisons(gameState);
  expect(gameState.collisions.length).toBe(1);
})

test("Change Explosion Radius", () => {
  let origRadius = gameState.collisions[0].getRadius();
  game.animateCollisions(gameState);
  let newRadius = gameState.collisions[0].getRadius();
  expect(newRadius).toBe(origRadius - constants.RADIUS_REDUC);
})
