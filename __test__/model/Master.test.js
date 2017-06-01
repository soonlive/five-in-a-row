/**
 * Created by Xin on 28/05/2017.
 */
test('generatePattern', () => {
  let master = new Master('x', 'easy', 'o');

  let points = [
    [' ', ' ', 'o', '√', ' ', ' '],
    [' ', ' ', ' ', 'x', ' ', ' '],
    [' ', ' ', ' ', 'x', ' ', ' '],
    [' ', ' ', ' ', 'x', ' ', ' '],
    [' ', ' ', ' ', ' ', ' ', ' '],
    ['o', 'o', 'o', ' ', ' ', ' '],
  ];
  let pattern;
  pattern = master.generatePattern(points, 0, master.depth, 0, 1, master.id);
  expect(pattern).toEqual('oxx');
  pattern = master.generatePattern(points, 0, master.depth, 1, 0, master.id);
  expect(pattern).toEqual('oooox');
  pattern = master.generatePattern(points, 0, master.depth, 1, 1, master.id);
  expect(pattern).toEqual('oxx');
  pattern = master.generatePattern(points, 0, master.depth, 1, -1, master.id);
  expect(pattern).toEqual('oxxx');


  points = [
    [' ', ' ', ' ', ' ', ' ', ' '],
    [' ', ' ', ' ', 'x', ' ', 'o'],
    [' ', 'o', ' ', '√', ' ', ' '],
    [' ', ' ', ' ', 'x', ' ', ' '],
    [' ', ' ', ' ', ' ', ' ', 'x'],
    ['o', 'o', 'o', ' ', ' ', ' '],
  ];
  pattern = master.generatePattern(points, 2, master.depth, 0, 1, master.id);
  expect(pattern).toEqual('xoxx');
  pattern = master.generatePattern(points, 2, master.depth, 1, 0, master.id);
  expect(pattern).toEqual('xoooxx');
  pattern = master.generatePattern(points, 2, master.depth, 1, 1, master.id);
  expect(pattern).toEqual('xxoxo');
  pattern = master.generatePattern(points, 2, master.depth, 1, -1, master.id);
  expect(pattern).toEqual('xxoxx');

  points = [
    ['x', 'o', ' ', 'o', 'o', 'o'],
    ['x', 'x', 'x', 'x', ' ', ' '],
    ['o', 'o', 'x', 'o', 'o', 'o'],
    ['o', 'o', 'x', ' ', 'o', 'o'],
    ['o', 'o', ' ', 'o', ' ', 'o'],
    ['o', 'o', 'o', 'o', 'o', ' '],
  ];
  pattern = master.generatePattern(points, 1, 4, 0, 1, master.id);
  expect(pattern).toEqual('ooooox');
  pattern = master.generatePattern(points, 1, 5, 0, 1, master.id);
  expect(pattern).toEqual('oooxo');
});

test('generateMaxLegalPattern', () => {
  let master = new Master('x', 'easy', 'o');

  let points = [
    [" ", " ", " ", " ", " ", " "],
    [" ", " ", " ", " ", " ", " "],
    [" ", "o", "o", "o", "o", " "],
    [" ", "x", "x", "x", " ", " "],
    [" ", " ", " ", " ", " ", " "],
    [" ", " ", " ", " ", " ", " "]
  ];
  let pattern = master.generateMaxLegalPattern(points, 2, 0, 'o');
  expect(pattern).toEqual('ooooo');
  pattern = master.generateMaxLegalPattern(points, 2, 0, 'x');
  expect(pattern).toEqual('o');
  pattern = master.generateMaxLegalPattern(points, master.depth, 0, 'x');
  expect(pattern).toEqual('oooo');


  points = [
    [" ", " ", " ", " ", " ", " "],
    [" ", " ", " ", " ", " ", " "],
    [" ", " ", " ", "o", "o", " "],
    ["o", "x", "x", "x", " ", "o"],
    [" ", " ", " ", " ", " ", " "],
    [" ", " ", " ", " ", " ", " "]
  ];
  pattern = master.generateMaxLegalPattern(points, master.depth, 4, 'x');
  expect(pattern).toEqual('');


  points = [
    ["x", " ", " ", " ", " ", " "],
    [" ", "x", " ", " ", " ", " "],
    [" ", " ", "x", "x", " ", " "],
    ["x", "x", "x", " ", " ", " "],
    [" ", " ", " ", " ", "x", " "],
    [" ", " ", " ", " ", " ", " "]
  ];
  pattern = master.generateMaxLegalPattern(points, master.depth, 3, 'x');
  expect(pattern).toEqual('ooooo');

});

