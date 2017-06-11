/**
 * Created by Xin on 28/05/2017.
 */
test('generatePattern', () => {
  let board = new Board(15);
  let master = new Master({
    id: 'x',
    level: 'easy',
    opponentId: 'o',
    board,
  });

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
  let board = new Board(15);
  let master = new Master({
    id: 'x',
    level: 'easy',
    opponentId: 'o',
    board,
  });

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
  let board = new Board(15);
  let master = new Master({
    id: 'x',
    level: 'easy',
    opponentId: 'o',
    board,
  });
  let ooooo = master.evaluatePattern('ooooo');
  let xoooxx = master.evaluatePattern('xoooxx');
  let oooxxx = master.evaluatePattern('oooxxx');
  let oxooxx = master.evaluatePattern('oxooxx');
  let oooxx = master.evaluatePattern('oooxx');
  let xxoxo = master.evaluatePattern('xxoxo');

  expect(ooooo).toBeGreaterThan(xoooxx);
  expect(xoooxx).toBeGreaterThan(oxooxx);
  expect(xoooxx).toBeGreaterThan(oooxx);
  expect(oooxx).toEqual(oxooxx);
  expect(oooxxx).toEqual(oxooxx);
});


test('evaluatePoint', () => {
  let board = new Board(15);
  let master = new Master({
    id: 'x',
    level: 'easy',
    opponentId: 'o',
    board,
  });

  let points = [
    [' ', ' ', ' ', ' ', ' ', ' '],
    [' ', ' ', ' ', 'x', ' ', 'o'],
    [' ', 'o', ' ', '√', ' ', ' '],
    [' ', ' ', ' ', 'x', ' ', ' '],
    [' ', ' ', ' ', ' ', ' ', 'x'],
    ['o', 'o', 'o', ' ', ' ', ' '],
  ];

  let pattern = master.generatePattern(points, 2, 3, 0, 1, master.id);
  expect(pattern).toEqual('xoxx');
  expect(master.evaluatePattern(pattern)).toEqual(0);
  pattern = master.generatePattern(points, 2, 3, 1, 0, master.id);
  expect(master.evaluatePattern(pattern)).toEqual(720);
  pattern = master.generatePattern(points, 2, 3, 1, 1, master.id);
  expect(pattern).toEqual('xxoxo');
  expect(master.evaluatePattern(pattern)).toEqual(0);
  pattern = master.generatePattern(points, 2, 3, 1, -1, master.id);
  expect(pattern).toEqual('xxoxx');
  expect(master.evaluatePattern(pattern)).toEqual(0);
  let value = master.evaluatePoint(points, 2, 3, master.id);
  expect(value).toBe(720);


  points = [
    ['x', 'o', ' ', 'o', 'o', 'o'],
    ['x', 'x', 'x', 'x', ' ', ' '],
    ['o', 'o', 'x', 'o', 'o', 'o'],
    ['o', 'o', 'x', ' ', 'o', 'o'],
    ['o', 'o', ' ', 'o', ' ', 'o'],
    ['o', 'o', 'o', 'o', 'o', ' '],
  ];
  value = master.evaluatePoint(points, 4, 4, master.id);
  expect(value).toBe(720);
  value = master.evaluatePoint(points, 1, 5, master.id);
  expect(value).toBe(720);


  points = [
    ['o', 'o', 'o', 'o', 'o', 'o'],
    [' ', 'x', 'x', 'x', ' ', 'o'],
    ['o', 'o', 'o', 'o', 'o', 'o'],
    ['o', 'o', 'o', 'o', 'o', 'o'],
    ['o', 'o', 'o', 'o', 'o', 'o'],
    ['o', 'o', 'o', 'o', 'o', 'o'],
  ];

  value = master.evaluatePoint(points, 1, 0, master.id);
  expect(value).toBe(720);
  value = master.evaluatePoint(points, 1, 4, master.id);
  expect(value).toBe(720);


  points = [
    ['o', 'o', 'o', 'o', 'o', 'o'],
    [' ', 'x', 'x', 'x', ' ', 'o'],
    ['o', 'o', 'o', 'o', 'o', 'o'],
    ['o', 'o', 'o', 'o', 'o', 'o'],
    ['o', 'o', 'o', 'o', 'o', 'o'],
    ['o', 'o', 'o', 'o', 'o', 'o'],
  ];

  value = master.evaluatePoint(points, 1, 0, master.id);
  expect(value).toBe(720);
  value = master.evaluatePoint(points, 1, 4, master.id);
  expect(value).toBe(720);
});


