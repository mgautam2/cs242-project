const gameStateManager = require('../src/utils/gameStateManager');

test("No Clients", () => {
  const gameState = gameStateManager.getAllStates();
  const keys = Object.keys(gameState);
  expect(keys.length).toBe(0);
})

test("Add GameState for Room", () => {
  gameStateManager.createInitState(12344, { game: 'on'});
  const gameState = gameStateManager.getState(12344);
  expect(gameState).toStrictEqual({ game: 'on'});
})

test("Remove GameState", () => {
  gameStateManager.createInitState(12344, { game: 'on'});
  gameStateManager.removeState(12344);
  const gameState = gameStateManager.getState(12344);
  expect(gameState).toBeNull();
})

test("Add and Remove Clients from Room", () => {
  gameStateManager.createInitState(12344, { game: 'on'});
  gameStateManager.createInitState(13334, { game: 'on'});
  gameStateManager.removeState(12344);
  gameStateManager.createInitState(243344, { game: 'on'});
  const states = gameStateManager.getAllStates();
  const keys = Object.keys(states);
  expect(keys.length).toStrictEqual(2);
})
