/**
 * Created by Xin on 12/05/2017.
 */

class CircleStone extends Stone {
  constructor(props) {
    super(props);
  }

  move(x, y) {
    const { ctx, color, size, radius, lineWidth } = this;
    ctx.beginPath();
    ctx.arc(x + 0.5, y + 0.5, radius, 0, 2 * Math.PI, false);
    ctx.strokeStyle = color;
    ctx.lineWidth = lineWidth;
    ctx.stroke();
    ctx.closePath();
  }
}