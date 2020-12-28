import { Rectangle } from "./models/rectangle";

export class Drawing {
  // ----------------- setup ----------------- //
  setup = (sk) => {
    sk.createCanvas(2045, 1015);
    sk.background(250);

    this.x = 20;
    this.y = 25;
    this.width = 20;
    this.height = 25;
    this.paddingLeft = 15;
    this.paddingWidht = 10;
    this.paddingTop = 20;

    this.rects = [];
    for (let col = 0; col < 40; col++) {
      for (let ran = 0; ran < 100; ran++) {
        this.rects.push(
          new Rectangle(
            (col % 2) * this.paddingWidht + this.paddingLeft + (ran * (this.x + this.width)) / 2,
            (col * (this.y + this.height) + this.paddingTop) / 2,
            this.width,
            this.height,
            sk.color(255, 255, 255)
          )
        );
      }
    }
  };

  // ----------------- draw ----------------- //
  draw = (sk, colors, canDraw) => {
    this.rects.forEach((rect) => {
      rect.show(sk);
    });

    if (sk.mouseIsPressed && canDraw) {
      this.paintRectangles(sk, colors);
    }
  };

  // ----------------- mouseClicked ----------------- //
  mouseClicked = (sk, colors) => {
    this.paintRectangles(sk, colors);
  };

  paintRectangles = (sk, colors) => {
    this.rects.forEach((rect) => {
      if (rect.collision(sk.mouseX, sk.mouseY)) {
        if (sk.mouseButton === "left") {
          rect.changeColor(sk, colors.mainColor);
        }
        if (sk.mouseButton === "right") {
          rect.changeColor(sk, colors.secondaryColor);
        }
      }
    });
  };
}
