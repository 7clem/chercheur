var points = [];
var nb_points = 1000;
const maxSpeed = 5; // px / frame
const maxAcc = 1; 
var mobile;
var path;

var randPoints;

function setup() {
  createCanvas(500, 500);
  for (var i = 0; i < nb_points; i++) {
      var p = new Point(random(width), random(height));
      points.push(p);
  }

  randPoints = points.slice();

  mobile = new Mobile(0, 0);
  mobile.targetClosest(points);

  path = [{x:mobile.x, y:mobile.y}];
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
