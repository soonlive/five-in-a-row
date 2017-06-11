/**
 * Created by Xin on 28/05/2017.
 */
test('findSameRowPoints', () => {

  let board = new Board(6);

  let point = { row: 2, column: 0, playerId: 'o' };

  board.points = [
    [' ', ' ', ' ', ' ', ' ', ' '],
    [' ', ' ', ' ', ' ', ' ', ' '],
    ['o', 'o', 'o', 'o', 'o', ' '],
    [' ', 'x', 'x', 'x', ' ', ' '],
    [' ', ' ', ' ', ' ', ' ', ' '],
    [' ', ' ', ' ', ' ', ' ', ' '],
  ];

  let sameRowPoints = board.searchSameRowPointsWithLimitSize(point, 5);
  expect(sameRowPoints).toEqual(expect.arrayContaining([
    {row: 2, column: 0, playerId: 'o'},
    {row: 2, column: 1, playerId: 'o'},
    {row: 2, column: 2, playerId: 'o'},
    {row: 2, column: 3, playerId: 'o'},
    {row: 2, column: 4, playerId: 'o'},
  ]));


});
