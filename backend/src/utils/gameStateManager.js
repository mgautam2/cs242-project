const states = {};

const createInitState = (room, state) => {
  states[room] = state;
}

const removeState = (room) => {
  if (!states[room])
    return;
  delete states[room];
}

const updateState = (room, state) => {
  if (!states[room])
    return;
  states[room] = state;
}

const getState = (room) => {
  if (!states[room])
    return;
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
