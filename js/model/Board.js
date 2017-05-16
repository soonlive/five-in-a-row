/**
 * Created by Xin on 12/05/2017.
 */

class Board {
  constructor(size, winningPiecesSize) {
    this.eventHub = new EventHub();
    this.size = size;
    this.pieces = [];
    this.steps = [];
    this.undoSteps = [];
    this.currentPlayer = null;
    this.isPlaying = false;
    this.players = [];
    this.winningPiecesSize = winningPiecesSize;
    this.winningPieces = null;
    this.winner = null;
    this.firstPlayer = null;
  }

  newRound() {
    this.players.forEach((player) => {
      player.removePieceMovedListener(this.handlePieceMoved);
    });
    this.pieces = [];
    this.steps = [];
    this.undoSteps = [];
    this.currentPlayer = null;
    this.isPlaying = true;
    this.players = [];
    this.winningPieces = null;
    this.winner = null;
    this.firstPlayer = null;
  }

  setFirstPlayer(player) {
    this.firstPlayer = player;
  }

  setCurrentPlayer(player) {
    this.currentPlayer = player;
  }

  getCurrentPlayer() {
    return this.currentPlayer;
  }

  hasWinner() {
    return this.winner !== null;
  }

  getWinner() {
    return this.winner;
  }

  getWinningPieces() {
    return this.winningPieces;
  }

  addPlayer(player) {
    this.players.push(player);
    player.addPieceMovedListener(this.handlePieceMoved.bind(this));
  }

  whoseTurn() {
    return this.currentPlayer;
  }

  isCellAvailable(column, row) {
    const integerReg = /^\+?([1-9]+)\d*$/g;

    /* check whether integer */
    if (!integerReg.test(column) && !integerReg.test(row)) {
      return false;
    }

    /* check whether outside the lines */
    if (column < 1 || row < 1 || column > this.size || row > this.size) {
      return false;
    }

    /* check whether existed already */
    return this.pieces[row] === undefined || this.pieces[row][column] === undefined;
  }

  countLeftRight(column, row, playerId) {
    let linePieces = [{ row, column }];
    let direction = -1;
    let currentColumn = column;
    while (linePieces.length < Constants.WINNING_PIECES_SIZE) {
      currentColumn += direction;
      if (this.pieces[row][currentColumn] === playerId) {
        if (direction === -1) {
          linePieces.unshift({ row, column: currentColumn, id: playerId });
        } else {
          linePieces.push({ row, column: currentColumn, id: playerId });
        }
      } else if (direction === -1) {
        direction = 1;
        currentColumn = column;
      } else {
        break;
      }
    }
    return linePieces;
  }

  countUpDown(column, row, playerId) {
    let linePieces = [{ row, column }];
    let direction = -1;
    let currentRow = row;
    while (linePieces.length < this.winningPiecesSize) {
      currentRow += direction;
      if (this.pieces[currentRow] && this.pieces[currentRow][column] === playerId) {
        if (direction === -1) {
          linePieces.unshift({ row: currentRow, column, id: playerId });
        } else {
          linePieces.push({ row: currentRow, column, id: playerId });
        }
      } else if (direction === -1) {
        direction = 1;
        currentRow = row;
      } else {
        break;
      }
    }
    return linePieces;
  }

  countLeftTop(column, row, playerId) {
    let linePieces = [{ row, column }];
    let direction = -1;
    let currentColumn = column;
    let currentRow = row;
    while (linePieces.length < this.winningPiecesSize) {
      currentColumn += direction;
      currentRow += direction;
      if (this.pieces[currentRow] && this.pieces[currentRow][currentColumn] === playerId) {
        if (direction === -1) {
          linePieces.unshift({ row: currentRow, column: currentColumn, id: playerId });
        } else {
          linePieces.push({ row: currentRow, column: currentColumn, id: playerId });
        }
      } else if (direction === -1) {
        direction = 1;
        currentColumn = column;
        currentRow = row;
      } else {
        break;
      }
    }
    return linePieces;
  }

