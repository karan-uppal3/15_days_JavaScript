var n = 0;
var c = 4;

function setup() {
  createCanvas(400, 400);
  angleMode(DEGREES);
  colorMode(HSB);
  background(0);
}

function draw() {
  
  var phi = n * 137.3;
  var r = c * sqrt(n);

  var x = r * cos(phi) + width/2;
  var y = r * sin(phi) + height/2;

  fill((phi/r)%256,255,255);
  noStroke();
  ellipse(x,y,4,4);

  n++;
}
