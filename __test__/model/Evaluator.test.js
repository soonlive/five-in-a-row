/**
 * Created by Xin on 14/07/2017.
 */
test('generatePattern', () => {
  let points = [
    [' ', ' ', 'o', '√', ' ', ' '],
    [' ', ' ', ' ', 'x', ' ', ' '],
    [' ', ' ', ' ', 'x', ' ', ' '],
    [' ', ' ', ' ', 'x', ' ', ' '],
    [' ', ' ', ' ', ' ', ' ', ' '],
    ['o', 'o', 'o', ' ', ' ', ' '],
  ];

  let pattern;
  pattern = Evaluator.generatePattern(points, 0, 3, 0, 1, 'x');
  expect(pattern).toEqual('oxx');
  pattern = Evaluator.generatePattern(points, 0, 3, 1, 0, 'x');
  expect(pattern).toEqual('oooox');
  pattern = Evaluator.generatePattern(points, 0, 3, 1, 1, 'x');
  expect(pattern).toEqual('oxx');
  pattern = Evaluator.generatePattern(points, 0, 3, 1, -1, 'x');
  expect(pattern).toEqual('oxxx');


  points = [
    [' ', ' ', ' ', ' ', ' ', ' '],
    [' ', ' ', ' ', 'x', ' ', 'o'],
    [' ', 'o', ' ', '√', ' ', ' '],
    [' ', ' ', ' ', 'x', ' ', ' '],
    [' ', ' ', ' ', ' ', ' ', 'x'],
    ['o', 'o', 'o', ' ', ' ', ' '],
  ];
  pattern = Evaluator.generatePattern(points, 2, 3, 0, 1, 'x');
  expect(pattern).toEqual('xoxx');
  pattern = Evaluator.generatePattern(points, 2, 3, 1, 0, 'x');
  expect(pattern).toEqual('xoooxx');
  pattern = Evaluator.generatePattern(points, 2, 3, 1, 1, 'x');
  expect(pattern).toEqual('xxoxo');
  pattern = Evaluator.generatePattern(points, 2, 3, 1, -1, 'x');
  expect(pattern).toEqual('xxoxx');

  points = [
    ['x', 'o', ' ', 'o', 'o', 'o'],
    ['x', 'x', 'x', 'x', ' ', ' '],
    ['o', 'o', 'x', 'o', 'o', 'o'],
    ['o', 'o', 'x', ' ', 'o', 'o'],
    ['o', 'o', ' ', 'o', ' ', 'o'],
    ['o', 'o', 'o', 'o', 'o', ' '],
  ];
  pattern = Evaluator.generatePattern(points, 1, 4, 0, 1, 'x');
  expect(pattern).toEqual('ooooox');
  pattern = Evaluator.generatePattern(points, 1, 5, 0, 1, 'x');
  expect(pattern).toEqual('oooxo');
});


test('generateMaxLegalPattern', () => {

  let points = [
    [' ', ' ', ' ', ' ', ' ', ' '],
    [' ', ' ', ' ', ' ', ' ', ' '],
    [' ', 'o', 'o', 'o', 'o', ' '],
    [' ', 'x', 'x', 'x', ' ', ' '],
    [' ', ' ', ' ', ' ', ' ', ' '],
    [' ', ' ', ' ', ' ', ' ', ' ']
  ];
  let pattern = Evaluator.generateMaxLegalPattern(points, 2, 0, 'o');
  expect(pattern).toEqual('ooooo');
  pattern = Evaluator.generateMaxLegalPattern(points, 2, 0, 'x');
  expect(pattern).toEqual('o');
  pattern = Evaluator.generateMaxLegalPattern(points, 3, 0, 'x');
  expect(pattern).toEqual('oooo');


  points = [
    [' ', ' ', ' ', ' ', ' ', ' '],
    [' ', ' ', ' ', ' ', ' ', ' '],
    [' ', ' ', ' ', 'o', 'o', ' '],
    ['o', 'x', 'x', 'x', ' ', 'o'],
    [' ', ' ', ' ', ' ', ' ', ' '],
    [' ', ' ', ' ', ' ', ' ', ' ']
  ];
  pattern = Evaluator.generateMaxLegalPattern(points, 3, 4, 'x');
  expect(pattern).toEqual('');


  points = [
    ['x', ' ', ' ', ' ', ' ', ' '],
    [' ', 'x', ' ', ' ', ' ', ' '],
    [' ', ' ', 'x', 'x', ' ', ' '],
    ['x', 'x', 'x', ' ', ' ', ' '],
    [' ', ' ', ' ', ' ', 'x', ' '],
    [' ', ' ', ' ', ' ', ' ', ' ']
  ];
  pattern = Evaluator.generateMaxLegalPattern(points, 3, 3, 'x');
  expect(pattern).toEqual('ooooo');

});


