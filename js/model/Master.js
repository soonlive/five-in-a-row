/**
 * Created by Xin on 28/05/2017.
 */

class Master extends Player {

  constructor({ id, level, opponentId, board }) {
    super({ id });

    this.setLevel(level);

    this.opponentId = opponentId;

    this.scores = {
      'ooooo': 50000,
      'xoooxx': 720,
      'xooxox': 720,
      'oooox': 720,
      'ooxoo': 720,
      'oooxo': 720,
      'xxoxox': 120,
      'xxxoxx': 20,

      'xoooox': 4320,
      'xxooox': 720,
      'xoxoox': 720,
      'xoooo': 720,
      'oxooo': 720,
      'xxooxx': 720,
      'xoxoxx': 120,
      'xxoxxx': 20,
    };

    this.board = board;
    this.zobristHash = new ZobristHash(board.size);
    this.transpositionTable = new TranspositionTable(50000);
  }

  setLevel(level) {
    this.level = level;
    switch (level) {
      case 'hard':
        this.depth = 10;
        this.limit = 16;
        break;
      case 'easy':
        this.depth = 3;
        this.limit = 4;
        break;
      case 'normal':
      default:
        this.depth = 7;
        this.limit = 8;
        break;
    }
  }



  minMax(points, playerId, move, depth, alpha, beta) {

    const hash = this.zobristHash.hash(points);

    let score = this.ProbeHash(hash, depth, alpha, beta);
    if (score !== null) {
      return score;
    }

    if (depth <= 0) {
      let score = this.evaluatePoints(points);
      this.RecordHash(hash, depth, score, 0, move);
      return score;
    }


    const moves = this.generateLegalMoves(points);
    const limit = Math.min(moves.length, this.limit);

    // no more move is available, match end
    if (moves.length < 1) {
      let score = this.evaluatePoints(points);
      this.RecordHash(hash, depth, score, 0, move);
      return score;
    }

    if (playerId === this.id) {
      let bestValue = Number.NEGATIVE_INFINITY;
      for (let i = 0; i < limit; i++) {
        points[move.row][move.column] = playerId;
        bestValue = this.minMax(points, this.opponentId, moves[i], depth - 1, alpha, beta);
        points[move.row][move.column] = ' ';
        alpha = Math.max(alpha, bestValue);
        if (alpha >= beta)
          break;
      }
      this.RecordHash(hash, depth, bestValue, 1, move);
      return bestValue;
    } else {
      let bestValue = Number.POSITIVE_INFINITY;
      for (let i = 0; i < limit; i++) {
        points[move.row][move.column] = playerId;
        bestValue = this.minMax(points, this.id, moves[i], depth - 1, alpha, beta);
        points[move.row][move.column] = ' ';
        beta = Math.min(beta, bestValue);
        if (alpha >= beta)
          break;
      }
      this.RecordHash(hash, depth, bestValue, 2, move);
      return bestValue;
    }
  }

  ProbeHash(hash, depth, alpha, beta) {
    let entry = this.transpositionTable.getEntry(hash);


    if (entry) {
      if (entry.depth >= depth) {
        if (entry.hashf === 0) {
          return entry.score;
        }
        if ((entry.hashf === 1) && (entry.score <= alpha)) {
          return alpha;
        }
        if ((entry.hashf === 2) && (entry.score >= beta)) {
          return beta;
        }
      }
    }
    return null;
  }

  RecordHash(hash, depth, score, hashf, move) {
    let entry = new TranspositionTableEntry({ hash, depth, score, hashf, move });
    this.transpositionTable.addEntry(entry);
  }


  evaluatePoints(points) {
    let totalValue = 0;
    for (let i = 0; i < points.length; i++) {
      for (let j = 0; j < points[i].length; j++) {
        if (points[i][j] === this.id) {
          totalValue += this.evaluatePoint(points, i, j, this.id);
        } else if (points[i][j] === this.opponentId) {
          totalValue -= this.evaluatePoint(points, i, j, this.opponentId);
        }
      }
    }
    return totalValue;
  }

  evaluatePoint(points, row, column, playerId) {
    let totalValue = 0;
    //  direction: -
    let pattern = this.generatePattern(points, row, column, 0, 1, playerId);
    totalValue += this.evaluatePattern(pattern);
    //  direction: |
    pattern = this.generatePattern(points, row, column, 1, 0, playerId);
    totalValue += this.evaluatePattern(pattern);
    //  direction: \
    pattern = this.generatePattern(points, row, column, 1, 1, playerId);
    totalValue += this.evaluatePattern(pattern);
    //  direction: /
    pattern = this.generatePattern(points, row, column, -1, 1, playerId);
    totalValue += this.evaluatePattern(pattern);
    return totalValue;
  }

  evaluatePattern(pattern) {
    let totalValue = 0;
    Object.keys(this.scores).forEach((key) => {
      if (pattern.indexOf(key) > -1) {
        totalValue += this.scores[key];
      }
    });

    return totalValue;
  }

