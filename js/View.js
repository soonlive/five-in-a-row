/**
 * Created by Xin on 11/05/2017.
 */

class View {
  constructor() {
    this.eventHub = new EventHub();
    this.canvas = document.getElementById("goBoard");
    this.ctx = this.canvas.getContext("2d");
    this.board = new GoBoard({
      boardBackgroundColor: Constants.BOARD_BACKGROUND_COLOR,
      boardLineColor: Constants.BOARD_LINE_COLOR,
      boardLineWith: Constants.BOARD_LINE_WIDTH,
      cellSize: Constants.CELL_SIZE,
      circlePieceColor: Constants.CIRCLE_PIECE_COLOR,
      crossPieceColor: Constants.CROSS_PIECE_COLOR,
      ctx: this.ctx,
      size: Constants.SIZE,
      pieceLineWidth: Constants.PIECE_LINE_WITH,
      pieceSize: Constants.PIECE_SIZE,
    });
    this.newRoundBtn = document.querySelector('.button.newRound');
    this.undoBtn = document.querySelector('.button.undo');
    this.redoBtn = document.querySelector('.button.redo');
  }

  init() {
    this.board.drawBoard();
    this.board.addCellClickListener(this.handleBoardClick.bind(this));
    this.newRoundBtn.onclick = this.handleNewRoundBtnClick.bind(this);
    this.undoBtn.onclick = this.handleUndoBtnClick.bind(this);
    this.redoBtn.onclick = this.handleRedoBtnClick.bind(this);
  }

  newRound() {
    const { board } = this;
    board.drawBoard();
  }

  addPiece(column, row, type) {
    this.board.addPiece(column, row, type);
  }

  notifyWin(playerId, sameLinePieces) {
    let { row: row1, column: column1 } = sameLinePieces[0];
    let { row: row2, column: column2 } = sameLinePieces[sameLinePieces.length - 1];
    this.board.drawCrossLine(row1, column1, row2, column2);
  }

  undo(column, row) {
    this.board.removePiece(column, row);
  }

  resetPieces(pieces, type) {
    const { board } = this;
    pieces.forEach((piece) => {
      board.removePiece(piece.column, piece.row);
      board.addPiece(piece.column, piece.row, type)
    });
  }

  addBoardClickListener(listener) {
    this.eventHub.on('board_click', listener);
  }

  handleBoardClick(column, row) {
    const { eventHub, canvas, board } = this;
    eventHub.emit('board_click', column, row);
  }

  addNewRoundClickListener(listener) {
    this.eventHub.on('new_round_click', listener);
  }

  handleNewRoundBtnClick() {
    this.eventHub.emit('new_round_click');
  }

  addUndoBtnClickListener(listener) {
    this.eventHub.on('undo_click', listener);
  }

  handleUndoBtnClick() {
    this.eventHub.emit('undo_click');
  }

  addRedoBtnClickListener(listener) {
    this.eventHub.on('redo_click', listener);
  }

  handleRedoBtnClick() {
    this.eventHub.emit('redo_click');
  }
}