var s;
var scl = 20;
var prev_x = 0;
var prev_y = 0;
var food;
var moves =[];

function setup() {
  createCanvas(2000, 1000);
  frameRate(15);
  s = new Snake();
  pickLocation();
}

function pickLocation() {
  var cols = floor(width/scl);
  var rows = floor(height/scl);
  food = createVector(floor(random(cols)),floor(random(rows)));
  food.mult(scl);

  for ( var i = 0 ; i < s.tail.length ; i++ )
  {
    if ( food.x == s.tail[i].x && food.y == s.tail[i].y )
    {
      pickLocation();
      return;
    }
  } 

  moves = create_path(food.x,food.y);
  
  s.moveOnPath(moves);
  s.death();
  s.update();
  s.show();  
}

function draw_path(moves) {

  if ( moves != undefined ) {
    for ( var i = 0 ; i < moves.length ; i++ ) {
      fill(255,0,0);
      rect(moves[i].x*scl,moves[i].y*scl,scl,scl);
    }
  }
}

function create_path() {

  moves = [];

  var maze = new Array(ROW);;

    for ( var i = 0 ; i < ROW ; i++ ) {
        maze[i] = new Array(COL);
        for ( var j = 0 ; j < COL ; j++ ) {
            maze[i][j] = 0;
        }
    }

    for ( var i = 0 ; i < s.tail.length ; i++ ) {
      maze[floor(s.tail[i].x/scl)][floor(s.tail[i].y/scl)] = 1; 
    }

    maze[prev_x][prev_y] = 0;

    var temp = new A_star(prev_x,prev_y,floor(food.x/scl),floor(food.y/scl));

    moves = temp.aStarSearch(maze,createVector(prev_x,prev_y),createVector(floor(food.x/scl),floor(food.y/scl)));
    prev_x = floor(food.x/scl);
    prev_y = floor(food.y/scl)

    draw_path(moves);

    return moves;
}

function draw() {
  background(51);
  
  if ( s.eat(food) ) {
    pickLocation();
  }
  
  else {
    s.moveOnPath(moves);
    s.death();
    s.update();
    s.show();
  }

  fill(255,0,100);
  
  rect(food.x,food.y,scl,scl);
 
}

function keyPressed() {
  if ( keyCode == UP_ARROW ){
    s.dir(0,-1);
  }
  else if ( keyCode == DOWN_ARROW ) {
    s.dir(0,1);
  }
  else if ( keyCode == RIGHT_ARROW ) {
    s.dir(1,0);
  }
  else if ( keyCode == LEFT_ARROW ) {
    s.dir(-1,0);
  }
}

