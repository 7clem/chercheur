

class Path {
  constructor(a) {
    if (a == undefined) {
      this.points = [];
    }
    this.points = a;
  }

  push(p) {
    this.points.push(p);
  }

  draw() {
    beginShape(LINES);
    for (p in this.points) {
      vertex(p);
    }
    endShape();
  }
}
