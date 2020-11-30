var temp;

function setup() {
  createCanvas(400, 400);
  angleMode(DEGREES);
}

function draw() {
  background(10);
  
  temp = map(mouseX,0,width,0,180);
  
  fracTree(-90,-100,200,300,0);
}

function fracTree (theta,dis,x1,y1,k) {
  if ( k < 10 ) {
    var x2 = x1 - dis*cos(theta);
    var y2 = y1 - dis*sin(theta);
    strokeWeight(5-k/2);
    stroke(255);
    line(x1,y1,x2,y2);
    fracTree(theta-temp,dis/1.5,x2,y2,k+1);
    fracTree(theta+temp,dis/1.5,x2,y2,k+1);
  }
}