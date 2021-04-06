const clientRooms = {};

const addClient = (id, room) => {
    clientRooms[id] = room;
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
    removeUser,
    getAllRooms,
}