test('evaluatePattern', () => {
  let master = new Master('x', 'easy', 'o');
  let ooooo = master.evaluatePattern('ooooo');
  let xoooxx = master.evaluatePattern('xoooxx');
  let oooxxx = master.evaluatePattern('oooxxx');
  let oxooxx = master.evaluatePattern('oxooxx');
  let oooxx = master.evaluatePattern('oooxx');
  let xxoxo = master.evaluatePattern('xxoxo');

  expect(ooooo).toBeGreaterThan(xoooxx);
  expect(xoooxx).toBeGreaterThan(oxooxx);
  expect(xoooxx).toBeGreaterThan(oooxx);
  expect(oooxx).toBeGreaterThan(oxooxx);
  expect(oooxxx).toBeGreaterThan(oxooxx);
});


test('evaluatePoint', () => {
  let master = new Master('x', 'easy', 'o');

  let points = [
    [' ', ' ', ' ', ' ', ' ', ' '],
    [' ', ' ', ' ', 'x', ' ', 'o'],
    [' ', 'o', ' ', '√', ' ', ' '],
    [' ', ' ', ' ', 'x', ' ', ' '],
    [' ', ' ', ' ', ' ', ' ', 'x'],
    ['o', 'o', 'o', ' ', ' ', ' '],
  ];

  let pattern = master.generatePattern(points, 2, master.depth, 0, 1, master.id);
  expect(pattern).toEqual('xoxx');
  expect(master.evaluatePattern(pattern)).toEqual(0);
  pattern = master.generatePattern(points, 2, master.depth, 1, 0, master.id);
  expect(master.evaluatePattern(pattern)).toEqual(4500);
  pattern = master.generatePattern(points, 2, master.depth, 1, 1, master.id);
  expect(pattern).toEqual('xxoxo');
  expect(master.evaluatePattern(pattern)).toEqual(80);
  pattern = master.generatePattern(points, 2, master.depth, 1, -1, master.id);
  expect(pattern).toEqual('xxoxx');
  expect(master.evaluatePattern(pattern)).toEqual(40);
  let value = master.evaluatePoint(points, { row: 2, column: 3 }, master.id);
  expect(value).toBe(4620);


  points = [
    ['x', 'o', ' ', 'o', 'o', 'o'],
    ['x', 'x', 'x', 'x', ' ', ' '],
    ['o', 'o', 'x', 'o', 'o', 'o'],
    ['o', 'o', 'x', ' ', 'o', 'o'],
    ['o', 'o', ' ', 'o', ' ', 'o'],
    ['o', 'o', 'o', 'o', 'o', ' '],
  ];
  value = master.evaluatePoint(points, { row: 4, column: 4 }, master.id);
  expect(value).toBe(4800);
  value = master.evaluatePoint(points, { row: 1, column: 5 }, master.id);
  expect(value).toBe(2000);


  points = [
    ['o', 'o', 'o', 'o', 'o', 'o'],
    [' ', 'x', 'x', 'x', ' ', 'o'],
    ['o', 'o', 'o', 'o', 'o', 'o'],
    ['o', 'o', 'o', 'o', 'o', 'o'],
    ['o', 'o', 'o', 'o', 'o', 'o'],
    ['o', 'o', 'o', 'o', 'o', 'o'],
  ];

  value = master.evaluatePoint(points, { row: 1, column: 0 }, master.id);
  expect(value).toBe(4000);
  value = master.evaluatePoint(points, { row: 1, column: 4 }, master.id);
  expect(value).toBe(4000);


  points = [
    ['o', 'o', 'o', 'o', 'o', 'o'],
    [' ', 'x', 'x', 'x', ' ', 'o'],
    ['o', 'o', 'o', 'o', 'o', 'o'],
    ['o', 'o', 'o', 'o', 'o', 'o'],
    ['o', 'o', 'o', 'o', 'o', 'o'],
    ['o', 'o', 'o', 'o', 'o', 'o'],
  ];

  value = master.evaluatePoint(points, { row: 1, column: 0 }, master.id);
  expect(value).toBe(4000);
  value = master.evaluatePoint(points, { row: 1, column: 4 }, master.id);
  expect(value).toBe(4000);
});


