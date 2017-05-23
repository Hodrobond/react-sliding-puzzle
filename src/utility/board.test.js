import {isSolvable, fillBoard, getInversions, isSame} from './board';

it('isSolveable - 1', () => {
  var board = [[3,9,1,15],[14,11,4,6],[13, false, 10, 12],[2, 7, 8, 5]];
  const isSolve = isSolvable(board);
  const solution = false;
  expect(isSolve).toEqual(solution);
})

it('isSolveable - 2', () => {
  var board = [[6,13,7,10],[8,9,11,false],[15,2,12,5],[14,3,1,4]];
  const isSolve = isSolvable(board);
  const solution = true;
  expect(isSolve).toEqual(solution);
})

it('fillBoard - 1', () => {
  var test = fillBoard(4);
  expect(test.length).toEqual(4);
  expect(test[0].length).toEqual(4);
})

it('getInversions - 1', () => {
  var board = [[2,1,3,4],[5,6,7,8],[9,10,11,12],[13,14,15,false]];
  var answer = getInversions(board);
  const solution = 1;
  expect(answer).toEqual(solution);
})

it('getInversions - 2', () => {
  var board = [[12,1,10,2],[7,11,4,14],[5,false,9,15],[8,13,6,3]]
  var answer = getInversions(board);
  const solution = 49;
  expect(answer).toEqual(solution);
})

it('getInversions - 3', () => {
  var board = [[12,1,10,2],[7,false,4,14],[5,11,9,15],[8,13,6,3]]
  var answer = getInversions(board);
  const solution = 48;
  expect(answer).toEqual(solution);
})

it('isSame - 1', () => {
  var boardA = [[1,2,3,4],[5,6,7,8],[9,10,11,12],[13,14,15,false]];
  var boardB = [[1,2,3,4],[5,6,7,8],[9,10,11,12],[13,14,15,false]]
  const ans = isSame(boardA, boardB);
  var solution = true;
  expect(ans).toEqual(solution);
})
