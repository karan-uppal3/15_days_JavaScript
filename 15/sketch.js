var angle = 0;

function setup() {
  createCanvas(400, 300,WEBGL);
}

function draw() {
  
 background(175);

 rectMode(CENTER);
 fill(0,0,255);

 translate(mouseX-width/2,mouseY-height/2);

 rotateX(angle);
 rotateY(angle*0.2);
 rotateZ(angle*0.4);

 box(100);

 angle += 0.05;
}
