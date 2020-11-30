var w = 20;
var grid = [];
var num_cols;
var sorted = false;
var curr_size = 1 , left_start = 0;

function setup() {

  createCanvas(700, 400);
  frameRate(5);
  background(51);

  num_cols = floor(width / w);

  for (var i = 0; i < num_cols; i++) {
    var block = new blocks(i);
    block.show(i);
    grid.push(block);
  }
}

function merge ( l , m , r )
{
  var n1 = m-l+1;
  var n2 = r-m;
  var i,j,k;
  
  var L = [];
  var R = [];
  
  for ( i = 0 ; i < n1 ; i++ )
  {
    L.push(grid[l+i]);
  }
  
  for ( j = 0 ; j < n2 ; j++ )
  {
    R.push(grid[m+1+j]);
  }
  
  i = 0 ; 
  j = 0 ;
  k = l ;
  
  while ( i < n1 && j < n2 )
  {
    if ( L[i].val <= R[j].val )
    {
      grid[k] = L[i];
      i++;
    }
    else {
      grid[k] = R[j];
      j++;
    }
    grid[k].highlight(k);
    k++;
  }
  
  while ( i < n1 ) {
    grid[k] = L[i];
    grid[k].highlight(k);
    i++;
    k++;
  }
  
  while( j < n2 ) {
    grid[k] = R[j];
    grid[k].highlight(k);
    j++;
    k++;
  }
}


function draw() {
  
  background(51);
  for (var i = 0; i < num_cols; i++) {
      grid[i].show(i);
  }
  
  if ( !sorted ) 
  {
      var mid = min(left_start + curr_size-1, grid.length-1);
    
      var right_end = min(left_start + 2*curr_size-1 , grid.length-1);
    
      merge(left_start,mid,right_end);
  
      left_start += 2*curr_size;
    
      if ( left_start >= grid.length )
      {
          left_start = 0;
          curr_size = 2*curr_size;
      }
    
      if ( curr_size > grid.length )
      {
        sorted = true;
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