import Board from '../reducers/board';

import {isSame, findBlank} from './board';
const easySolution = [[1,2,3],[4,5,6],[7,8,false]];
const mediumSolution = [[1,2,3,4],[5,6,7,8],[9,10,11,12],[13,14,15,false]];
const hardSolution = [[1,2,3,4,5],[6,7,8,9,10],[11,12,13,14,15],[16,17,18,19,20],[21,22,23,24,false]];

class Solver{
  constructor(){

  }

  getManhattan = (board) => {
    var result = 0;
    var solution;
    switch(board.length){
      case 3:
        solution = easySolution;
        break;
      case 4:
        solution = mediumSolution;
        break;
      case 5:
        solution = hardSolution;
        break;
    }
    for (var i = 0; i < board.length; i++){
     for (var j = 0; j < board[i].length; j++){
      var elem = board[i][j]
      var found = false
      if(elem === false)
        continue;
      for (var h = 0; h < solution.length; h++){
       for (var k = 0; k < solution[h].length; k++){
        if (solution[h][k] === elem){
//          result += Math.min(Math.abs(h-i), board.length - Math.abs(h-i)) + Math.min(Math.abs(k-j), board[i].length - Math.abs(k-j));
         result += Math.abs(i - h) + Math.abs(j - k);

         found = true
         break
        }
       }
       if (found) break
      }
     }
    }
    return result
  }//getManhattan
  getMisplacedCount = (board) => {
    var misplaced = 0;
    var solution;
    switch(board.length){
      case 3:
        solution = easySolution;
        break;
      case 4:
        solution = mediumSolution;
        break;
      case 5:
        solution = hardSolution;
        break;
    }
    for(var i=0; i<board.length; i++){
      for(var j=0; j<board[i].length; j++){
        if(board[i][j] !== solution[i][j])
          misplaced++;
      }
    }
    return misplaced;
  }//getMisplacedCount

  getSideHeuristics = (board) => {
    var up=true, right=true, down=true, left=true;
    var solution;
    switch(board.length){
      case 3:
        solution = easySolution;
        break;
      case 4:
        solution = mediumSolution;
        break;
      case 5:
        solution = hardSolution;
        break;
    }
    for(var i=0; i<board.length; i++){
      if(board[i][0] !== solution[i][0])
        left = false;
      if(board[0][i] !== solution[0][i])
        up = false;
      if(board[board.length - 1][i] !== solution[board.length - 1][i])
        down = false;
      if(board[i][board.length - 1] !== solution[i][board.length - 1])
        right = false;
    }
    var count = 0;
    if(up)
      count++;
    if(right)
      count++;
    if(down)
      count++;
    if(left)
      count++;

    return count;
  }//getSideHeuristics

  getHeuristics = (board) => {
    var manhattan = this.getManhattan(board);
    var sides = this.getSideHeuristics(board);
    var misplaced = this.getMisplacedCount(board);
    return {
      manhattan,
      sides,
      misplaced
    }
  }//getHeuristics

  handleMove = (state, action) => {
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
      return {
        board:state,
        same: true
      };
    }