test('evaluatePoints', () => {
  let master = new Master('x', 'easy', 'o');


  let points = [
    ['x', 'x', 'x', 'x', ' ', ' '],
    [' ', ' ', ' ', ' ', ' ', ' '],
    [' ', 'o', ' ', ' ', ' ', ' '],
    [' ', ' ', ' ', ' ', ' ', ' '],
    [' ', ' ', ' ', ' ', ' ', ' '],
    ['o', 'o', 'o', ' ', ' ', ' '],
  ];

  let value = master.evaluatePoints(points, master.id);
  expect(value).toBe(20500);


  points = [
    ['x', 'x', 'x', ' ', ' ', ' '],
    [' ', ' ', ' ', ' ', ' ', ' '],
    [' ', 'o', ' ', ' ', ' ', ' '],
    [' ', ' ', ' ', ' ', ' ', ' '],
    [' ', ' ', ' ', ' ', ' ', ' '],
    ['o', 'o', 'o', ' ', ' ', ' '],
  ];

  value = master.evaluatePoints(points, master.id);
  expect(value).toBe(4700);


  points = [
    [' ', ' ', ' ', ' ', ' ', ' '],
    [' ', ' ', ' ', ' ', ' ', ' '],
    [' ', ' ', 'x', ' ', ' ', ' '],
    [' ', ' ', ' ', 'x', ' ', ' '],
    [' ', ' ', ' ', ' ', ' ', ' '],
    ['o', 'o', ' ', ' ', ' ', ' '],
  ];

  value = master.evaluatePoints(points, master.id);
  expect(value).toBe(800);

  points = [
    [' ', ' ', ' ', ' ', ' ', ' '],
    [' ', ' ', ' ', 'x', ' ', 'o'],
    [' ', 'o', ' ', 'x', ' ', ' '],
    [' ', ' ', ' ', 'x', ' ', ' '],
    [' ', ' ', ' ', ' ', ' ', 'x'],
    ['o', 'o', 'o', ' ', ' ', ' '],
  ];

  value = master.evaluatePoints(points, master.id);
  expect(value).toBe(13780);


  points = [
    ['x', 'o', ' ', 'o', 'o', 'o'],
    ['x', 'x', 'x', 'x', ' ', ' '],
    ['o', 'o', 'x', 'o', 'o', 'o'],
    ['o', 'o', 'x', ' ', 'o', 'o'],
    ['o', 'o', ' ', 'o', ' ', 'o'],
    ['o', 'o', 'o', 'o', 'o', ' '],
  ];
  value = master.evaluatePoints(points, master.id);
  expect(value).toBe(34200);


  points = [
    ['o', 'o', 'o', 'o', 'o', 'o'],
    [' ', 'x', 'x', 'x', ' ', 'o'],
    ['o', 'o', 'o', 'o', 'o', 'o'],
    ['o', 'o', 'o', 'o', 'o', 'o'],
    ['o', 'o', 'o', 'o', 'o', 'o'],
    ['o', 'o', 'o', 'o', 'o', 'o'],
  ];

  value = master.evaluatePoints(points, master.id);
  expect(value).toBe(9000);


  points = [
    ['o', 'o', 'o', 'o', 'o', 'o'],
    [' ', 'x', 'x', 'x', 'x', 'o'],
    ['o', 'o', 'o', 'o', 'o', 'o'],
    ['o', 'o', 'o', 'o', 'o', 'o'],
    ['o', 'o', 'o', 'o', 'o', 'o'],
    ['o', 'o', 'o', 'o', 'o', 'o'],
  ];

  value = master.evaluatePoints(points, master.id);
  expect(value).toBe(16000);

  points = [
    ['o', 'o', 'o', 'o', 'o', 'o'],
    ['x', 'x', 'x', 'x', ' ', 'o'],
    ['o', 'o', 'o', 'o', 'o', 'o'],
    ['o', 'o', 'o', 'o', 'o', 'o'],
    ['o', 'o', 'o', 'o', 'o', 'o'],
    ['o', 'o', 'o', 'o', 'o', 'o'],
  ];

  value = master.evaluatePoints(points, master.id);
  expect(value).toBe(16000);

});


