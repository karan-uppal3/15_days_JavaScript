var w = 20;
var grid = [];
var num_cols;

var sorted = false;
var m = 0,
  n = 0;

function setup() {

  createCanvas(700, 400);
  //frameRate(15);

  num_cols = floor(width / w);

  for (var i = 0; i < num_cols; i++) {
    var block = new blocks(i);
    block.show(i);
    grid.push(block);
  }
}

function draw() {
  background(51);

  for (var i = 0; i < grid.length; i++) {
    grid[i].show(i);
  }

  if (!sorted) {
    grid[n].highlight(n);
    grid[n + 1].highlight(n + 1);

    if (grid[n].val > grid[n + 1].val) {
      [grid[n], grid[n + 1]] = [grid[n + 1], grid[n]];
    }

    n = n + 1;

    if (n == grid.length - m - 1) {
      n = 0;
      m = m + 1;
    }

    if (m == grid.length - 1)
      sorted = true;
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