const clientRooms = {};

const addClient = (id, room) => {
    clientRooms[id] = room;
}

const removeUser = (id) => {
  if (!clientRooms[id])
    return;
  delete clientRooms[id];
}

const displayAll = () => {
  return clientRooms;
}


module.exports = {
    addClient,
    removeUser,
    displayAll,
}