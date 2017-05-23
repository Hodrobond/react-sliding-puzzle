import {findBlank} from '../utility/board';

var _ = require('lodash');

const init = () => {
  var arr = new Array(3);
  for(var i=0; i<arr.length; i++){
    arr[i] = new Array(3);
    for(var j=0; j<arr[i].length; j++){
      arr[i][j] = false;
    }
  }
  return arr;
}

const setPiece = (state, action) => {
  var newState = {...state};
  newState[action.y][action.x] = action.value;
  return newState;
}

const setBoard = (state, action) => {
  return action.board;
}

const handleMove = (state, action) => {
  var testBoard = [];

  for (var i = 0; i < state.length; i++)
      testBoard[i] = state[i].slice();
  var blank = findBlank(testBoard);
  var x, y;
  switch(action.type){
    case 'MOVE_UP':
      x = blank.x;
      y = blank.y + 1;
      break;
    case 'MOVE_DOWN':
      x = blank.x;
      y = blank.y - 1;
      break;
    case 'MOVE_LEFT':
      x = blank.x + 1;
      y = blank.y;
      break;
    case 'MOVE_RIGHT':
      x = blank.x - 1;
      y = blank.y;
      break;
    default:
      break;
  }
  if(x >= testBoard.length  || x < 0 || y >= testBoard.length || y<0){
    return state;
  }

  var temp = testBoard[blank.y][blank.x];
  testBoard[blank.y][blank.x] = testBoard[y][x];
  testBoard[y][x] = temp;
  return testBoard;
}

const BoardReducer = (state = 0, action) => {
  if(state === 0){
    return init();
  }
  switch(action.type){
    case "SET_PIECE":
      return setPiece(state, action);
    case "SET_BOARD":
      return setBoard(state, action);
    case "MOVE_UP":
    case "MOVE_DOWN":
    case "MOVE_RIGHT":
    case "MOVE_LEFT":
      return handleMove(state, action);
    default:
      return state
  }
}

export default BoardReducer;
