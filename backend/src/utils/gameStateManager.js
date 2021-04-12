const states = {};

const createInitState = (room, state) => {
  states[room] = state;
}

const removeState = (room) => {
  if (!states[room])
    return null;
  delete states[room];
}

const updateState = (room, state) => {
  if (!states[room])
    return null;
  states[room] = state;
}

const getState = (room) => {
  if (!states[room])
    return null;
  return states[room];
}

const getAllStates = () => {
  return states;
}

module.exports = {
    createInitState,
    removeState,
    updateState,
    getState,
    getAllStates
}
