var guide = [126,
             48,
             109,
             121,
             51,
             91,
             95,
             112,
             127,
             123];

var i = 0;

function setup() {
  createCanvas(400, 400);
  frameRate(3);
}

function make() {
  translate(150,100);
  
  fill(255,0,50,50);
  noStroke();
  
  // A
  beginShape();
  vertex(20,10);
  vertex(60,10);
  vertex(75,20);
  vertex(60,30);
  vertex(20,30);
  vertex(5,20);
  endShape(CLOSE); 
  // B
  beginShape();
  vertex(77,22);
  vertex(87,37);
  vertex(87,77);
  vertex(77,92);
  vertex(67,77);
  vertex(67,37);
  endShape(CLOSE);
  // C
  beginShape();
  vertex(77,94);
  vertex(87,109);
  vertex(87,149);
  vertex(77,164);
  vertex(67,149);
  vertex(67,109);
  endShape(CLOSE); 
  // D
  beginShape();
  vertex(20,156);
  vertex(60,156);
  vertex(75,166);
  vertex(60,176);
  vertex(20,176);
  vertex(5,166);
  endShape(CLOSE);
  // E
  beginShape();
  vertex(3,94);
  vertex(13,109);
  vertex(13,149);
  vertex(3,164);
  vertex(-7,149);
  vertex(-7,109);
  endShape(CLOSE); 
  // F
  beginShape();
  vertex(3,22);
  vertex(13,37);
  vertex(13,77);
  vertex(3,92);
  vertex(-7,77);
  vertex(-7,37);
  endShape(CLOSE);
  // G
  beginShape();
  vertex(20,82);
  vertex(60,82);
  vertex(75,92);
  vertex(60,102);
  vertex(20,102);
  vertex(5,92);
  endShape(CLOSE);  
}

function sevenSegment(num) 
{
  fill(255,0,50,200);
  
  if ( num & (1<<6) ){
    // A
    beginShape();
    vertex(20,10);
    vertex(60,10);
    vertex(75,20);
    vertex(60,30);
    vertex(20,30);
    vertex(5,20);
    endShape(CLOSE); 
  }
  
  if ( num & (1<<5) ){
    // B
    beginShape();
    vertex(77,22);
    vertex(87,37);
    vertex(87,77);
    vertex(77,92);
    vertex(67,77);
    vertex(67,37);
    endShape(CLOSE);
  }
  
  if ( num & (1<<4) ){
    // C
    beginShape();
    vertex(77,94);
    vertex(87,109);
    vertex(87,149);
    vertex(77,164);
    vertex(67,149);
    vertex(67,109);
    endShape(CLOSE); 
  }
  
  if ( num & (1<<3) ){
    // D
    beginShape();
    vertex(20,156);
    vertex(60,156);
    vertex(75,166);
    vertex(60,176);
    vertex(20,176);
    vertex(5,166);
    endShape(CLOSE);
  }
  
  if ( num & (1<<2) ){
    // E
    beginShape();
    vertex(3,94);
    vertex(13,109);
    vertex(13,149);
    vertex(3,164);
    vertex(-7,149);
    vertex(-7,109);
    endShape(CLOSE); 
  }
  
  if ( num & (1<<1) ){
    // F
    beginShape();
    vertex(3,22);
    vertex(13,37);
    vertex(13,77);
    vertex(3,92);
    vertex(-7,77);
    vertex(-7,37);
    endShape(CLOSE);
  }
  
  if ( num & (1) ) {
    // G
    beginShape();
    vertex(20,82);
    vertex(60,82);
    vertex(75,92);
    vertex(60,102);
    vertex(20,102);
    vertex(5,92);
    endShape(CLOSE);  
  }
}

function draw() {
  background(10);
  
  make();
    
  sevenSegment(guide[i]);
  
  i++;
  
  if ( i == 10 )
    i = 0;
  
}
