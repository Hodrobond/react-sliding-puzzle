import {isSolvable, fillBoard} from '../utility/board';

export const handleMove = (moveType) => {
  return(dispatch, getState) => {
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
    var newBoard = fillBoard(size);//[[ 1, 2, 6],[ 4, 5, 3],[ 8, 7, false]];//[[false,2,3],[4,5,6],[8,7,1]];
    var isSolve = isSolvable(newBoard);
    while(!isSolve){
      console.log("making a new board");
      newBoard = fillBoard(size);
      isSolve = isSolvable(newBoard);
    }
//    var testBoard = [[1,2,3,4],[5,6,7,8],[9,10,11,12],[13,14,false,15]]
    dispatch({type: "SET_BOARD", board: newBoard});
  }
}
