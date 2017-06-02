/**
 * Created by Xin on 12/05/2017.
 */

class Player {
  constructor({ id }) {
    this.id = id;
    this.eventHub = new EventHub();
  }

  setStoneType(type) {
    this.stoneType = type;
  }

  getStoneType() {
    return this.stoneType;
  }

  move(column, row) {
    const point = new Point(column, row, this.id);
    this.eventHub.emit('moved', point);
  }

  addMovedListener(listener) {
    this.eventHub.on('moved', listener);
  }

  removeMovedListener(listener) {
    this.eventHub.removeListener('moved', listener);
  }

}