test('evaluatePattern', () => {
  let evaluator = new Evaluator({ depth: 5 });
  let ooooo = evaluator.evaluatePattern('ooooo');
  let xoooxx = evaluator.evaluatePattern('xoooxx');
  let oooxxx = evaluator.evaluatePattern('oooxxx');
  let oxooxx = evaluator.evaluatePattern('oxooxx');
  let oooxx = evaluator.evaluatePattern('oooxx');
  let xxoxo = evaluator.evaluatePattern('xxoxo');

  expect(ooooo).toBeGreaterThan(xoooxx);
  expect(xoooxx).toBeGreaterThan(oxooxx);
  expect(xoooxx).toBeGreaterThan(oooxx);
  expect(oooxx).toEqual(oxooxx);
  expect(oooxxx).toEqual(oxooxx);
});


test('evaluatePoint', () => {
  let evaluator = new Evaluator({ depth: 5 });

  let points = [
    [' ', ' ', ' ', ' ', ' ', ' '],
    [' ', ' ', ' ', 'x', ' ', 'o'],
    [' ', 'o', ' ', '√', ' ', ' '],
    [' ', ' ', ' ', 'x', ' ', ' '],
    [' ', ' ', ' ', ' ', ' ', 'x'],
    ['o', 'o', 'o', ' ', ' ', ' '],
  ];

  let pattern = Evaluator.generatePattern(points, 2, 3, 0, 1, 'x');
  expect(pattern).toEqual('xoxx');
  expect(evaluator.evaluatePattern(pattern)).toEqual(0);
  pattern = Evaluator.generatePattern(points, 2, 3, 1, 0, 'x');
  expect(evaluator.evaluatePattern(pattern)).toEqual(720);
  pattern = Evaluator.generatePattern(points, 2, 3, 1, 1, 'x');
  expect(pattern).toEqual('xxoxo');
  expect(evaluator.evaluatePattern(pattern)).toEqual(0);
  pattern = Evaluator.generatePattern(points, 2, 3, 1, -1, 'x');
  expect(pattern).toEqual('xxoxx');
  expect(evaluator.evaluatePattern(pattern)).toEqual(0);
  let value = evaluator.evaluatePoint(points, 2, 3, 'x');
  expect(value).toBe(720);


  points = [
    ['x', 'o', ' ', 'o', 'o', 'o'],
    ['x', 'x', 'x', 'x', ' ', ' '],
    ['o', 'o', 'x', 'o', 'o', 'o'],
    ['o', 'o', 'x', ' ', 'o', 'o'],
    ['o', 'o', ' ', 'o', ' ', 'o'],
    ['o', 'o', 'o', 'o', 'o', ' '],
  ];
  value = evaluator.evaluatePoint(points, 4, 4, 'x');
  expect(value).toBe(720);
  value = evaluator.evaluatePoint(points, 1, 5, 'x');
  expect(value).toBe(720);


  points = [
    ['o', 'o', 'o', 'o', 'o', 'o'],
    [' ', 'x', 'x', 'x', ' ', 'o'],
    ['o', 'o', 'o', 'o', 'o', 'o'],
    ['o', 'o', 'o', 'o', 'o', 'o'],
    ['o', 'o', 'o', 'o', 'o', 'o'],
    ['o', 'o', 'o', 'o', 'o', 'o'],
  ];

  value = evaluator.evaluatePoint(points, 1, 0, 'x');
  expect(value).toBe(720);
  value = evaluator.evaluatePoint(points, 1, 4, 'x');
  expect(value).toBe(720);


  points = [
    ['o', 'o', 'o', 'o', 'o', 'o'],
    [' ', 'x', 'x', 'x', ' ', 'o'],
    ['o', 'o', 'o', 'o', 'o', 'o'],
    ['o', 'o', 'o', 'o', 'o', 'o'],
    ['o', 'o', 'o', 'o', 'o', 'o'],
    ['o', 'o', 'o', 'o', 'o', 'o'],
  ];

  value = evaluator.evaluatePoint(points, 1, 0, 'x');
  expect(value).toBe(720);
  value = evaluator.evaluatePoint(points, 1, 4, 'x');
  expect(value).toBe(720);
});


