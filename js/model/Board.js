/**
 * Created by Xin on 12/05/2017.
 */

class Board {
  constructor(size, sameRowPointsSize) {
    this.eventHub = new EventHub();
    this.size = size;
    this.points = [];
    this.pointStack = [];
    this.undoPointStack = [];
    this.currentPlayer = null;
    this.isPlaying = false;
    this.players = [];
    this.sameRowPointsSize = sameRowPointsSize;
    this.sameRowPoints = [];
    this.winner = null;
  }

  newRound() {
    this.players.forEach((player) => {
      player.removeMovedListener(this.handleMoved);
    });
    this.points = [];
    this.pointStack = [];
    this.undoPointStack = [];
    this.currentPlayer = null;
    this.isPlaying = true;
    this.players = [];
    this.sameRowPoints = [];
    this.winner = null;
  }

  setCurrentPlayer(player) {
    this.currentPlayer = player;
  }

  getCurrentPlayer() {
    return this.currentPlayer;
  }

  getPlayer(playerId) {
    return this.players.find(player => player.id === playerId);
  }

  hasWinner() {
    return this.winner !== null;
  }

  getWinner() {
    return this.winner;
  }

  getSameRowPoints() {
    return this.sameRowPoints;
  }

  addPlayer(player) {
    this.players.push(player);
    player.addMovedListener(this.handleMoved.bind(this));
  }

  whoseTurn() {
    return this.currentPlayer;
  }

  isCellAvailable(point) {
    const { column, row } = point;
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
    return this.points[row] === undefined || this.points[row][column] === undefined;
  }

  countLeftRight(point) {
    const { column, row, playerId } = point;
    let sameRowPoints = [point];
    let direction = -1;
    let currentColumn = column;
    while (sameRowPoints.length < this.sameRowPointsSize) {
      currentColumn += direction;
      if (this.points[row][currentColumn] === playerId) {
        const targetPoint = new Point(currentColumn, row, playerId);
        if (direction === -1) {
          sameRowPoints.unshift(targetPoint);
        } else {
          sameRowPoints.push(targetPoint);
        }
      } else if (direction === -1) {
        direction = 1;
        currentColumn = column;
      } else {
        break;
      }
    }
    return sameRowPoints;
  }

  countUpDown(point) {
    const { column, row, playerId } = point;
    let sameRowPoints = [{ row, column }];
    let direction = -1;
    let currentRow = row;
    while (sameRowPoints.length < this.sameRowPointsSize) {
      currentRow += direction;
      if (this.points[currentRow] && this.points[currentRow][column] === playerId) {
        const targetPoint = new Point(column, currentRow, playerId);
        if (direction === -1) {
          sameRowPoints.unshift(targetPoint);
        } else {
          sameRowPoints.push(targetPoint);
        }
      } else if (direction === -1) {
        direction = 1;
        currentRow = row;
      } else {
        break;
      }
    }
    return sameRowPoints;
  }

  countLeftTop(point) {
    const { column, row, playerId } = point;
    let sameRowPoints = [{ row, column }];
    let direction = -1;
    let currentColumn = column;
    let currentRow = row;
    while (sameRowPoints.length < this.sameRowPointsSize) {
      currentColumn += direction;
      currentRow += direction;
      if (this.points[currentRow] && this.points[currentRow][currentColumn] === playerId) {
        const targetPoint = new Point(currentColumn, currentRow, playerId);
        if (direction === -1) {
          sameRowPoints.unshift(targetPoint);
        } else {
          sameRowPoints.push(targetPoint);
        }
      } else if (direction === -1) {
        direction = 1;
        currentColumn = column;
        currentRow = row;
      } else {
        break;
      }
    }
    return sameRowPoints;
  }

  countRightTop(point) {
    const { column, row, playerId } = point;
    let sameRowPoints = [{ row, column }];
    let direction = -1;
    let currentColumn = column;
    let currentRow = row;
    while (sameRowPoints.length < this.sameRowPointsSize) {
      currentColumn += direction;
      currentRow -= direction;
      if (this.points[currentRow] && this.points[currentRow][currentColumn] === playerId) {
        const targetPoint = new Point(currentColumn, currentRow, playerId);
        if (direction === -1) {
          sameRowPoints.unshift(targetPoint);
        } else {
          sameRowPoints.push(targetPoint);
        }
      } else if (direction === -1) {
        direction = 1;
        currentColumn = column;
        currentRow = row;
      } else {
        break;
      }
    }
    return sameRowPoints;
  }


  findSameRowPoints(point) {
    let sameRowPoints = this.countLeftRight(point);

    if (sameRowPoints.length < this.sameRowPointsSize) {
      sameRowPoints = this.countUpDown(point);
    }

    if (sameRowPoints.length < this.sameRowPointsSize) {
      sameRowPoints = this.countLeftTop(point);
    }

    if (sameRowPoints.length < this.sameRowPointsSize) {
      sameRowPoints = this.countRightTop(point);
    }

    return sameRowPoints;
  }

  notifyWin(playerId, sameRowPoints) {
    this.isPlaying = false;
    this.winner = this.players.find(player => player.id === playerId);
    this.sameRowPoints = sameRowPoints;
    this.eventHub.emit('notify_win', playerId, sameRowPoints);
  }

  addPoint(point) {
    const { column, row, playerId } = point;
    this.points[row] = this.points[row] || [];
    this.points[row][column] = playerId;
    this.eventHub.emit('point_add', point);
  }

  removePoint(point) {
    this.points[point.row][point.column] = undefined;
    this.eventHub.emit('point_remove', point);
  }

  judgement(point) {
    const { column, row, playerId } = point;
    const sameRowPoints = this.findSameRowPoints(point);

    if (sameRowPoints.length >= this.sameRowPointsSize) {
      this.notifyWin(playerId, sameRowPoints);
    }
  }

  processMoved(point) {
    this.addPoint(point);
    this.judgement(point);
  }

  stackPoint(point) {
    this.pointStack.push(point);
    this.undoPointStack = [];
  }

  undo() {
    const { pointStack, undoPointStack, players, points, sameRowPoints, winner, isPlaying, eventHub } = this;
    const point = pointStack.pop();
    if (point) {
      undoPointStack.push(point);

      const player = players.find(player => player.id === point.playerId);
      this.setCurrentPlayer(player);
      this.removePoint(point);

      if (!isPlaying) {
        this.isPlaying = true;
      }

      if (this.hasWinner()) {
        this.winner = null;
        this.sameRowPoints = [];
      }
    }
  }


  redo() {
    const { pointStack, undoPointStack, players, points, sameRowPoints, winner, isPlaying, eventHub } = this;
    const point = undoPointStack.pop();
    if (point) {
      pointStack.push(point);
      const player = this.getPlayer(point.playerId);
      this.setCurrentPlayer(player);
      this.processMoved(point);
    }
  }

  handleMoved(point) {
    const { currentPlayer, eventHub } = this;
    if (this.isPlaying && currentPlayer.id === point.playerId && this.isCellAvailable(point)) {
      this.processMoved(point);
      this.stackPoint(point);
    }
  }

  addMovedListener(listener) {
    this.eventHub.on('point_add', listener);
  }

  addWinNotifiedListener(listener) {
    this.eventHub.on('notify_win', listener);
  }

  addPointRemovedListener(listener) {
    this.eventHub.on('point_remove', listener);
  }

}