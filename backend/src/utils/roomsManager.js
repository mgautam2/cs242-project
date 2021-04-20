const clientRooms = {};

const addClient = (id, room) => {
    clientRooms[id] = room;
}

const getClientRoom = (id) => {
  return clientRooms[id];
}

const removeUser = (id) => {
  if (!clientRooms[id])
    return;
  delete clientRooms[id];
}

const getAllRooms = () => {
  return clientRooms;
}

module.exports = {
    addClient,
    getClientRoom,
    removeUser,
    getAllRooms,
}