test('findAvailableMoves', () => {
  let master = new Master('x', 'easy', 'o');
  let points = [
    [' ', 'x', 'o'],
    ['x', 'x', ' '],
    [' ', 'o', 'o'],
  ];

  const moves = master.findAvailableMoves(points);
  expect(moves.length).toBe(3);
  expect(moves[0]).toEqual({ row: 0, column: 0 });
  expect(moves[1]).toEqual({ row: 1, column: 2 });
  expect(moves[2]).toEqual({ row: 2, column: 0 });
});


test('sortMoves', () => {

  let master = new Master('x', 'easy', 'o');
  let attacker = 'x';
  let defender = 'o';
  let moves = [];


  let points = [
    ['x', 'o', ' ', 'o', 'o', 'o'],
    ['x', 'x', 'x', 'x', ' ', ' '],
    ['o', 'o', 'x', 'o', 'o', 'o'],
    ['o', 'o', 'x', ' ', 'o', 'o'],
    ['o', 'o', ' ', 'o', ' ', 'o'],
    ['o', 'o', 'o', 'x', 'o', ' '],
  ];

  let reverse = false;
  moves = master.findAvailableMoves(points);

  expect(moves.length).toBe(7);
  console.time("sortMoves");
  master.sortMoves(points, moves, attacker, reverse);
  console.timeEnd("sortMoves");
  expect(moves[0]).toEqual({ row: 1, column: 4 });
  expect(moves[1]).toEqual({ row: 3, column: 3 });
  expect(moves[2]).toEqual({ row: 4, column: 4 });
  expect(moves[3]).toEqual({ row: 0, column: 2 });
  expect(moves[4]).toEqual({ row: 4, column: 2 });
  expect(moves[5]).toEqual({ row: 1, column: 5 });
  expect(moves[6]).toEqual({ row: 5, column: 5 });

  reverse = true;
  moves = master.findAvailableMoves(points);
  expect(moves.length).toBe(7);
  console.time("sortMoves");
  master.sortMoves(points, moves, attacker, reverse);
  console.timeEnd("sortMoves");

  expect(moves[6]).toEqual({ row: 1, column: 4 });
  expect(moves[5]).toEqual({ row: 3, column: 3 });
  expect(moves[4]).toEqual({ row: 4, column: 4 });
  expect(moves[3]).toEqual({ row: 4, column: 2 });
  expect(moves[2]).toEqual({ row: 0, column: 2 });
  expect(moves[1]).toEqual({ row: 1, column: 5 });
  expect(moves[0]).toEqual({ row: 5, column: 5 });
});

