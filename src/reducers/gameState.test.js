import GameState from './gameState';

it('Initialize', () => {
  var initialized = GameState(0);
  var solution = {
    mode: {
      width: 4,
      height: 4      
    }
  }
  expect(initialized).toEqual(solution);
})
