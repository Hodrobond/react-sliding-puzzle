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
    default:
      return state
  }
}

export default gameStateReducer;
