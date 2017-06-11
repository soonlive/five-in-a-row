/**
 * Created by Xin on 06/06/2017.
 */

test('zobristHash', () => {
  let zobristHash = new ZobristHash(15);

  let points = [
    [' ', ' ', ' '],
    [' ', 'x', ' '],
    [' ', 'o', ' '],
  ];

  let hash = zobristHash.hash(points);

  points[0][1] = 'o';

  let newHash = zobristHash.hash(points);
  let xorHash = hash ^= zobristHash.zobristKey[0][1][0];
  expect(newHash).toEqual(xorHash);
  console.log('ZobristHash.test.js => newHash', newHash)


  points[0][1] = ' ';

  let undoHash = zobristHash.hash(points);
  let xorUndoHash = hash ^= zobristHash.zobristKey[0][1][0];
  expect(undoHash).toEqual(xorUndoHash);
  expect(hash).toEqual(xorUndoHash);
});