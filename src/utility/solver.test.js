import Solver from './Solver';

it('Test', () => {
  expect(true).toEqual(true);
})

it('Manhattan - 1', () => {
  var solver = new Solver();
  const testBoard = [[1,2,3,4],[5,6,7,8],[9,10,11,12],[13,14,false,15]];
  var manhattan = solver.getManhattan(testBoard);
  const solution = 1;
  expect(manhattan).toEqual(solution);
})

it('Manhattan - 2', () => {
  var solver = new Solver();
  const testBoard = [[5,false,8],[4,2,1],[7,3,6]]
  //5, 0, 8
  //4, 2, 1
  //7, 3, 6
  //2 + 3 + 0 + 1 + 3 + 0 + 3 + 1 = 13
  var manhattan = solver.getManhattan(testBoard);
  const solution = 13;
  expect(manhattan).toEqual(solution);
})

it('getSolutionManhattan - 1', () => {
  var solver = new Solver();
  const testBoard = [[1,2,3,4],[5,6,7,8],[9,10,11,12],[13,14,false,15]];
  var answer = solver.getSolutionManhattan(testBoard, 5);
  const solution = {
    heuristic: 0,
    move: ["MOVE_LEFT"],
    solved: true
  };
  answer.move = solver.trimMoveList(answer.move);
  expect(answer).toEqual(solution);
})

it('getSolutionManhattan - 2', () => {
  var solver = new Solver();
  const testBoard = [[1,2,3,4],[5,6,7,8],[9,10,11,12],[13,false,14,15]];
  var answer = solver.getSolutionManhattan(testBoard, 3);
  const solution = {
    heuristic: 0,
    move: ["MOVE_LEFT", "MOVE_LEFT"],
    solved: true
  };
  answer.move = solver.trimMoveList(answer.move);
  expect(answer).toEqual(solution);
})

it('getSolutionManhattan - 3', () => {
  var solver = new Solver();
  const testBoard = [[1,2,3,4],[5,6,7,8],[9,10,false,11],[13,14,15,12]];
  var answer = solver.getSolutionManhattan(testBoard, 5);
  const solution = {
    heuristic: 0,
    move: ["MOVE_UP", "MOVE_LEFT"],
    solved: true
  };
  answer.move = solver.trimMoveList(answer.move);
  expect(answer).toEqual(solution);
})


it('getSolutionManhattan - 4', () => {
  var solver = new Solver();
  const testBoard = [[1,2,3,4],[false,5,7,8],[9,6,10,11],[13,14,15,12]];
  var answer = solver.getSolutionManhattan(testBoard, 5);
  const solution = {
    heuristic: 0,
    move: ["MOVE_UP", "MOVE_LEFT", "MOVE_LEFT", "MOVE_UP", "MOVE_LEFT"],
    solved: true
  };
  answer.move = solver.trimMoveList(answer.move);
  expect(answer).toEqual(solution);
})

it('getMisplaced - 0', () => {
  var solver = new Solver();
  const testBoard = [[1,2,3,4],[5,6,7,8],[9,10,11,12],[13,14,15,false]];
  var answer = solver.getMisplacedCount(testBoard);
  const solution = 0;
  expect(answer).toEqual(solution);
})

it('getMisplaced - 8', () => {
  var solver = new Solver();
  const testBoard = [[4,3,2,1],[6,5,7,8],[9,10,11,12],[13,14,false,15]];
  var answer = solver.getMisplacedCount(testBoard);
  const solution = 8;
  expect(answer).toEqual(solution);
})

it('getMisplaced - 16', () => {
  var solver = new Solver();
  const testBoard = [[2,3,4,5],[6,7,8,9],[10,11,12,13],[14,15,false,1]];
  var answer = solver.getMisplacedCount(testBoard);
  const solution = 16;
  expect(answer).toEqual(solution);
})

it('getSolution - 1', () => {
  var solver = new Solver();
  const testBoard = [[1,2,3,4],[5,6,7,8],[9,10,11,12],[13,14,false,15]];
  var answer = solver.getSolution(testBoard);
  const solution = 16;
  expect(answer).toEqual(solution);
})