test('evaluatePoints', () => {
  let board = new Board(15);
  let master = new Master({
    id: 'x',
    level: 'easy',
    opponentId: 'o',
    board,
  });


  let points = [
    ['x', 'x', 'x', 'x', ' ', ' '],
    [' ', ' ', ' ', ' ', ' ', ' '],
    [' ', 'o', ' ', ' ', ' ', ' '],
    [' ', ' ', ' ', ' ', ' ', ' '],
    [' ', ' ', ' ', ' ', ' ', ' '],
    ['o', 'o', 'o', ' ', ' ', ' '],
  ];

  let value = master.evaluatePoints(points, master.id);
  expect(value).toBe(2880);


  points = [
    ['x', 'x', 'x', ' ', ' ', ' '],
    [' ', ' ', ' ', ' ', ' ', ' '],
    [' ', 'o', ' ', ' ', ' ', ' '],
    [' ', ' ', ' ', ' ', ' ', ' '],
    [' ', ' ', ' ', ' ', ' ', ' '],
    ['o', 'o', 'o', ' ', ' ', ' '],
  ];

  value = master.evaluatePoints(points, master.id);
  expect(value).toBe(0);


  points = [
    [' ', ' ', ' ', ' ', ' ', ' '],
    [' ', ' ', ' ', ' ', ' ', ' '],
    [' ', ' ', 'x', ' ', ' ', ' '],
    [' ', ' ', ' ', 'x', ' ', ' '],
    [' ', ' ', ' ', ' ', ' ', ' '],
    ['o', 'o', ' ', ' ', ' ', ' '],
  ];

  value = master.evaluatePoints(points, master.id);
  expect(value).toBe(1520);

  points = [
    [' ', ' ', ' ', ' ', ' ', ' '],
    [' ', ' ', ' ', 'x', ' ', 'o'],
    [' ', 'o', ' ', 'x', ' ', ' '],
    [' ', ' ', ' ', 'x', ' ', ' '],
    [' ', ' ', ' ', ' ', ' ', 'x'],
    ['o', 'o', 'o', ' ', ' ', ' '],
  ];

  value = master.evaluatePoints(points, master.id);
  expect(value).toBe(2200);


  points = [
    ['x', 'o', ' ', 'o', 'o', 'o'],
    ['x', 'x', 'x', 'x', ' ', ' '],
    ['o', 'o', 'x', 'o', 'o', 'o'],
    ['o', 'o', 'x', ' ', 'o', 'o'],
    ['o', 'o', ' ', 'o', ' ', 'o'],
    ['o', 'o', 'o', 'o', 'o', ' '],
  ];
  value = master.evaluatePoints(points, master.id);
  expect(value).toBe(-255760);


  points = [
    ['o', 'o', 'o', 'o', 'o', 'o'],
    [' ', 'x', 'x', 'x', ' ', 'o'],
    ['o', 'o', 'o', 'o', 'o', 'o'],
    ['o', 'o', 'o', 'o', 'o', 'o'],
    ['o', 'o', 'o', 'o', 'o', 'o'],
    ['o', 'o', 'o', 'o', 'o', 'o'],
  ];

  value = master.evaluatePoints(points, master.id);
  expect(value).toBe(-2070160);


  points = [
    ['o', 'o', 'o', 'o', 'o', 'o'],
    [' ', 'x', 'x', 'x', 'x', 'o'],
    ['o', 'o', 'o', 'o', 'o', 'o'],
    ['o', 'o', 'o', 'o', 'o', 'o'],
    ['o', 'o', 'o', 'o', 'o', 'o'],
    ['o', 'o', 'o', 'o', 'o', 'o'],
  ];

  value = master.evaluatePoints(points, master.id);
  expect(value).toBe(-2055760);

  points = [
    ['o', 'o', 'o', 'o', 'o', 'o'],
    ['x', 'x', 'x', 'x', ' ', 'o'],
    ['o', 'o', 'o', 'o', 'o', 'o'],
    ['o', 'o', 'o', 'o', 'o', 'o'],
    ['o', 'o', 'o', 'o', 'o', 'o'],
    ['o', 'o', 'o', 'o', 'o', 'o'],
  ];

  value = master.evaluatePoints(points, master.id);
  expect(value).toBe(-2058640);

});


