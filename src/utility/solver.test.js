import Solver from './Solver';

it('Test', () => {
  expect(true).toEqual(true);
})

it('Manhattan', () => {
  var solver = new Solver();
  const testBoard = [[1,2,3,4],[5,6,7,8],[9,10,11,12],[13,14,false,15]];
  var manhattan = solver.getManhattan(testBoard);
  const solution = 2;
  expect(manhattan).toEqual(solution);
})

it('getSolution - 1', () => {
  var solver = new Solver();
  const testBoard = [[1,2,3,4],[5,6,7,8],[9,10,11,12],[13,14,false,15]];
  var answer = solver.getSolution(testBoard, 5);
  const solution = {
    heuristic: 0,
    move: ["MOVE_LEFT"],
    solved: true
  };
  answer.move = solver.trimMoveList(answer.move);
  expect(answer).toEqual(solution);
})

it('getSolution - 2', () => {
  var solver = new Solver();
  const testBoard = [[1,2,3,4],[5,6,7,8],[9,10,11,12],[13,false,14,15]];
  var answer = solver.getSolution(testBoard, 3);
  const solution = {
    heuristic: 0,
    move: ["MOVE_LEFT", "MOVE_LEFT"],
    solved: true
  };
  answer.move = solver.trimMoveList(answer.move);
  expect(answer).toEqual(solution);
})

it('getSolution - 3', () => {
  var solver = new Solver();
  const testBoard = [[1,2,3,4],[5,6,7,8],[9,10,false,11],[13,14,15,12]];
  var answer = solver.getSolution(testBoard, 5);
  const solution = {
    heuristic: 0,
    move: ["MOVE_UP", "MOVE_LEFT"],
    solved: true
  };
  answer.move = solver.trimMoveList(answer.move);
  expect(answer).toEqual(solution);
})


it('getSolution - 4', () => {
  var solver = new Solver();
  const testBoard = [[1,2,3,4],[false,5,7,8],[9,6,10,11],[13,14,15,12]];
  var answer = solver.getSolution(testBoard, 5);
  const solution = {
    heuristic: 0,
    move: ["MOVE_UP", "MOVE_LEFT", "MOVE_LEFT", "MOVE_UP", "MOVE_LEFT"],
    solved: true
  };
  answer.move = solver.trimMoveList(answer.move);
  expect(answer).toEqual(solution);
})