test('oooox', () => {
  let master = new Master('x', 'easy', 'o');
  let attacker = 'x';
  let defender = 'o';
  // let points = [
  //   [' ', ' ', ' ', ' ', ' ', ' '],
  //   [' ', ' ', ' ', ' ', ' ', ' '],
  //   [' ', ' ', ' ', ' ', ' ', ' '],
  //   [' ', ' ', ' ', ' ', ' ', ' '],
  //   [' ', ' ', ' ', ' ', ' ', ' '],
  //   [' ', ' ', 'o', ' ', ' ', ' '],
  // ];
  let points = [
    ['o', 'o', 'x', 'o', 'o', 'o'],
    ['x', 'x', 'x', 'x', ' ', 'o'],
    ['o', 'o', 'x', 'o', 'o', 'o'],
    ['o', 'o', 'o', 'x', 'o', 'o'],
    ['x', 'x', 'x', 'o', 'x', 'x'],
    ['o', 'o', 'x', 'o', 'o', 'o'],
  ];

  let value = master.minMax(points, attacker, attacker, defender, {
    row: 1,
    column: 4
  }, master.depth, Number.NEGATIVE_INFINITY, Number.POSITIVE_INFINITY);
  expect(value).toBe(499995);

  points = [
    ['o', 'o', 'x', 'o', 'o', 'o'],
    [' ', 'x', 'x', 'x', 'x', 'o'],
    ['o', 'o', 'x', 'o', 'o', 'o'],
    ['o', 'o', 'o', 'x', 'o', 'o'],
    ['x', 'x', 'x', 'o', 'x', 'x'],
    ['o', 'o', 'x', 'o', 'o', 'o'],
  ];

  value = master.minMax(points, attacker, attacker, defender, {
    row: 1,
    column: 0
  }, 1, Number.NEGATIVE_INFINITY, Number.POSITIVE_INFINITY);
  expect(value).toBe(499995);

  points = [
    ['o', 'o', 'x', 'o', 'o', 'o'],
    [' ', 'x', 'x', 'x', 'x', 'o'],
    ['o', 'o', 'x', 'o', 'o', 'o'],
    ['o', 'o', 'o', 'x', 'o', 'o'],
    ['x', 'x', 'x', 'o', 'x', 'x'],
    ['o', 'o', 'x', 'o', 'o', 'o'],
  ];

  value = master.minMax(points, attacker, attacker, defender, {
    row: 1,
    column: 0
  }, master.depth, Number.NEGATIVE_INFINITY, Number.POSITIVE_INFINITY);
  expect(value).toBe(499995);


  points = [
    ['o', 'o', 'x', 'o', 'o', 'o'],
    [' ', 'x', 'x', 'x', ' ', 'o'],
    ['o', 'o', 'x', 'o', 'o', 'o'],
    ['o', 'o', 'o', 'x', 'o', 'o'],
    ['x', 'x', 'x', 'o', 'x', 'x'],
    ['o', 'o', 'x', 'o', 'o', 'o'],
  ];

  value = master.minMax(points, attacker, attacker, defender, {
    row: 2,
    column: 2
  }, master.depth, Number.NEGATIVE_INFINITY, Number.POSITIVE_INFINITY);
  expect(value).toBe(0);
});


test('xooox', () => {
  let master = new Master('x', 'easy', 'o');
  let attacker = 'x';
  let defender = 'o';
  let points = [
    ['o', 'o', 'o', 'o', 'o', 'o'],
    [' ', 'x', 'x', 'x', ' ', 'o'],
    ['o', 'o', 'o', 'o', 'o', 'o'],
    ['o', 'o', 'o', 'o', 'o', 'o'],
    ['o', 'o', 'o', 'o', ' ', 'o'],
    ['o', 'o', 'o', 'o', 'o', 'o'],
  ];

  let value2 = master.minMax(points, attacker, attacker, defender, {
    row: 1,
    column: 0
  }, master.depth, Number.NEGATIVE_INFINITY, Number.POSITIVE_INFINITY);
  let value3 = master.minMax(points, attacker, attacker, defender, {
    row: 1,
    column: 4
  }, master.depth, Number.NEGATIVE_INFINITY, Number.POSITIVE_INFINITY);
  let value4 = master.minMax(points, attacker, attacker, defender, {
    row: 4,
    column: 4
  }, master.depth, Number.NEGATIVE_INFINITY, Number.POSITIVE_INFINITY);

  expect(value3).toEqual(value2);
});


