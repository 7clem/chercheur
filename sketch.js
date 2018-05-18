var points = [];
var nb_points = 50;

// parameters
var maxAcc = 0.2;
var maxSpd = 0.2;
var slowing_distance = 25;

var mobile;
var drawAllInOneFrame = false;

var keys = ["acc", "spd", "slo"];
const sliderMax = [1, 5, 20]; //3, 5 ,50

function setSliderValueToCenter(slider) {
  slider.value = (slider.min + slider.max) / 2;
}

// update all parameters if any one is changed
function sliderInput() {
  let sliders = keys.map( n => document.getElementById(n+"Slider"));

  // read the value into the script variables
  let params = sliders.map( (s, i) => s.value * sliderMax[i] / 100);

  // update the display
  keys.map( (n, i) => document.getElementById(n+"Label").innerHTML = params[i]);
  maxAcc = float(params[0]);
  maxSpd = float(params[1]);
  slowing_distance = float(params[2]);
}


function setup() {
  var canvas = createCanvas(500, 500);
  frameRate(120);
  let margin = 20;
  for (var i = 0; i < nb_points; i++) {
      let p = new Point(margin + random(width - 2 * margin), margin + random(height - 2 * margin));
      points.push(p);
  }
  // randPoints = points.slice();

  mobile = new Mobile(points[0].x, points[0].y);
  mobile.targetClosest(points);

  keys = ["acc", "spd", "slo"];
  let sliders = keys.map( (key) => document.getElementById(key+"Slider"));
  sliders.map((x) => x.oninput = sliderInput);
  sliderInput();
}

function draw() {
  background(255);

  strokeWeight(2);
  stroke(0);

  mobile.targetClosest(points);
  drawPoints(4);
  mobile.update();
  mobile.draw(true);
}

function drawPoints(pointSize) {
  if (pointSize == undefined) pointSize = 3;
  strokeWeight(pointSize);
  for (p of points) {
    p.draw();
  }
}

// function drawAll() {
//   var p = randPoints[0];
//   noFill();
//   stroke(255, 32, 32);
//   drawPoints(4);
//   strokeWeight(1);
//   curveTightness(0);
//   beginShape();
//   while (p) {
//     var x = p.x;
//     var y = p.y;
//     curveVertex(x, y);
//     p = nextClosest(p, randPoints);
//     var index = randPoints.indexOf(p);
//     randPoints.splice(index, 1);
//   }
//   endShape();
// }

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
