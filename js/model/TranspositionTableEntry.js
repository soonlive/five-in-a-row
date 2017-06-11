/**
 * Created by Xin on 06/06/2017.
 */

class TranspositionTableEntry {
  constructor({ hash, depth, move, score, alphaOrig, flags, hashf }) {
    this.hash = hash;
    this.flags = flags;
    this.depth = depth;
    this.move = move;
    this.score = score;
    this.hashf = hashf;
    this.alphaOrig = alphaOrig;
  }

  // constructor(zobrist, depth, flag,
  //             eval, ancient, move) {
  //   this.zobrist = zobrist;
  //   this.depth = depth;
  //   this.flag = flag;
  //   this.eval = eval;
  //   this.ancient = ancient;
  //   this.move = move;
  // }
}