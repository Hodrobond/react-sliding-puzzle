import {isSolvable, fillBoard} from '../utility/board';

export const handleMove = (moveType) => {
  return(dispatch, getState) => {
    var board = getState().Board;
    dispatch(moveType);
  }
}

export const handleMoveUp = () => {
  return(dispatch, getState) => {
    handleMove({type:'MOVE_UP'})(dispatch, getState);
  }//return(dispatch, getState)
}

export const handleMoveRight = () => {
  return(dispatch, getState) => {
    handleMove({type:'MOVE_RIGHT'})(dispatch, getState);
  }
}

export const handleMoveDown = () => {
  return(dispatch, getState) => {
    handleMove({type:'MOVE_DOWN'})(dispatch, getState);
  }
}

export const handleMoveLeft = () => {
  return(dispatch,getState) => {
    handleMove({type:'MOVE_LEFT'})(dispatch, getState);
  }
}

export const newGame = () => {
  return(dispatch, getState) => {
    var size = getState().GameState.mode.height;
    var newBoard = fillBoard(size);
    var isSolve = isSolvable(newBoard);
    while(!isSolve){
      var newBoard = fillBoard(size);
      var isSolve = isSolvable(newBoard);
    }
    dispatch({type: "SET_BOARD", board: newBoard});
  }
}