test('oooox', () => {
  let board = new Board(15);
  let master = new Master({
    id: 'x',
    level: 'easy',
    opponentId: 'o',
    board,
  });

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

  let value = master.minMax(points, 'x', {
    row: 1,
    column: 4
  }, master.depth, Number.NEGATIVE_INFINITY, Number.POSITIVE_INFINITY);
  expect(value).toBe(250000);

  points = [
    ['o', 'o', 'x', 'o', 'o', 'o'],
    [' ', 'x', 'x', 'x', 'x', 'o'],
    ['o', 'o', 'x', 'o', 'o', 'o'],
    ['o', 'o', 'o', 'x', 'o', 'o'],
    ['x', 'x', 'x', 'o', 'x', 'x'],
    ['o', 'o', 'x', 'o', 'o', 'o'],
  ];

  value = master.minMax(points, 'x', {
    row: 1,
    column: 0
  }, 1, Number.NEGATIVE_INFINITY, Number.POSITIVE_INFINITY);
  expect(value).toBe(250000);

  points = [
    ['o', 'o', 'x', 'o', 'o', 'o'],
    [' ', 'x', 'x', 'x', 'x', 'o'],
    ['o', 'o', 'x', 'o', 'o', 'o'],
    ['o', 'o', 'o', 'x', 'o', 'o'],
    ['x', 'x', 'x', 'o', 'x', 'x'],
    ['o', 'o', 'x', 'o', 'o', 'o'],
  ];

  value = master.minMax(points, 'x', {
    row: 1,
    column: 0
  }, master.depth, Number.NEGATIVE_INFINITY, Number.POSITIVE_INFINITY);
  expect(value).toBe(250000);


  points = [
    ['o', 'o', 'x', 'o', 'o', 'o'],
    [' ', 'x', 'x', 'x', ' ', 'o'],
    ['o', 'o', 'x', 'o', 'o', 'o'],
    ['o', 'o', 'o', 'x', 'o', 'o'],
    ['x', 'x', 'x', 'o', 'x', 'x'],
    ['o', 'o', 'x', 'o', 'o', 'o'],
  ];

  value = master.minMax(points, 'x', {
    row: 2,
    column: 2
  }, master.depth, Number.NEGATIVE_INFINITY, Number.POSITIVE_INFINITY);
  expect(value).toBe(2880);
});


test('xooox', () => {
  let board = new Board(15);
  let master = new Master({
    id: 'x',
    level: 'easy',
    opponentId: 'o',
    board,
  });

  let points = [
    ['o', 'o', 'o', 'o', 'o', 'o'],
    [' ', 'x', 'x', 'x', ' ', 'o'],
    ['o', 'o', 'o', 'o', 'o', 'o'],
    ['o', 'o', 'o', 'o', 'o', 'o'],
    ['o', 'o', 'o', 'o', ' ', 'o'],
    ['o', 'o', 'o', 'o', 'o', 'o'],
  ];

  let value2 = master.minMax(points, 'x', {
    row: 1,
    column: 0
  }, master.depth, Number.NEGATIVE_INFINITY, Number.POSITIVE_INFINITY);
  let value3 = master.minMax(points, 'x', {
    row: 1,
    column: 4
  }, master.depth, Number.NEGATIVE_INFINITY, Number.POSITIVE_INFINITY);
  let value4 = master.minMax(points, 'x', {
    row: 4,
    column: 4
  }, master.depth, Number.NEGATIVE_INFINITY, Number.POSITIVE_INFINITY);

  expect(value3).toBeGreaterThan(value2);
});


