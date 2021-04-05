module.exports = (io) => {
  const newGame = function (payload) {
    const socket = this; // hence the 'function' above, as an arrow function will not work
    // ...
    return "yo"
  };

  const joinGame = function (payload) {
    // ...
  };

  return {
    newGame,
    joinGame
  }
}

