var points = [];
var nb_points = 100;
var maxSpeed = 2; // px / frame
var maxAcc = 0.5;
var mobile;



var body = document.getElementsByTagName('body')[0];
var accSlider = document.getElementById("accSlider");
var spdSlider = document.getElementById("spdSlider");
var accLabel = document.getElementById("accLabel");
var spdLabel = document.getElementById("spdLabel");

// Update the current slider value (each time you drag the slider handle)
accSlider.onchange = function() {
    maxAcc = this.value * 5 / 100 ;
    accLabel.innerHTML = maxAcc;
}

spdSlider.onchange = function() {
    maxSpd = this.value * 20 / 100;
    spdLabel.innerHTML = maxSpd;
}


const drawAllInOneFrame = false;

function setup() {
  var canvas = createCanvas(500, 500);
  frameRate(120);
  let margin = 20;
  for (var i = 0; i < nb_points; i++) {
      let p = new Point(margin + random(width - 2 * margin), margin + random(height - 2 * margin));
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
    drawPoints(4);
    mobile.update(2);
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

