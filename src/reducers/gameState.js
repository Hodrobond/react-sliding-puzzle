import constants from "../constants/constants";

const init = () => {
  return {
    mode: constants.GAME_MODES.EASY
  }
}

const gameStateReducer = (state = 0, action) => {
  if(state === 0){
    return init();
  }
  switch(action.type){
    case "CHANGE_DIFFICULTY":
      switch(action.newDifficulty){
        case "easy":
          return {
            ...state,
            mode: constants.GAME_MODES.EASY
          }
        case "medium":
          return {
            ...state,
            mode: constants.GAME_MODES.MEDIUM
          }
          break;
        case "hard":
          return {
            ...state,
            mode: constants.GAME_MODES.HARD
          }
          break;
      }
    default:
      return state
  }
}

export default gameStateReducer;
