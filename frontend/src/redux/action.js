
export function setPlayer(player) {
  return ({
    type: 'setPlayerNum',
    payload: {
      playerNum: player
    }
  })
}

