import Board from '../reducers/board';

import {isSame} from './board';

function Solver () {

}

const easySolution = [[1,2,3],[4,5,6],[7,8,false]];
const mediumSolution = [[1,2,3,4],[5,6,7,8],[9,10,11,12],[13,14,15,false]];
const hardSolution = [[1,2,3,4,5],[6,7,8,9,10],[11,12,13,14,15],[16,17,18,19,20],[21,22,23,24,false]];

Solver.prototype.getManhattan = (board) => {
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
/*  var solution = new Array(board.length);
  var count = 1;
  for(var i=0; i<board.length; i++){
    solution[i] = new Array(board[i].length);
    for(var j=0; j<board[i].length; j++){
      solution[i][j] = count;
      count++;
    }
  }
  solution[board.length - 1][board.length - 1] = false;*/
  for (var i = 0; i < board.length; i++){
   for (var j = 0; j < board[i].length; j++){
    var elem = board[i][j]
    var found = false
    for (var h = 0; h < solution.length; h++){
     for (var k = 0; k < solution[h].length; k++){
      if (solution[h][k] === elem){
       result += Math.abs(h - i) + Math.abs(j - k)
       found = true
       break
      }
     }
     if (found) break
    }
   }
  }
  return result
}

Solver.prototype.getSolution = function(board, depth){
  const moves = ['MOVE_UP', 'MOVE_RIGHT', 'MOVE_DOWN', 'MOVE_LEFT'];
  var self = this;
  var best = {
    heuristic: 9999,
    move: [],
    solved: false
  };
  for(var i=0; i<moves.length; i++){
    var move = moves[i];
    var newBoard = Board(board, {type: move});
    var same = isSame(board, newBoard);
    if(same){
      continue;
    }
    var secondManhattan = self.getManhattan(newBoard);
    if(secondManhattan === 0){
        best = {
          heuristic: 0,
          move: [move],
          solved: true
        }
        break;
    }
    if(depth > 1){
      var tempSol = self.getSolution(newBoard, depth - 1);
      if(tempSol.heuristic < best.heuristic){
        tempSol.move.push(move);
        best = tempSol;
      }
      else if(best.heuristic === 9999){
        best = {
          heuristic: secondManhattan,
          move: [move],
          solved: false
        };
      }
    }
  }

  return best;
}

Solver.prototype.trimMoveList = (moveList) => {
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
}

module.exports = Solver;