test('minMax', () => {
  let board = new Board(15);
  let master = new Master({
    id: 'x',
    level: 'hard',
    opponentId: 'o',
    board,
  });


  let points = [
    [' ', ' ', ' '],
    [' ', 'o', ' '],
    [' ', ' ', ' '],
  ];

  let value2 = master.minMax(points, 'x', {
    row: 2,
    column: 0
  }, master.depth, Number.NEGATIVE_INFINITY, Number.POSITIVE_INFINITY);


  // let points = [
  //   [' ', ' ', ' ', ' ', ' ', ' '],
  //   [' ', ' ', ' ', ' ', ' ', ' '],
  //   [' ', ' ', ' ', ' ', ' ', ' '],
  //   [' ', ' ', ' ', ' ', ' ', ' '],
  //   [' ', ' ', ' ', ' ', ' ', ' '],
  //   [' ', ' ', 'o', ' ', ' ', ' '],
  // ];
  //
  // let value2 = master.minMax(points, 'x', {
  //   row: 2,
  //   column: 0
  // }, master.depth, Number.NEGATIVE_INFINITY, Number.POSITIVE_INFINITY);
  // let value3 = master.minMax(points, 'x', {
  //   row: 2,
  //   column: 3
  // }, master.depth, Number.NEGATIVE_INFINITY, Number.POSITIVE_INFINITY);
  // let value4 = master.minMax(points, 'x', {
  //   row: 3,
  //   column: 3
  // }, master.depth, Number.NEGATIVE_INFINITY, Number.POSITIVE_INFINITY);
  //
  // expect(value3).toBeGreaterThan(value2);
  // expect(value4).toBeGreaterThan(value3);
  //
  //
  // points = [
  //   [' ', ' ', ' ', ' ', ' ', ' '],
  //   [' ', ' ', ' ', ' ', ' ', ' '],
  //   [' ', ' ', ' ', 'x', ' ', ' '],
  //   [' ', ' ', ' ', 'x', ' ', ' '],
  //   [' ', ' ', ' ', ' ', 'x', ' '],
  //   [' ', ' ', ' ', ' ', ' ', ' '],
  // ];
  //
  // value2 = master.minMax(points, 'x', {
  //   row: 1,
  //   column: 3
  // }, master.depth, Number.NEGATIVE_INFINITY, Number.POSITIVE_INFINITY);
  // value3 = master.minMax(points, 'x', {
  //   row: 1,
  //   column: 1
  // }, master.depth, Number.NEGATIVE_INFINITY, Number.POSITIVE_INFINITY);
  // value4 = master.minMax(points, 'x', {
  //   row: 4,
  //   column: 3
  // }, master.depth, Number.NEGATIVE_INFINITY, Number.POSITIVE_INFINITY);
  // expect(value4).toBeGreaterThan(value2);
  // expect(value2).toBeGreaterThan(value3);
  //
  //
  // points = [
  //   [' ', ' ', ' ', ' ', ' ', ' '],
  //   [' ', 'o', 'x', 'x', 'x', ' '],
  //   [' ', ' ', 'o', 'x', ' ', ' '],
  //   [' ', ' ', 'o', 'o', 'o', ' '],
  //   [' ', ' ', ' ', ' ', ' ', ' '],
  //   [' ', ' ', ' ', ' ', ' ', ' '],
  // ];
  //
  // value2 = master.minMax(points, 'x', {
  //   row: 2,
  //   column: 1
  // }, master.depth, Number.NEGATIVE_INFINITY, Number.POSITIVE_INFINITY);
  // value3 = master.minMax(points, 'x', {
  //   row: 0,
  //   column: 3
  // }, master.depth, Number.NEGATIVE_INFINITY, Number.POSITIVE_INFINITY);
  // expect(value3).toEqual(value2);
  //
  // points = [
  //   [' ', ' ', ' ', ' ', 'o', ' '],
  //   [' ', 'x', ' ', ' ', ' ', ' '],
  //   ['o', 'o', 'x', ' ', ' ', ' '],
  //   [' ', 'o', ' ', ' ', ' ', ' '],
  //   [' ', ' ', 'x', ' ', ' ', ' '],
  //   [' ', ' ', ' ', ' ', ' ', ' '],
  // ];
  //
  // value2 = master.minMax(points, 'x', {
  //   row: 3,
  //   column: 2
  // }, master.depth, Number.NEGATIVE_INFINITY, Number.POSITIVE_INFINITY);
  // value3 = master.minMax(points, 'x', {
  //   row: 4,
  //   column: 1
  // }, master.depth, Number.NEGATIVE_INFINITY, Number.POSITIVE_INFINITY);
  // expect(value2).toBeGreaterThan(value3);

});


