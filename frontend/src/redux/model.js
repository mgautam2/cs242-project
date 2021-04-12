const intiState = {
  playerNum: ""
}

export default function preferenceData (state = intiState, action) {
  switch (action.type) {
    case 'setPlayerNum':
      return { ...state, playerNum: action.payload.playerNum }
    default:
      return state
    }
}
