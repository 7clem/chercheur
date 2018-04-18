var points = [];
var nb_points = 1000;
const maxSpeed = 5; // px / frame
const maxAcc = 1;
var mobile;
var path;

var randPoints;

function setup() {
  createCanvas(500, 500);
  frameRate(120);
  for (var i = 0; i < nb_points; i++) {
      var p = new Point(random(width), random(height));
      points.push(p);
  }

  randPoints = points.slice();

  mobile = new Mobile(0, 0);
  mobile.targetClosest(points);

  path = [{x:mobile.x, y:mobile.y}];
  drawAllAtOnce();
  noLoop();
}

function draw() {
  background(0);

  strokeWeight(2);
  stroke(0, 255, 0);

  for (p of points) {
    p.draw();
  }

  mobile.update();
  mobile.draw(true);
}

function drawAllAtOnce() {
  var p = randPoints[0];
  noFill();
  stroke(255, 32, 32);
  strokeWeight(1);
  beginShape();
  while (p) {
    var x = p.x;
    var y = p.y;
    vertex(x, y);
    p = nextClosest(p, randPoints);
    var index = randPoints.indexOf(p);
    randPoints.splice(index, 1);
  }
  endShape();

}

function nextClosest(here, pts) {
  var dmin = width * width + height * height;
  var ret = pts[0];
  for (var i = 0; i < pts.length; i++) {
    var p = pts[i];
    var d = p5.Vector.dist(p, here);
    if (d < dmin) {
      ret = p;
      dmin = d;
    }
  }
  return ret;
}
