/**
 * Created by Xin on 06/06/2017.
 */

test('zobristHash', () => {
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

  let zobristHash = new ZobristHash(15);
  let hash = zobristHash.hash(points);
  let depth = 8;
  let move = new Move(10, 6);
  let score = 1000;

  let entry = new TranspositionTableEntry({ hash, depth, score, move });

  let table = new TranspositionTable();
  table.addEntry(entry);

  let target = table.getEntry(hash);
  expect(target).toHaveProperty('hash', entry.hash);
  expect(target).toHaveProperty('depth', entry.depth);
  expect(target).toHaveProperty('move', entry.move);
  expect(target).toHaveProperty('score', entry.score);
  console.log('TranspositionTable.test.js => table', table.table.filter(e => e !== null))


});