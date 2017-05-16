/**
 * Created by Xin on 12/05/2017.
 */

class Player {
  constructor(id) {
    this.id = id;
    this.eventHub = new EventHub();
  }

  setPieceType(type) {
    this.pieceType = type;
  }

  getPieceType() {
    return this.pieceType;
  }

  movePiece(column, row) {
    this.eventHub.emit('piece_moved', column, row);
  }

  addPieceMovedListener(listener) {
    this.eventHub.on('piece_moved', listener);
  }

  removePieceMovedListener(listener) {
    this.eventHub.removeListener('piece_moved', listener);
  }

}