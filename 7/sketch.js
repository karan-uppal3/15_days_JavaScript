var w = 20;
var grid = [];
var num_cols;

var stack = [];
var t = -1;
var L , H;

function partition (l,h) {
  
  var x = grid[h].val;
  var i = l-1;
  
  for ( var j = l ; j <= h-1 ; j++ ) {
    if ( grid[j].val <= x ) {
      i++;
      grid[i].highlight(i);
      grid[j].highlight(j);
      [ grid[i],grid[j] ] = [ grid[j] , grid[i] ];
    }
  }
  
  grid[i+1].highlight(i+1);
  grid[h].highlight(h);
  [ grid[i+1] , grid[h] ] = [ grid[h] , grid[i+1] ];
  
  return i+1;
}

function setup() {

  createCanvas(700, 400);
  frameRate(1);
  background(51);

  num_cols = floor(width / w);

  for (var i = 0; i < num_cols; i++) {
    var block = new blocks(i);
    block.show(i);
    grid.push(block);
  }
  
  L = 0;
  H = grid.length-1;
  
  stack[++t] = L;
  stack[++t] = H;
}

function draw() {
  
  background(51);
  for (var i = 0; i < num_cols; i++) {
      grid[i].show(i);
  }
  
  if ( t >= 0 ) {
    
    H = stack[t--];
    L = stack[t--];
    
    var p = partition(L,H);
    
    if ( p - 1 > L ) {
      stack[++t] = L;
      stack[++t] = p-1;
    }
    
    if ( p + 1 < H ) {
      stack[++t] = p+1;
      stack[++t] = H;
    }
  }
}


function blocks(pos) {
  this.y = floor(random(0, height));

  this.val = height - this.y;

  this.show = function(pos) {
    var x = pos * w;
    fill(255, 255, 255);
    rect(x, this.y, w, height - this.y);
  }

  this.highlight = function(pos) {
    var x = pos * w;
    fill(200, 0, 255, 200);
    rect(x, this.y, w, height - this.y);
  }
}