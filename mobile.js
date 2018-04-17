class Point extends p5.Vector{
  constructor(x, y, z){
    super(x, y, z);
  }

  draw() {
    point(this.x, this.y);
  }
}

class Mobile extends Point {
  constructor(x, y, z) {
    super(x, y, z);

    this.spd = createVector();
    //this.acc = createVector();
    this._target = createVector();

    //this.path = new Path([v]);
  }

  targetClosest(targetArray) {
    var dmin = width * width + height * height;
    for (var i = 0; i < targetArray.length; i++) {
      var p = targetArray[i];
      var d = p5.Vector.dist(p, this);
      if (d < dmin) {
        this._target = p;
        dmin = d;
      }
    }
  }

  update() {
    if (this._target) {
      var desiredSpeed = p5.Vector.sub(this._target, this);
      var steering = p5.Vector.sub(desiredSpeed, this.spd);
      var acc = steering.setMag(maxAcc);


      this.add(acc);
    } else {
      return false;
    }

    if (p5.Vector.dist(this, this._target) < 3) {
      path.push(this._target);
      var index = points.indexOf(this._target);
      points.splice(index, 1);
      this.targetClosest(points);
    }
  }

  draw(drawPath){
    stroke(255, 128, 128);
    super.draw();

    if (drawPath) {
      stroke(255);
      strokeWeight(1);
      noFill();
      beginShape();
      for (var p of path) {
        vertex(p.x, p.y);
      }
      endShape();
    }
  }
}
