const roomsManager = require('../src/utils/roomsManager');

test("No Clients", () => {
  const roomInfo = roomsManager.getAllRooms();
  const keys = Object.keys(roomInfo);
  expect(keys.length).toBe(0);
})

test("Add Clients to Room", () => {
  roomsManager.addClient(12344, 555);
  const roomInfo = roomsManager.getAllRooms();
  expect(roomInfo[12344]).toBe(555);
})

test("Remove Clients from Room", () => {
  roomsManager.addClient(12344, 555);
  roomsManager.removeUser(12344, 555);

  const roomInfo = roomsManager.getAllRooms();
  expect(roomInfo[12344]).toBeUndefined();
})

test("Add and Remove Clients from Room", () => {
  roomsManager.addClient(123442, 555);
  roomsManager.addClient(234435, 555);
  roomsManager.removeUser(75446, 111);
  roomsManager.addClient(24344, 111);
  const roomInfo = roomsManager.getAllRooms();
  const keys = Object.keys(roomInfo);
  expect(keys.length).toBe(3);
})
