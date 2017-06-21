import Solver from '../utility/solver';
var solver = new Solver();

export const solve = () => {
  return(dispatch, getState) => {
    var board = getState().Board;
    var t0 = performance.now();
    var answer = solver.getSolution(board, 50);
//    var answer = solver.getSolutionManhattan(board, 50);
//    var answer = solver.getIterative(board, 4, 12);
    var t1 = performance.now();
    console.log("Call to Solve took " + (t1 - t0) + " milliseconds.")
//    answer.move = solver.trimMoveList(answer.move);
    var moveList = answer.totalMoves;
    var delay = 250;
    moveList.forEach(function(elem, index){
      setTimeout(function(){
        dispatch({type: elem});
      }, delay);
      delay += 250;
    })
  }
}
