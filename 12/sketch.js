var inc = 0.01;
var scl = 5;
var cols, rows;

var fr;

var zoff = 0;

var particles = [];

var flowfield = [];

function setup() {
  createCanvas(400, 400);
  cols = floor(width/scl);
  rows = floor(height/scl);
  fr = createP('');
  pixelDensity(1);
  flowfield = new Array(rows*cols);

  for ( var i = 0 ; i < 500 ; i++ ){
  particles[i] = new Particle();
  }
  background(255);
}

function draw() {
  
  var xoff = 0;
  
  for ( var x = 0 ; x < cols ; x++ ) {
    var yoff = 0;
    for ( var y = 0 ; y < rows ; y++) {
      var index = (x+y*cols);
      var r = noise(xoff,yoff,zoff)*TWO_PI;
      var v = p5.Vector.fromAngle(r);
      v.setMag(5);
      flowfield[index] = v;
    yoff+= 0.1;
    }
  xoff+= 0.1;
  
  } 
  zoff += 0.01;
  
  for ( var i = 0 ; i < particles.length ; i++ ){
    particles[i].follow(flowfield);
    particles[i].show();
    particles[i].update();
    particles[i].edges();
  }
  
  fr.html(floor(frameRate()));
}

function Particle() {
  this.pos = createVector(random(width),random(height));
  this.vel = createVector(0,0);
  this.acc = createVector(0,0);
  this.maxspeed = 4;
  
  this.update = function() {
    this.vel.add(this.acc);
    this.vel.limit(this.maxspeed);
    this.pos.add(this.vel);
    this.acc.mult(0);
  }
  
  this.edges = function() {
    if ( this.pos.x > width ) this.pos.x = 0;
    if ( this.pos.x < 0 ) this.pos.x = width;
    if ( this.pos.y > height ) this.pos.y = 0;
    if ( this.pos.y < 0 ) this.pos.y = height;
  }
  
  this.follow = function(vectors) {
    var x = floor(this.pos.x/scl);
    var y = floor(this.pos.y/scl);
    
    var index = x + y*cols;
    
    this.applyForce(vectors[index]);
  }
 
  this.applyForce = function(force) {
    this.acc.add(force);
  }
  
  this.show = function() {
    strokeWeight(1);
    stroke(0,5);
    point(this.pos.x,this.pos.y);
  }
}


