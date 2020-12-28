export class Rectangle {
  constructor(x, y, width, height, color) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.color = color;
  }

  collision = (x, y) => {
    return this.x < x && this.y < y && this.x + this.width > x && this.height + this.y > y;
  };

  changeColor = (sk, color) => {
    const { r, g, b } = color.rgba;
    this.color = sk.color(r, g, b);
  };

  show = (sk) => {
    sk.fill(this.color);
    sk.stroke(51);
    sk.rect(this.x, this.y, this.width, this.height);
  };
}
