/**
 * Created by Xin on 12/05/2017.
 */

class Stone {
  constructor({ ctx, color, size, lineWidth }) {
    this.ctx = ctx;
    this.size = size;
    this.radius = size / 2;
    this.lineWidth = lineWidth;
    this.color = color;
  }
}

