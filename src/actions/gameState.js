import {newGame} from './board';

export const toggleDifficulty = (newDifficulty) => {
  return(dispatch, getState) => {
    dispatch({type: "CHANGE_DIFFICULTY", newDifficulty: newDifficulty});
    newGame()(dispatch, getState);
  }
}
