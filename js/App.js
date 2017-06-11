/**
 * Created by Xin on 11/05/2017.
 */

class App {
  constructor() {
    this.board = new Board(Constants.SIZE);
    this.view = new View();
    this.controller = new Controller(this.view, this.board);
  }

  init() {
    const { view, controller } = this;
    view.init();
    controller.init();
  }
}