    var temp = testBoard[blank.y][blank.x];
    testBoard[blank.y][blank.x] = testBoard[y][x];
    testBoard[y][x] = temp;
    return {
      board: testBoard,
      same: false
    };
  }//handleMove

  compareMoves = (a,b) => {
    return a.heuristic - b.heuristic;
  }//compareMoves

  getIterative = (board, depth, iterationDepth) => {
    var self = this;
    var currentBoard = board;
    var totalMoves = [];
    var best = {
      heuristic: 9999,
      move: [],
      solved: false
    };
    for(var i=0; i<depth; i++){
      var solution = this.getSolutionManhattan(currentBoard, iterationDepth);
      var moveSet = solution.move.reverse();
      totalMoves = totalMoves.concat(moveSet);
      if(solution.heuristic === 0){
        best.solved = true;
        best.heuristic = 0;
        break;
      }
      else if(solution.heuristic < best.heuristic){
        best.heuristic = solution.heuristic;
      }

      for(var j=0; j<moveSet.length; j++){
        var currentMove = moveSet[j];
        currentBoard = this.handleMove(currentBoard, {type:currentMove}).board;
      }
    }
    best.move = totalMoves;
    return best;
  }//getIterative

  getSolutionManhattan = (board, depth) => {
    const moves = ['MOVE_UP', 'MOVE_RIGHT', 'MOVE_DOWN', 'MOVE_LEFT'];
    var self = this;
    var best = {
      heuristic: 9999,
      move: [],
      solved: false
    };
    var moveSet = [];
    for(var i=0; i<moves.length; i++){
      var move = moves[i];
      var newState = this.handleMove(board, {type: move});
      if(newState.same)
        continue;
      var newBoard = newState.board;
      var heuristics = this.getHeuristics(newBoard);
      var manhattan = heuristics.manhattan;
      var misplaced = heuristics.misplaced;
      if(manhattan === 0){
          return {
            heuristic: 0,
            move: [move],
            solved: true
          }
      }
      moveSet.push({
        heuristic: manhattan+misplaced,
        move: move,
        solved: false,
        board: newBoard
      });
    }
    //order moveSet
    if(depth > 1){
      var ordered = moveSet.sort(this.compareMoves);
      for(var i=0; i<moveSet.length; i++){
        var currentMove = moveSet[i];
        var move = currentMove.move;
        var tempSol = this.getSolutionManhattan(currentMove.board, depth - 1);
        if(tempSol.heuristic === 0){
          tempSol.move.push(move);
          return tempSol;
        }
        if(tempSol.heuristic < best.heuristic){
          tempSol.move.push(move);
          best = tempSol;
        }
        else if(best.heuristic === 9999){
          best = {
            heuristic: manhattan+misplaced, //todo remove
            move: [move],
            solved: false
          };
        }
      }
    }
    return best;
  }

  getIDAStar = (board) => {
    var root = board;
    var solution;
    switch(board.length){
      case 3:
        solution = easySolution;
        break;
      case 4:
        solution = mediumSolution;
        break;
      case 5:
        solution = hardSolution;
        break;
    }
    while(1){

    }

  }

  idaSearch = (node, g) => {

  }

  getSolution = (board) => {
    const moves = ['MOVE_UP', 'MOVE_RIGHT', 'MOVE_DOWN', 'MOVE_LEFT'];
    let prevManhattan = this.getHeuristics(board).manhattan;
    let moveStack = [{
      board: board,
      heuristic: prevManhattan,
      totalMoves: []
    }]

    while(moveStack.length > 0){
      moveStack.sort(this.compareMoves);
//      console.log(moveStack);
      let currentState = moveStack.splice(0,1)[0];
      for(let i=0; i<moves.length; i++){
        let currentMove = moves[i];
        let prevMove = currentState.totalMoves[currentState.totalMoves.length - 1];
        if((currentMove === "MOVE_UP" && prevMove === 'MOVE_DOWN')
        || (currentMove === "MOVE_RIGHT" && prevMove === 'MOVE_LEFT')
        || (currentMove === "MOVE_DOWN" && prevMove === 'MOVE_UP')
        || (currentMove === "MOVE_LEFT" && prevMove === 'MOVE_RIGHT')){
          continue;
        }
        let newState = this.handleMove(currentState.board, {type: currentMove});
        if(newState.same)
          continue;
        var newBoard = newState.board;
        var heuristics = this.getHeuristics(newBoard);
        var manhattan = heuristics.manhattan;
        var misplaced = heuristics.misplaced;
        let tempMoveStack = currentState.totalMoves.slice();
        tempMoveStack.push(currentMove);
        if(manhattan === 0){
            return {
              heuristic: 0,
              totalMoves: tempMoveStack
            }
        }
        let moveStackLength = tempMoveStack.length;
        var newHeuristic = manhattan+(misplaced*2)+tempMoveStack.length;
        for(var j=4; j>heuristics.sides; j--){
          newHeuristic *= 1.25;
        }
        moveStack.push({
          heuristic: newHeuristic,
          board: newBoard,
          totalMoves: tempMoveStack
        });
      }
    }
  }//getSolutionManhattan

  trimMoveList = (moveList) => {
    for(var i=0; i<moveList.length; i++){
      var current = moveList[i];
      switch(current){
        case 'MOVE_UP':
          if(moveList[i+1] === 'MOVE_DOWN'){
            moveList.splice(i, i+2);
          }
          break;
        case 'MOVE_RIGHT':
          if(moveList[i+1] === 'MOVE_LEFT'){
            moveList.splice(i, i+2);
          }
          break;
        case 'MOVE_DOWN':
          if(moveList[i+1] === 'MOVE_UP'){
            moveList.splice(i, i+2);
          }
          break;
        case 'MOVE_LEFT':
          if(moveList[i+1] === 'MOVE_RIGHT'){
            moveList.splice(i, i+2);
          }
          break;
        default:
          break;
      }
    }
    return moveList;
  }//trimMoveList
}


module.exports = Solver;
