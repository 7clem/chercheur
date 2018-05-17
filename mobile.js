class Point extends p5.Vector{
  constructor(x, y, z){
    super(x, y, z);
  }

  draw() {
    point(this.x, this.y);
  }
}

class Mobile extends Point {
  constructor(x, y, z, m) {
    super(x, y, z);
    this.m = 1;
    this.spd = createVector();
    this.acc = createVector();
    this._target = createVector();

    this.path = [this.copy()];
  }

  target(point) {
      this._target = point;
  }

  targetClosest(targetArray) {
    this.target(nextClosest(this, targetArray));
  }

  update() {
    if (this._target) {
      var desiredSpeed = p5.Vector.sub(this._target, this);
      var steering = p5.Vector.sub(desiredSpeed, this.spd);
      var acc = steering.setMag(maxAcc);

      this.spd.add(acc);
      this.add(this.spd);
    } else {
      return false;
    }

    if (p5.Vector.dist(this, this._target) < 3) {
      // this.path.push(this._target);
      var index = points.indexOf(this._target);
      points.splice(index, 1);
      this.targetClosest(points);
    }
  }

  draw(drawPath){
    stroke(255, 128, 128);
    super.draw();

    if (drawPath) {
      stroke(0);
      strokeWeight(1);
      noFill();
      this.path.push(this.copy())
      beginShape();
      for (var p of this.path) {
        vertex(p.x, p.y);
      }
      endShape();
    }

  }
}
