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


  steer(force) {
    this.acc.add(force);
  }

  brake() {
    this.acc.add(p5.Vector.mult(this.spd, -1));
  }

  seek() {
    let desired_velocity = p5.Vector.sub(this._target, this);
    this.steer(p5.Vector.sub(desired_velocity, this.spd));
  }

  arrive() {
      const target_offset = p5.Vector.sub(this._target, this);
      // prevent divide by zero later
      const distance = max(0.01, target_offset.mag());
      const ramped_speed = maxSpd * (distance / slowing_distance);
      const clipped_speed = min(ramped_speed, maxSpd)
      const desired_velocity = p5.Vector.mult(target_offset,
                              clipped_speed / distance);
      this.steer( p5.Vector.sub(desired_velocity, this.spd) );
  }

  update() {
    if (this._target){
      this.arrive();
    } else {
      this.brake();
    }

    this.acc.limit(maxAcc);
    this.spd.add(this.acc);
    this.spd.limit(maxSpd);
    this.add(this.spd);
    this.acc.mult(0);

    if (this._target && p5.Vector.dist(this, this._target) < 3) {
      // this.path.push(this._target);
      var index = points.indexOf(this._target);
      points.splice(index, 1);
      this._target = undefined;
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