test('minMax', () => {
  let master = new Master('x', 'easy', 'o');
  let attacker = 'x';
  let defender = 'o';

  let points = [
    [' ', ' ', ' ', ' ', ' ', ' '],
    [' ', ' ', ' ', ' ', ' ', ' '],
    [' ', ' ', ' ', ' ', ' ', ' '],
    [' ', ' ', ' ', ' ', ' ', ' '],
    [' ', ' ', ' ', ' ', ' ', ' '],
    [' ', ' ', 'o', ' ', ' ', ' '],
  ];

  let value2 = master.minMax(points, attacker, attacker, defender, {
    row: 2,
    column: 0
  }, master.depth, Number.NEGATIVE_INFINITY, Number.POSITIVE_INFINITY);
  let value3 = master.minMax(points, attacker, attacker, defender, {
    row: 2,
    column: 3
  }, master.depth, Number.NEGATIVE_INFINITY, Number.POSITIVE_INFINITY);
  let value4 = master.minMax(points, attacker, attacker, defender, {
    row: 3,
    column: 3
  }, master.depth, Number.NEGATIVE_INFINITY, Number.POSITIVE_INFINITY);

  expect(value3).toBeGreaterThan(value2);
  expect(value4).toBeGreaterThan(value3);


  points = [
    [' ', ' ', ' ', ' ', ' ', ' '],
    [' ', ' ', ' ', ' ', ' ', ' '],
    [' ', ' ', ' ', 'x', ' ', ' '],
    [' ', ' ', ' ', 'x', ' ', ' '],
    [' ', ' ', ' ', ' ', 'x', ' '],
    [' ', ' ', ' ', ' ', ' ', ' '],
  ];

  value2 = master.minMax(points, attacker, attacker, defender, {
    row: 1,
    column: 3
  }, master.depth, Number.NEGATIVE_INFINITY, Number.POSITIVE_INFINITY);
  value3 = master.minMax(points, attacker, attacker, defender, {
    row: 1,
    column: 1
  }, master.depth, Number.NEGATIVE_INFINITY, Number.POSITIVE_INFINITY);
  value4 = master.minMax(points, attacker, attacker, defender, {
    row: 4,
    column: 3
  }, master.depth, Number.NEGATIVE_INFINITY, Number.POSITIVE_INFINITY);
  expect(value4).toBeGreaterThan(value2);
  expect(value2).toBeGreaterThan(value3);


  points = [
    [' ', ' ', ' ', ' ', ' ', ' '],
    [' ', 'o', 'x', 'x', 'x', ' '],
    [' ', ' ', 'o', 'x', ' ', ' '],
    [' ', ' ', 'o', 'o', 'o', ' '],
    [' ', ' ', ' ', ' ', ' ', ' '],
    [' ', ' ', ' ', ' ', ' ', ' '],
  ];

  value2 = master.minMax(points, attacker, attacker, defender, {
    row: 2,
    column: 1
  }, master.depth, Number.NEGATIVE_INFINITY, Number.POSITIVE_INFINITY);
  value3 = master.minMax(points, attacker, attacker, defender, {
    row: 0,
    column: 3
  }, master.depth, Number.NEGATIVE_INFINITY, Number.POSITIVE_INFINITY);
  expect(value3).toBeGreaterThan(value2);

  points = [
    [' ', ' ', ' ', ' ', 'o', ' '],
    [' ', 'x', ' ', ' ', ' ', ' '],
    ['o', 'o', 'x', ' ', ' ', ' '],
    [' ', 'o', ' ', ' ', ' ', ' '],
    [' ', ' ', 'x', ' ', ' ', ' '],
    [' ', ' ', ' ', ' ', ' ', ' '],
  ];

  value2 = master.minMax(points, attacker, attacker, defender, {
    row: 3,
    column: 2
  }, master.depth, Number.NEGATIVE_INFINITY, Number.POSITIVE_INFINITY);
  value3 = master.minMax(points, attacker, attacker, defender, {
    row: 4,
    column: 1
  }, master.depth, Number.NEGATIVE_INFINITY, Number.POSITIVE_INFINITY);
  expect(value2).toBeGreaterThan(value3);

});


