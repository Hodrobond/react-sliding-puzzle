import Board from './Board';

it('Initialization', () => {
  const initialized = Board(0);
  const solution = [[false, false, false, false],
                    [false, false, false, false],
                    [false, false, false, false],
                    [false, false, false, false]];
  expect(initialized).toEqual(solution);
})

it('Set Piece - 1', () => {
  const initialized = Board(0);
  const solution = [[1, false, false, false],
                    [false, false, false, false],
                    [false, false, false, false],
                    [false, false, false, false]];
  const newState = Board(initialized, {
    type: "SET_PIECE",
    x: 0,
    y: 0,
    value: 1
  })
  expect(initialized).toEqual(solution);
})
