/**
 * Created by Xin on 12/05/2017.
 */

class CrossPiece extends Piece {
  constructor(props) {
    super(props);
  }

  move(x, y) {
    const { ctx, size, radius, color, lineWidth } = this;
    ctx.beginPath();
    ctx.strokeStyle = color;
    ctx.lineWidth = lineWidth;

    // add 0.5 to make line more clear
    const x1 = x + radius * Math.cos(315 * Math.PI / 180) + 0.5;
    const y1 = y + radius * Math.sin(315 * Math.PI / 180) + 0.5;
    const x2 = x + radius * Math.cos(135 * Math.PI / 180) + 0.5;
    const y2 = y + radius * Math.sin(135 * Math.PI / 180) + 0.5;
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
    ctx.closePath();
    ctx.beginPath();
    // add 0.5 to make line more clear
    const x3 = x + radius * Math.cos(45 * Math.PI / 180) + 0.5;
    const y3 = y + radius * Math.sin(45 * Math.PI / 180) + 0.5;
    const x4 = x + radius * Math.cos(225 * Math.PI / 180) + 0.5;
    const y4 = y + radius * Math.sin(225 * Math.PI / 180) + 0.5;
    ctx.moveTo(x3, y3);
    ctx.lineTo(x4, y4);
    ctx.stroke();
    ctx.closePath();
  }
}