test('minMax easy vs normal 1', () => {
  let master = new Master('x', 'easy', 'o');
  let normalMaster = new Master('x', 'normal', 'o');
  let attacker = 'x';
  let defender = 'o';


  let points = [
    [' ', ' ', ' ', ' ', ' ', ' '],
    [' ', ' ', ' ', ' ', ' ', ' '],
    [' ', ' ', 'x', 'x', ' ', ' '],
    [' ', ' ', ' ', 'x', ' ', ' '],
    [' ', ' ', ' ', ' ', 'x', ' '],
    [' ', ' ', ' ', ' ', ' ', ' '],
  ];

  let value2 = master.minMax(points, attacker, attacker, defender, {
    row: 1,
    column: 3
  }, master.depth, Number.NEGATIVE_INFINITY, Number.POSITIVE_INFINITY);
  let value3 = master.minMax(points, attacker, attacker, defender, {
    row: 1,
    column: 1
  }, master.depth, Number.NEGATIVE_INFINITY, Number.POSITIVE_INFINITY);
  let value4 = master.minMax(points, attacker, attacker, defender, {
    row: 4,
    column: 3
  }, master.depth, Number.NEGATIVE_INFINITY, Number.POSITIVE_INFINITY);
  expect(value2).toBeGreaterThan(value4);
  expect(value3).toBeGreaterThan(value2);
  expect(value3).toBeGreaterThan(value4);

  value2 = normalMaster.minMax(points, attacker, attacker, defender, {
    row: 1,
    column: 3
  }, master.depth, Number.NEGATIVE_INFINITY, Number.POSITIVE_INFINITY);
  value3 = normalMaster.minMax(points, attacker, attacker, defender, {
    row: 1,
    column: 1
  }, master.depth, Number.NEGATIVE_INFINITY, Number.POSITIVE_INFINITY);
  value4 = normalMaster.minMax(points, attacker, attacker, defender, {
    row: 4,
    column: 3
  }, master.depth, Number.NEGATIVE_INFINITY, Number.POSITIVE_INFINITY);
  expect(value2).toBeGreaterThan(value4);
  expect(value3).toBeGreaterThan(value2);
  expect(value3).toBeGreaterThan(value4);


});


test('minMax easy vs normal 2', () => {

  let attacker = 'x';
  let defender = 'o';


  let points = [
    [' ', ' ', ' ', ' ', ' ', ' '],
    [' ', ' ', ' ', 'o', ' ', ' '],
    [' ', 'o', ' ', 'o', ' ', ' '],
    [' ', 'x', 'x', 'x', 'o', ' '],
    [' ', 'o', 'x', ' ', ' ', ' '],
    [' ', ' ', ' ', ' ', ' ', ' '],
  ];

  let master = new Master('x', 'easy', 'o');
  let value2 = master.minMax(points, attacker, attacker, defender, {
    row: 2,
    column: 4
  }, master.depth, Number.NEGATIVE_INFINITY, Number.POSITIVE_INFINITY);
  let value3 = master.minMax(points, attacker, attacker, defender, {
    row: 2,
    column: 2
  }, master.depth, Number.NEGATIVE_INFINITY, Number.POSITIVE_INFINITY);
  expect(value3).toBeGreaterThan(value2);

  master = new Master('x', 'normal', 'o');

  value2 = master.minMax(points, attacker, attacker, defender, {
    row: 2,
    column: 4
  }, master.depth, Number.NEGATIVE_INFINITY, Number.POSITIVE_INFINITY);
  value3 = master.minMax(points, attacker, attacker, defender, {
    row: 2,
    column: 2
  }, master.depth, Number.NEGATIVE_INFINITY, Number.POSITIVE_INFINITY);
  expect(value3).toBeGreaterThan(value2);

});

