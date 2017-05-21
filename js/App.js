/**
 * Created by Xin on 11/05/2017.
 */

class App {
  constructor() {
    this.playerI = new Player('circle');
    this.playerII = new Player('cross');
    this.board = new Board(Constants.SIZE, Constants.WINNING_STONES_SIZE);
    this.view = new View();
    this.controller = new Controller(this.view, this.board, this.playerI, this.playerII);
  }

  init() {
    const { view, controller } = this;
    view.init();
    controller.init();
  }
}
