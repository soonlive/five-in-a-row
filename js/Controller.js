/**
 * Created by Xin on 11/05/2017.
 */

class Controller {
  constructor(view, board, playerI, playerII) {
    this.view = view;   // view obj
    this.board = board; // this is a model obj, not a view obj, diff from
    this.playerI = playerI;
    this.playerII = playerII;
  }

  init() {
    const { view, board } = this;
    view.addBoardClickListener(this.handleBoardClick.bind(this));
    view.addNewRoundClickListener(this.handleNewRoundBtnClick.bind(this));
    view.addUndoBtnClickListener(this.handleUndoBtnClick.bind(this));
    view.addRedoBtnClickListener(this.handleRedoBtnClick.bind(this));
    board.addPieceMovedListener(this.handlePieceMoved.bind(this));
    board.addWinNotifiedListener(this.handleWinNotified.bind(this));
    board.addUndoListener(this.handleUndo.bind(this));
    board.addWinningPiecesResetListener(this.handleWinningPiecesReset.bind(this));
    this.newRound();
  }

  newRound() {
    let { view, board, playerI, playerII } = this;
    playerI.setPieceType('circle');
    playerII.setPieceType('cross');

    board.newRound();
    board.addPlayer(playerI);
    board.addPlayer(playerII);

    board.setCurrentPlayer(playerI);

    view.newRound();
  }

  handlePieceMoved(column, row) {
    const { view, board, playerI, playerII } = this;
    const currentPlayer = board.getCurrentPlayer();
    const nextPlayer = currentPlayer.id === playerI.id ? playerII : playerI;
    board.setCurrentPlayer(nextPlayer);
    view.addPiece(column, row, currentPlayer.getPieceType());
  }

  handleWinNotified(playerId, sameLinePieces) {
    this.view.notifyWin(playerId, sameLinePieces);
  }

  handleUndo({ column, row }) {
    this.view.undo(column, row);
  }

  handleBoardClick(column, row) {
    const { board } = this;
    const currentPlayer = board.getCurrentPlayer();
    currentPlayer.movePiece(column, row);
  }

  handleNewRoundBtnClick() {
    this.newRound();
  }

  handleUndoBtnClick() {
    const { board } = this;
    board.undo();
  }

  handleRedoBtnClick() {
    const { board } = this;
    board.redo();
  }

  handleWinningPiecesReset(winningPieces, player) {
    this.view.resetPieces(winningPieces, player.getPieceType());
  }
}