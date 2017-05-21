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
    board.addMovedListener(this.handleMoved.bind(this));
    board.addWinNotifiedListener(this.handleWinNotified.bind(this));
    board.addPointRemovedListener(this.handlePointRemoved.bind(this));
    board.addSameRowPointsResetListener(this.handleSameRowPointsReset.bind(this));
    this.newRound();
  }

  newRound() {
    let { view, board, playerI, playerII } = this;
    playerI.setStoneType('circle');
    playerII.setStoneType('cross');

    board.newRound();
    board.addPlayer(playerI);
    board.addPlayer(playerII);

    board.setCurrentPlayer(playerI);

    view.newRound();
  }

  turnover(player){
    const { view, board, playerI, playerII } = this;
    const nextPlayer = player === playerI ? playerII : playerI;
    board.setCurrentPlayer(nextPlayer);
  }

  handleMoved(point) {
    const { view, board } = this;
    const { column, row, playerId } = point;
    const player = board.getPlayer(playerId);
    view.addStone(column, row, player.getStoneType());
    this.turnover(player);
  }

  handleWinNotified(playerId, sameLineStones) {
    this.view.notifyWin(playerId, sameLineStones);
  }

  handlePointRemoved({ column, row }) {
    this.view.undo(column, row);
  }

  handleBoardClick(column, row) {
    const { board } = this;
    const currentPlayer = board.getCurrentPlayer();
    currentPlayer.move(column, row);
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

  handleSameRowPointsReset(sameRowStones, player) {
    this.view.resetStones(sameRowStones, player.getStoneType());
  }
}