test('minMax easy vs normal 1', () => {
  let board = new Board(15);
  let master = new Master({
    id: 'x',
    level: 'easy',
    opponentId: 'o',
    board,
  });
  let normalMaster = new Master({
    id: 'x',
    level: 'normal',
    opponentId: 'o',
    board,
  });


  let points = [
    [' ', ' ', ' ', ' ', ' ', ' '],
    [' ', ' ', ' ', ' ', ' ', ' '],
    [' ', ' ', 'x', 'x', ' ', ' '],
    [' ', ' ', ' ', 'x', ' ', ' '],
    [' ', ' ', ' ', ' ', 'x', ' '],
    [' ', ' ', ' ', ' ', ' ', ' '],
  ];

  let value2 = master.minMax(points, 'x', {
    row: 1,
    column: 3
  }, master.depth, Number.NEGATIVE_INFINITY, Number.POSITIVE_INFINITY);
  let value3 = master.minMax(points, 'x', {
    row: 1,
    column: 1
  }, master.depth, Number.NEGATIVE_INFINITY, Number.POSITIVE_INFINITY);
  let value4 = master.minMax(points, 'x', {
    row: 4,
    column: 3
  }, master.depth, Number.NEGATIVE_INFINITY, Number.POSITIVE_INFINITY);
  expect(value2).toBeGreaterThan(value4);
  expect(value3).toBeGreaterThan(value2);
  expect(value3).toBeGreaterThan(value4);

  value2 = normalMaster.minMax(points, 'x', {
    row: 1,
    column: 3
  }, master.depth, Number.NEGATIVE_INFINITY, Number.POSITIVE_INFINITY);
  value3 = normalMaster.minMax(points, 'x', {
    row: 1,
    column: 1
  }, master.depth, Number.NEGATIVE_INFINITY, Number.POSITIVE_INFINITY);
  value4 = normalMaster.minMax(points, 'x', {
    row: 4,
    column: 3
  }, master.depth, Number.NEGATIVE_INFINITY, Number.POSITIVE_INFINITY);
  expect(value2).toBeGreaterThan(value4);
  expect(value3).toBeGreaterThan(value2);
  expect(value3).toBeGreaterThan(value4);


});


test('minMax easy vs normal 2', () => {


  let board = new Board(15);

  let points = [
    [' ', ' ', ' ', ' ', ' ', ' '],
    [' ', ' ', ' ', 'o', ' ', ' '],
    [' ', 'o', ' ', 'o', ' ', ' '],
    [' ', 'x', 'x', 'x', 'o', ' '],
    [' ', 'o', 'x', ' ', ' ', ' '],
    [' ', ' ', ' ', ' ', ' ', ' '],
  ];

  let master = new Master({
    id: 'x',
    level: 'easy',
    opponentId: 'o',
    board,
  });
  let value2 = master.minMax(points, 'x', {
    row: 2,
    column: 4
  }, master.depth, Number.NEGATIVE_INFINITY, Number.POSITIVE_INFINITY);
  let value3 = master.minMax(points, 'x', {
    row: 2,
    column: 2
  }, master.depth, Number.NEGATIVE_INFINITY, Number.POSITIVE_INFINITY);
  expect(value3).toBeGreaterThan(value2);

  master = new Master({
    id: 'x',
    level: 'normal',
    opponentId: 'o',
    board,
  });

  value2 = master.minMax(points, 'x', {
    row: 2,
    column: 4
  }, master.depth, Number.NEGATIVE_INFINITY, Number.POSITIVE_INFINITY);
  value3 = master.minMax(points, 'x', {
    row: 2,
    column: 2
  }, master.depth, Number.NEGATIVE_INFINITY, Number.POSITIVE_INFINITY);
  expect(value2).toBeGreaterThan(value3);

});