  generateLegalMoves(points) {
    let ooooo = [];
    let oooo = [];
    let ooo = [];
    let oo = [];
    let o = [];
    let x = [];

    for (let i = 0; i < points.length; i++) {
      for (let j = 0; j < points[i].length; j++) {
        if (points[i][j] !== ' ') {
          continue;
        }

        if (this.hasAdjacent(points, i, j)) {
          let patternI = this.generateMaxLegalPattern(points, i, j, this.id);
          let patternII = this.generateMaxLegalPattern(points, i, j, this.opponentId);

          if ('ooooo' === patternI || 'ooooo' === patternII) {
            return [new Move(i, j)];
          }

          if ('oooo' === patternI || 'oooo' === patternII) {
            oooo.push(new Move(i, j));
          } else if ('ooo' === patternI || 'ooo' === patternII) {
            ooo.push(new Move(i, j));
          } else if ('oo' === patternI || 'oo' === patternII) {
            o.push(new Move(i, j));
          } else if ('o' === patternI || 'o' === patternII) {
            o.push(new Move(i, j));
          } else {
            x.push(new Move(i, j));
          }
        }
      }
    }

    if (oooo.length > 0) {
      return oooo;
    }


    if (ooo.length > 0) {
      return ooo;
    }

    return oo.concat(o).concat(x);
  }

  hasAdjacent(points, row, column) {

    // west
    if (points[row][column + 1] && points[row][column + 1] !== ' ') {
      return true;
    }
    // east
    if (points[row][column - 1] && points[row][column - 1] !== ' ') {
      return true;
    }
    // north
    if (points[row - 1] && points[row - 1][column] && points[row - 1][column] !== ' ') {
      return true;
    }

    // south
    if (points[row + 1] && points[row + 1][column] && points[row + 1][column] !== ' ') {
      return true;
    }

    // east south
    if (points[row + 1] && points[row + 1][column + 1] && points[row + 1][column + 1] !== ' ') {
      return true;
    }

    // west south
    if (points[row + 1] && points[row + 1][column - 1] && points[row + 1][column - 1] !== ' ') {
      return true;
    }

    // west north
    if (points[row - 1] && points[row - 1][column - 1] && points[row - 1][column - 1] !== ' ') {
      return true;
    }

    // east north
    if (points[row - 1] && points[row - 1][column + 1] && points[row - 1][column + 1] !== ' ') {
      return true;
    }
  }

  generateLegalPattern(pattern) {
    if (pattern.length < 5) {
      return '';
    }

    if (pattern.indexOf('ooooo') > -1) {
      return 'ooooo';
    } else if (pattern.indexOf('oooo') > -1) {
      return 'oooo';
    } else if (pattern.indexOf('ooo') > -1) {
      return 'ooo';
    } else if (pattern.indexOf('oo') > -1) {
      return 'oo';
    } else if (pattern.indexOf('o') > -1) {
      return 'o';
    } else {
      return '';
    }
  }

  generateMaxLegalPattern(points, row, column, playerId) {
    let max;
    //  direction: -
    let patternH = this.generatePattern(points, row, column, 0, 1, playerId);
    max = this.generateLegalPattern(patternH);

    //  direction: |
    let patternV = this.generatePattern(points, row, column, 1, 0, playerId);
    patternV = this.generateLegalPattern(patternV);
    if (max.length < patternV.length) {
      max = patternV;
    }

    //  direction: \
    let patternLT = this.generatePattern(points, row, column, 1, 1, playerId);
    patternLT = this.generateLegalPattern(patternLT);
    if (max.length < patternLT.length) {
      max = patternLT;
    }

    //  direction: /
    let patternRT = this.generatePattern(points, row, column, -1, 1, playerId);
    patternRT = this.generateLegalPattern(patternRT);
    if (max.length < patternRT.length) {
      max = patternRT;
    }

    return max;
  }

  /**
   * directions:
   *  - :
   *    rowStep: 0
   *    columnStep: 1
   *  | :
   *    rowStep: 1
   *    columnStep: 0
   *  \ :
   *    rowStep: 1
   *    columnStep: 1
   *  / :
   *    rowStep: -1
   *    columnStep: 1
   *
   * @param points
   * @param row
   * @param column
   * @param rowStep
   * @param columnStep
   * @param playerId
   * @returns {string}
   */
  generatePattern(points, row, column, rowStep, columnStep, playerId) {
    let pattern = 'o';

    for (let i = 1; i <= 4; i++) {
      let currentRow = row - rowStep * i;
      let currentColumn = column - columnStep * i;

      if (points[currentRow] && points[currentRow][currentColumn] === playerId) {
        pattern = 'o' + pattern;
      } else if (points[currentRow] && points[currentRow][currentColumn] === ' ') {
        pattern = 'x' + pattern;
      } else {
        break;
      }
    }

    for (let i = 1; i <= 4; i++) {
      let currentRow = row + rowStep * i;
      let currentColumn = column + columnStep * i;
      if (points[currentRow] && points[currentRow][currentColumn] === playerId) {
        pattern += 'o';
      } else if (points[currentRow] && points[currentRow][currentColumn] === ' ') {
        pattern += 'x';
      } else {
        break;
      }
    }
    return pattern;
  }

  findBestMove(points) {
    let max = Number.NEGATIVE_INFINITY;

    let bestMoveIndex = 0;

    const moves = this.generateLegalMoves(points);
    const limit = Math.min(moves.length, this.limit);
    for (let i = 0; i < limit; i++) {
      let move = moves[i];

      let value = this.minMax(points, this.id, move, this.depth, Number.NEGATIVE_INFINITY, Number.POSITIVE_INFINITY);

      if (value > max) {
        max = value;
        bestMoveIndex = i;
      }
    }
    return moves[bestMoveIndex];
  }

  think(points) {
    const bestMove = this.findBestMove(points);
    return bestMove;
  }
}