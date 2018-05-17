var points = [];
var nb_points = 100;
const maxSpeed = 50; // px / frame
const maxAcc = 1;
var mobile;
// var targets;

const drawAllInOneFrame = false;

function setup() {
  createCanvas(500, 500);
  frameRate(120);
  for (var i = 0; i < nb_points; i++) {
      var p = new Point(random(width), random(height));
      points.push(p);
  }

  // randPoints = points.slice();

  mobile = new Mobile(0, 0);
  mobile.targetClosest(points);

  // targets = [{x:mobile.x, y:mobile.y}];
}

function draw() {
  background(255);

  strokeWeight(2);
  stroke(0, 0, 0);

  if (drawAllInOneFrame) {
    drawAll();
    noLoop();
  } else {
    drawPoints();
    mobile.update();
    mobile.draw(true);
  }
}

function drawPoints(pointSize) {
  if (pointSize == undefined) pointSize = 3;
  strokeWeight(pointSize);
  for (p of points) {
    p.draw();
  }
}
//
// function orderPoints(pointsArray) {
//   copyOfPoints = pointsArray.splice();
//   var inOrder = [];
//   var p = pointsArray[0];
//   inOrder.push(p);
//   var index;
//   while (copyOfPoints.length > 0) {
//     p = nextClosest(p, copyOfPoints);
//     inOrder.push(p);
//     index = copyOfPoints.indexOf(p);
//     copyOfPoints.splice(index, 1);
//   }
//   return inOrder;
// }

function drawAll() {
  var p = randPoints[0];
  noFill();
  stroke(255, 32, 32);
  drawPoints(4);
  strokeWeight(1);
  curveTightness(0);
  beginShape();
  while (p) {
    var x = p.x;
    var y = p.y;
    curveVertex(x, y);
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