test('evaluatePoints', () => {
  let evaluator = new Evaluator({ depth: 5 });

  let points = [
    ['x', 'x', 'x', 'x', ' ', ' '],
    [' ', ' ', ' ', ' ', ' ', ' '],
    [' ', 'o', ' ', ' ', ' ', ' '],
    [' ', ' ', ' ', ' ', ' ', ' '],
    [' ', ' ', ' ', ' ', ' ', ' '],
    ['o', 'o', 'o', ' ', ' ', ' '],
  ];

  let value = evaluator.evaluatePoints(points, 'x');
  expect(value).toBe(2880);


  points = [
    ['x', 'x', 'x', ' ', ' ', ' '],
    [' ', ' ', ' ', ' ', ' ', ' '],
    [' ', 'o', ' ', ' ', ' ', ' '],
    [' ', ' ', ' ', ' ', ' ', ' '],
    [' ', ' ', ' ', ' ', ' ', ' '],
    ['o', 'o', 'o', ' ', ' ', ' '],
  ];

  value = evaluator.evaluatePoints(points, 'x');
  expect(value).toBe(0);


  points = [
    [' ', ' ', ' ', ' ', ' ', ' '],
    [' ', ' ', ' ', ' ', ' ', ' '],
    [' ', ' ', 'x', ' ', ' ', ' '],
    [' ', ' ', ' ', 'x', ' ', ' '],
    [' ', ' ', ' ', ' ', ' ', ' '],
    ['o', 'o', ' ', ' ', ' ', ' '],
  ];

  value = evaluator.evaluatePoints(points, 'x');
  expect(value).toBe(1520);

  points = [
    [' ', ' ', ' ', ' ', ' ', ' '],
    [' ', ' ', ' ', 'x', ' ', 'o'],
    [' ', 'o', ' ', 'x', ' ', ' '],
    [' ', ' ', ' ', 'x', ' ', ' '],
    [' ', ' ', ' ', ' ', ' ', 'x'],
    ['o', 'o', 'o', ' ', ' ', ' '],
  ];

  value = evaluator.evaluatePoints(points, 'x');
  expect(value).toBe(2200);


  points = [
    [' ', ' ', ' ', ' ', ' ', ' '],
    [' ', ' ', ' ', 'x', ' ', ' '],
    [' ', ' ', ' ', 'x', ' ', ' '],
    [' ', ' ', ' ', 'x', ' ', ' '],
    [' ', ' ', ' ', 'x', ' ', ' '],
    [' ', ' ', ' ', ' ', ' ', ' '],
  ];

  value = evaluator.evaluatePoints(points, 'x');
  expect(value).toBe(23160);
});

test('minimax vs alpha-beta', () => {
  let evaluator = new Evaluator({ depth: 7 });
  let points = [
    [' ', ' ', ' ', ' ', ' ', ' '],
    [' ', ' ', ' ', ' ', ' ', ' '],
    [' ', ' ', ' ', ' ', ' ', ' '],
    [' ', ' ', 'o', 'x', ' ', ' '],
    [' ', ' ', ' ', ' ', ' ', ' '],
    [' ', ' ', ' ', ' ', ' ', ' '],
  ];

  console.time("minimax");
  let moveByMinimax = evaluator.findBestMoveByMinimax(points, 'x', 'o');
  console.timeEnd("minimax");

  console.time("alpha-beta");
  let moveByAlphaBeta = evaluator.findBestMove(points, 'x', 'o');
  console.timeEnd("alpha-beta");

  expect(moveByAlphaBeta.row).toEqual(moveByMinimax.row);
  expect(moveByAlphaBeta.column).toEqual(moveByMinimax.column);
});

test('alpha-beta vs trans', () => {
  let board = new Board(15);
  let evaluator = new Evaluator({ depth: 7, board });
  let points = [
    [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
    [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
    [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
    [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', 'o', ' ', ' ', ' ', ' '],
    [' ', ' ', ' ', ' ', ' ', ' ', ' ', 'o', ' ', 'x', ' ', ' ', ' ', ' ', ' '],
    [' ', ' ', ' ', ' ', ' ', ' ', ' ', 'x', 'x', 'o', ' ', ' ', ' ', ' ', ' '],
    [' ', ' ', ' ', ' ', ' ', ' ', ' ', 'x', 'o', 'x', ' ', ' ', ' ', ' ', ' '],
    [' ', ' ', ' ', ' ', ' ', ' ', 'o', 'x', 'o', 'x', 'o', ' ', ' ', ' ', ' '],
    [' ', ' ', ' ', ' ', ' ', 'x', 'o', 'o', 'o', 'o', 'x', ' ', ' ', ' ', ' '],
    [' ', ' ', ' ', ' ', ' ', ' ', 'o', ' ', 'x', 'o', 'x', 'x', ' ', ' ', ' '],
    [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', 'x', ' ', ' ', 'x', ' ', ' '],
    [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', 'o', ' '],
    [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
    [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
    [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
  ];

  console.time("alpha-beta");
  let moveByAlphaBeta = evaluator.findBestMoveByAlphaBeta(points, 'x', 'o');
  console.timeEnd("alpha-beta");

  console.time("trans");
  let moveByTrans = evaluator.findBestMove(points, 'x', 'o');
  console.timeEnd("trans");
  //
  expect(moveByAlphaBeta.row).toEqual(moveByTrans.row);
  expect(moveByAlphaBeta.column).toEqual(moveByTrans.column);
  console.log('Evaluator.test.js => moveByAlphaBeta', moveByAlphaBeta)

});



test('begin', () => {
  let board = new Board(15);
  let evaluator = new Evaluator({ depth: 7, board });
  let points = [
    [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
    [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
    [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
    [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
    [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
    [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
    [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
    [' ', ' ', ' ', ' ', ' ', ' ', ' ', 'o', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
    [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
    [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
    [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
    [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
    [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
    [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
    [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
  ];

  console.time("trans");
  let moveByTrans = evaluator.findBestMove(points, 'x', 'o');
  console.timeEnd("trans");
  //
  console.log('Evaluator.test.js => moveByAlphaBeta', moveByTrans)

});