test('generateLegalMoves', () => {
  let master = new Master('x', 'normal', 'o');
  let attacker = 'x';
  let defender = 'o';

  let points = [
    [' ', ' ', ' ', ' ', ' ', ' '],
    [' ', ' ', ' ', ' ', ' ', ' '],
    [' ', 'o', 'o', ' ', ' ', 'o'],
    [' ', 'x', 'x', ' ', ' ', ' '],
    [' ', ' ', ' ', ' ', ' ', ' '],
    [' ', ' ', ' ', ' ', ' ', ' '],
  ];

  let bestMoves = [{ row: 2, column: 0 }, { row: 2, column: 3 }, { row: 3, column: 3 }];

  const moves = master.generateLegalMoves(points, attacker, defender);
  expect(moves).toEqual(expect.arrayContaining(bestMoves));
});

test('findBestMove normal vs hard', () => {
  let normalMaster = new Master('x', 'normal', 'o');
  let hardMaster = new Master('x', 'hard', 'o');
  let attacker = 'x';
  let defender = 'o';
  let points = [
    [' ', ' ', ' ', ' ', ' ', ' '],
    [' ', ' ', ' ', ' ', ' ', ' '],
    [' ', 'o', 'o', 'o', 'o', ' '],
    [' ', 'x', 'x', 'x', ' ', ' '],
    [' ', ' ', ' ', ' ', ' ', ' '],
    [' ', ' ', ' ', ' ', ' ', ' '],
  ];

  let normalBestMove = normalMaster.findBestMove(points, attacker, defender);
  expect(normalBestMove).toEqual({ row: 2, column: 0 });
  let hardBestMove = hardMaster.findBestMove(points, attacker, defender);
  expect(hardBestMove).toEqual({ row: 2, column: 0 });

  points = [
    ['o', 'o', 'x', 'o', 'o', 'o'],
    ['o', 'x', 'x', 'x', ' ', 'o'],
    ['x', ' ', 'o', 'o', 'o', 'o'],
    ['o', 'o', 'x', 'x', ' ', 'x'],
    ['o', 'o', 'o', 'o', 'x', 'o'],
    ['o', 'o', 'x', 'o', 'o', 'o'],
  ];

  normalBestMove = normalMaster.findBestMove(points, attacker, defender);
  expect(normalBestMove).toEqual({ row: 2, column: 1 });
  hardBestMove = hardMaster.findBestMove(points, attacker, defender);
  expect(hardBestMove).toEqual({ row: 2, column: 1 });

  points = [
    [' ', ' ', ' ', ' ', ' ', ' '],
    [' ', ' ', ' ', ' ', ' ', ' '],
    [' ', 'o', 'o', ' ', ' ', 'o'],
    [' ', 'x', 'x', ' ', ' ', ' '],
    [' ', ' ', ' ', ' ', ' ', ' '],
    [' ', ' ', ' ', ' ', ' ', ' '],
  ];

  normalBestMove = normalMaster.findBestMove(points, attacker, defender);
  expect(normalBestMove).toEqual({ row: 2, column: 3 });
  hardBestMove = hardMaster.findBestMove(points, attacker, defender);
  expect(hardBestMove).toEqual({ row: 3, column: 0 });


  points = [
    [' ', ' ', ' ', ' ', 'o', ' '],
    [' ', 'x', ' ', ' ', ' ', ' '],
    ['o', 'o', 'x', ' ', ' ', ' '],
    [' ', 'o', ' ', ' ', ' ', ' '],
    [' ', ' ', 'x', ' ', ' ', ' '],
    [' ', ' ', ' ', ' ', ' ', ' '],
  ];

  normalBestMove = normalMaster.findBestMove(points, attacker, defender);
  expect(normalBestMove).toEqual({ row: 0, column: 0 });
  hardBestMove = hardMaster.findBestMove(points, attacker, defender);
  expect(hardBestMove).toEqual({ row: 0, column: 0 });
});
