/**
 * Created by Xin on 21/05/2017.
 */

class AIPlayer extends Player {
  constructor(props) {
    super(props);

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
  }

  think(board) {
    const moves = board.getAvailableMoves();
    const points = board.points;
    let max = Number.MIN_VALUE;
    let bestMoveIndex = null;

    for (let i = 0; i < moves.length; i++) {
      let move = moves[i];
      const value = this.minMax(points, true, move, 3, Number.MIN_VALUE, Number.MAX_VALUE);


      if (value > max) {
        max = value;
        bestMoveIndex = i;
      }
    }

    return moves[bestMoveIndex];
  }

  minMax(points, max, move, depth, alpha, beta) {

    if (depth === 0) {
      return this.getValue(points, move);
    }

    const copyPoints = JSON.parse(JSON.stringify(points));
    copyPoints[move.row][move.column] = max ? this.id : 'playerI';
    const moves = Board.findAvailableMoves(copyPoints);

    if (max) {
      let best = Number.MIN_VALUE;
      for (let i = 0; i < moves.length; i++) {
        best = Math.max(best, this.minMax(copyPoints, false, moves[i], depth - 1, alpha, beta));

        alpha = Math.max(alpha, best);
        if (beta <= alpha)
          break;
      }
      return best;
    } else {
      let best = Number.MAX_VALUE;
      for (let i = 0; i < moves.length; i++) {
        best = Math.min(best, this.minMax(copyPoints, true, moves[i], depth - 1, alpha, beta));

        beta = Math.min(alpha, best);
        if (beta <= alpha)
          break;
      }
      return best;
    }
  }


  getValue(points, move) {
    let totalValue = 0;
    totalValue += this.countLeftRight(points, move.column, move.row, this.id);

    totalValue += this.countUpDown(points, move.column, move.row, this.id);
    totalValue += this.countLeftTop(points, move.column, move.row, this.id);
    totalValue += this.countRightTop(points, move.column, move.row, this.id);

    return totalValue;
  }

  calcValue(state) {
    let totalValue = 0;
    Object.keys(this.scores).forEach((key) => {
      if (state.indexOf(key) > -1) {
        totalValue += this.scores[key];
      }
    });

    return totalValue;
  }


  move(column, row) {
    const point = new Point(column, row, this.id);
    this.eventHub.emit('moved', point);
  }

  countLeftRight(points, column, row, playerId) {
    let state = 'xxxxoxxxx';

    let direction = -1;
    let currentColumn = column;
    let step = 0;

    while (step < 8) {
      currentColumn += direction;
      let index = 4 + currentColumn - column;

      if (points[row] && points[row][currentColumn] === playerId) {
        state = state.substr(0, index) + 'o' + state.substr(index + 1);
      } else if (index < 0 && direction === -1) {
        direction = 1;
        currentColumn = column;
      } else if (index < 8 && !points[row][currentColumn]) {
        continue;
      } else {
        break;
      }

      ++step;
    }

    return this.calcValue(state);
  }


  countUpDown(points, column, row, playerId) {
    let state = 'xxxxoxxxx';

    let direction = -1;
    let currentRow = row;
    let step = 0;

    while (step < 8) {
      currentRow += direction;
      let index = 4 + currentRow - row;

      if (points[currentRow] && points[currentRow][column] === playerId) {
        state = state.substr(0, index) + 'o' + state.substr(index + 1);
      } else if (!points[currentRow] || index < 0 && direction === -1) {
        direction = 1;
        currentRow = row;
      } else if (index < 8 && !points[currentRow][column]) {
        continue;
      } else {
        break;
      }

      ++step;
    }

    return this.calcValue(state);
  }


  countLeftTop(points, column, row, playerId) {
    let state = 'xxxxoxxxx';

    let direction = -1;
    let currentColumn = column;
    let currentRow = row;
    let step = 0;

    while (step < 8) {
      currentColumn += direction;
      currentRow += direction;
      let index = 4 + currentRow - row;

      if (points[currentRow] && points[currentRow][currentColumn] === playerId) {
        state = state.substr(0, index) + 'o' + state.substr(index + 1);
      } else if (!points[currentRow] || index < 0 && direction === -1) {
        direction = 1;
        currentColumn = column;
        currentRow = row;
      } else if (index < 8 && !points[currentRow][currentColumn]) {
        continue;
      } else {
        break;
      }

      ++step;
    }

    return this.calcValue(state);
  }


  countRightTop(points, column, row, playerId) {
    let state = 'xxxxoxxxx';

    let direction = -1;
    let currentColumn = column;
    let currentRow = row;
    let step = 0;

    while (step < 8) {
      currentColumn += direction;
      currentRow -= direction;
      let index = 4 + currentRow - row;

      if (points[currentRow] && points[currentRow][currentColumn] === playerId) {
        state = state.substr(0, index) + 'o' + state.substr(index + 1);
      } else if (!points[currentRow] || index < 0 && direction === -1) {
        direction = 1;
        currentColumn = column;
        currentRow = row;
      } else if (index < 8 && !points[currentRow][currentColumn]) {
        continue;
      } else {
        break;
      }

      ++step;
    }

    return this.calcValue(state);
  }
}
