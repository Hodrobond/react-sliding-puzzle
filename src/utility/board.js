var _ = require('lodash');

export const isSolvable = (board) => {
  var isSizeEven = board.length % 2 === 0;
  var inversions = getInversions(board);
  var blankRow = findBlank(board).y;
  if(isSizeEven){
    if(blankRow % 2 === 0 && inversions % 2 !== 0){
      return true;
    }
    else if(blankRow % 2 !== 0 && inversions % 2 === 0){
      return true;
    }
  }
  else {
    if(inversions % 2 === 0)
      return true;
  }
  return false;
}

export const getInversions = (board) => {
  var newArr = [];
  for(var i = 0; i < board.length; i++){
    newArr = newArr.concat(board[i]);
  }
  var inv_count = 0;
  for (i = 0; i < newArr.length - 1; i++){
    for (var j = i + 1; j < newArr.length; j++){
      // count pairs(i, j) such that i appears
      // before j, but i > j.
      if (newArr[j] && newArr[i] && newArr[i] > newArr[j])
        inv_count++;
    }
  }
  return inv_count;
}

export const findBlank = (board) => {
  for(var i=0; i<board.length; i++){
    for(var j=0; j<board[i].length; j++){
      if(board[i][j] === false)
        return {
          y: i,
          x: j
        }
    }
  }
}

function fisherYates() {
  for(var k = 0; k < arguments.length; k++){
    var i = arguments[k].length;
    if ( i === 0 ) return false;
    while ( --i ) {
       var j = Math.floor( Math.random() * ( i + 1 ) );
       var tempi = arguments[k][i];
       var tempj = arguments[k][j];
       arguments[k][i] = tempj;
       arguments[k][j] = tempi;
     }
  }
  return arguments;
}

export const fillBoard = (size) => {
  var unSortedArray = [];
  for(var i=0; i<(size * size); i++){
    if(i === 0){
      unSortedArray[i] = false;
    }
    else{
      unSortedArray[i] = i;
    }
  }
  var sortedArray = _.shuffle(unSortedArray);
  let newArray = new Array(size);;
  var count = 0;
  for(i=0; i<size; i++){
    newArray[i] = new Array(size);
    for(var j=0; j<size; j++){
      newArray[i][j] = sortedArray[count];
      count++;
    }
  }
  return newArray;
}

export const isSame = (boardA, boardB) => {
  for(var i=0; i<boardA.length; i++){
    for(var j=0; j<boardA[i].length; j++){
      if(boardA[i][j] !== boardB[i][j])
        return false;
    }
  }
  return true;
}