test('generateLegalMoves', () => {
  let board = new Board(15);
  let master = new Master({
    id: 'x',
    level: 'normal',
    opponentId: 'o',
    board,
  });


  let points = [
    [' ', ' ', ' ', ' ', ' ', ' '],
    [' ', ' ', ' ', ' ', ' ', ' '],
    [' ', 'o', 'o', ' ', ' ', 'o'],
    [' ', 'x', 'x', ' ', ' ', ' '],
    [' ', ' ', ' ', ' ', ' ', ' '],
    [' ', ' ', ' ', ' ', ' ', ' '],
  ];

  let bestMoves = [
    { row: 2, column: 0 },
    { row: 2, column: 3 },
    { row: 3, column: 3 },
  ];

  let moves = master.generateLegalMoves(points);
  expect(moves).toEqual(expect.arrayContaining(bestMoves));

  points = [
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

  bestMoves = [
    { column: 6, row: 6 },
    { column: 7, row: 6 },
    { column: 8, row: 6 },
    { column: 6, row: 7 },
    { column: 8, row: 7 },
    { column: 6, row: 8 },
    { column: 7, row: 8 },
    { column: 8, row: 8 }
  ];
  moves = master.generateLegalMoves(points);
  expect(moves).toEqual(expect.arrayContaining(bestMoves));
});

test('findBestMove normal vs hard', () => {
  let board = new Board(15);
  let easyMaster = new Master({
    id: 'x',
    level: 'easy',
    opponentId: 'o',
    board,
  });
  let normalMaster = new Master({
    id: 'x',
    level: 'normal',
    opponentId: 'o',
    board,
  });
  let hardMaster = new Master({
    id: 'x',
    level: 'hard',
    opponentId: 'o',
    board,
  });
  let points = [
    [' ', ' ', ' ', ' ', ' ', ' '],
    [' ', ' ', ' ', ' ', ' ', ' '],
    [' ', 'o', 'o', 'o', 'o', ' '],
    [' ', 'x', 'x', 'x', ' ', ' '],
    [' ', ' ', ' ', ' ', ' ', ' '],
    [' ', ' ', ' ', ' ', ' ', ' '],
  ];

  let normalBestMove = normalMaster.findBestMove(points);
  expect(normalBestMove).toEqual({ row: 2, column: 0 });
  let hardBestMove = hardMaster.findBestMove(points);
  expect(hardBestMove).toEqual({ row: 2, column: 0 });

  points = [
    ['o', 'o', 'x', 'o', 'o', 'o'],
    ['o', 'x', 'x', 'x', ' ', 'o'],
    ['x', ' ', 'o', 'o', 'o', 'o'],
    ['o', 'o', 'x', 'x', ' ', 'x'],
    ['o', 'o', 'o', 'o', 'x', 'o'],
    ['o', 'o', 'x', 'o', 'o', 'o'],
  ];

  normalBestMove = normalMaster.findBestMove(points);
  expect(normalBestMove).toEqual({ row: 2, column: 1 });
  hardBestMove = hardMaster.findBestMove(points);
  expect(hardBestMove).toEqual({ row: 2, column: 1 });

  points = [
    [' ', ' ', ' ', ' ', ' ', ' '],
    [' ', ' ', ' ', ' ', ' ', ' '],
    [' ', 'o', 'o', ' ', ' ', 'o'],
    [' ', 'x', 'x', ' ', ' ', ' '],
    [' ', ' ', ' ', ' ', ' ', ' '],
    [' ', ' ', ' ', ' ', ' ', ' '],
  ];

  normalBestMove = normalMaster.findBestMove(points);
  expect(normalBestMove).toEqual({ row: 3, column: 3 });
  hardBestMove = hardMaster.findBestMove(points);
  expect(hardBestMove).toEqual({ row: 3, column: 3 });


  points = [
    [' ', ' ', ' ', ' ', 'o', ' '],
    [' ', 'x', ' ', ' ', ' ', ' '],
    ['o', 'o', 'x', ' ', ' ', ' '],
    [' ', 'o', ' ', ' ', ' ', ' '],
    [' ', ' ', 'x', ' ', ' ', ' '],
    [' ', ' ', ' ', ' ', ' ', ' '],
  ];

  normalBestMove = normalMaster.findBestMove(points);
  expect(normalBestMove).toEqual({ row: 3, column: 3 });
  hardBestMove = hardMaster.findBestMove(points);
  expect(hardBestMove).toEqual({ row: 3, column: 3 });


  points = [
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


  // points = [
  //   [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
  //   [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
  //   [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
  //   [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
  //   [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
  //   [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
  //   [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
  //   [' ', ' ', ' ', ' ', ' ', ' ', ' ', 'o', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
  //   [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
  //   [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
  //   [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
  //   [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
  //   [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
  //   [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
  //   [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
  // ];


  console.time('easyMaster.findBestMove');
  easyBestMove = easyMaster.findBestMove(points);
  console.timeEnd('easyMaster.findBestMove');
  expect(easyBestMove).toEqual({ row: 6, column: 6 });
  console.time('normalMaster.findBestMove');
  normalBestMove = normalMaster.findBestMove(points);
  console.timeEnd('normalMaster.findBestMove');
  expect(normalBestMove).toEqual({ row: 10, column: 6 });
  console.time('hardMaster.findBestMove');
  hardBestMove = hardMaster.findBestMove(points);
  console.timeEnd('hardMaster.findBestMove');
  expect(hardBestMove).toEqual({ row: 10, column: 6 });
});
