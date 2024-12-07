import p5 from "p5";

export const sketch = (p) => {
  p.setup = () => {
    p.createCanvas(400, 400);
  };

  p.draw = () => {
    p.background(200);
    p.fill(100, 150, 255);
    p.ellipse(p.mouseX, p.mouseY, 50, 50);
  };
};