  countRightTop(column, row, playerId) {
    let linePieces = [{ row, column }];
    let direction = -1;
    let currentColumn = column;
    let currentRow = row;
    while (linePieces.length < this.winningPiecesSize) {
      currentColumn += direction;
      currentRow -= direction;
      if (this.pieces[currentRow] && this.pieces[currentRow][currentColumn] === playerId) {
        if (direction === -1) {
          linePieces.unshift({ row: currentRow, column: currentColumn, id: playerId });
        } else {
          linePieces.push({ row: currentRow, column: currentColumn, id: playerId });
        }
      } else if (direction === -1) {
        direction = 1;
        currentColumn = column;
        currentRow = row;
      } else {
        break;
      }
    }
    return linePieces;
  }


  findSameLinePieces(column, row, playerId) {
    let linePieces = this.countLeftRight(column, row, playerId);

    if (linePieces.length < this.winningPiecesSize) {
      linePieces = this.countUpDown(column, row, playerId);
    }

    if (linePieces.length < this.winningPiecesSize) {
      linePieces = this.countLeftTop(column, row, playerId);
    }

    if (linePieces.length < this.winningPiecesSize) {
      linePieces = this.countRightTop(column, row, playerId);
    }

    return linePieces;
  }

  notifyWin(player, sameLinePieces) {
    this.isPlaying = false;
    this.winner = player;
    this.winningPieces = sameLinePieces;
    this.eventHub.emit('notify_win', player.id, sameLinePieces);
  }

  addPiece(column, row, player) {
    this.pieces[row] = this.pieces[row] || [];
    this.pieces[row][column] = player.id;
    this.eventHub.emit('piece_moved', column, row);
  }

  judgement(column, row, player) {
    const sameLinePieces = this.findSameLinePieces(column, row, player.id);

    if (sameLinePieces.length >= this.winningPiecesSize) {
      this.notifyWin(player, sameLinePieces);
    }
  }

  processPieceMoved(column, row, player) {
    this.addPiece(column, row, player);
    this.judgement(column, row, player);
  }

  recordStep(column, row, player) {
    this.steps.push({
      column,
      row,
      id: player.id,
    });
    this.undoSteps = [];
  }

  undo() {
    const { steps, undoSteps, players, pieces, winningPieces, winner, isPlaying, eventHub } = this;
    const step = steps.pop();
    if (step) {
      undoSteps.push(step);
      pieces[step.row][step.column] = undefined;

      if (this.hasWinner()) {
        this.winner = null;
        this.winningPieces = null;
        eventHub.emit('winningPieces_reset', winningPieces, winner);
      }

      if (!isPlaying) {
        this.isPlaying = true;
      }

      const player = players.find(p => p.id === step.id);
      this.setCurrentPlayer(player);

      eventHub.emit('undo', step);
    }
  }


  redo() {
    const { steps, undoSteps, players, pieces, winningPieces, winner, isPlaying, eventHub } = this;
    const step = undoSteps.pop();
    if (step) {
      steps.push(step);
      const player = players.find(p => p.id === step.id);
      this.setCurrentPlayer(player);
      this.processPieceMoved(step.column, step.row, player);
    }
  }

  handlePieceMoved(column, row) {
    const { currentPlayer, eventHub } = this;
    if (this.isPlaying && this.isCellAvailable(column, row)) {
      this.processPieceMoved(column, row, currentPlayer);
      this.recordStep(column, row, currentPlayer);
    }
  }

  addPieceMovedListener(listener) {
    this.eventHub.on('piece_moved', listener);
  }

  addWinNotifiedListener(listener) {
    this.eventHub.on('notify_win', listener);
  }

  addUndoListener(listener) {
    this.eventHub.on('undo', listener);
  }

  addWinningPiecesResetListener(listener) {
    this.eventHub.on('winningPieces_reset', listener);
  }


}