var state = [
  [0, 0, 0],
  [0, 0, 0],
  [0, 0, 0],
];
var dictShape = { true: "o", false: "x" };
var currShape = false;
var won = false;

function setup() {
  createCanvas(600, 600);
  background(51);
  strokeWeight(4);
  stroke(255);
  line(200, 20, 200, 580);
  line(400, 20, 400, 580);
  line(20, 200, 580, 200);
  line(20, 400, 580, 400);
}

var comp_move = true;

function draw() {
  if (won == false) {
    if (comp_move == true) {
      compMove();
      comp_move = false;
    }
    if (mouseIsPressed) {
      var val_x = floor(mouseY / 200);
      var val_y = floor(mouseX / 200);

      if (state[val_x][val_y] == 0) {
        state[val_x][val_y] = "o";

        insertShape("o", val_x, val_y);

        comp_move = true;
      }
    }
  }
  let result = checkWin(state);

  if (result == 10 || result == -10 || isMovesLeft() == false) won = true;
}

function insertShape(shape, pos_x, pos_y) {
  noFill();
  stroke(230, 50, 100);
  var m = pos_y * 200 + 100;
  var n = pos_x * 200 + 100;

  if (shape == "o") circle(m, n, 130);
  else if (shape == "x") {
    line(m - 65, n - 65, m + 65, n + 65);
    line(m + 65, n - 65, m - 65, n + 65);
  }
}

function checkWin(b) {
  for (var row = 0; row < 3; row++) {
    if (b[row][0] == b[row][1] && b[row][1] == b[row][2]) {
      if (b[row][0] == "x") return +10;
      else if (b[row][0] == "o") return -10;
    }
  }

  // Checking for Columns for X or O victory.
  for (var col = 0; col < 3; col++) {
    if (b[0][col] == b[1][col] && b[1][col] == b[2][col]) {
      if (b[0][col] == "x") return +10;
      else if (b[0][col] == "o") return -10;
    }
  }

  // Checking for Diagonals for X or O victory.
  if (b[0][0] == b[1][1] && b[1][1] == b[2][2]) {
    if (b[0][0] == "x") return +10;
    else if (b[0][0] == "o") return -10;
  }

  if (b[0][2] == b[1][1] && b[1][1] == b[2][0]) {
    if (b[0][2] == "x") return +10;
    else if (b[0][2] == "o") return -10;
  }

  // Else if none of them have won then return 0
  return 0;
}

function compMove() {
  var bestScore = -Infinity,
    bestMove_x,
    bestMove_y;

  for (var i = 0; i < 3; i++) {
    for (var j = 0; j < 3; j++) {
      if (state[i][j] == 0) {
        state[i][j] = "x";

        var score = minimax(0, false);
        state[i][j] = 0;

        if (score > bestScore) {
          bestScore = score;
          bestMove_x = i;
          bestMove_y = j;
        }
      }
    }
  }
  state[bestMove_x][bestMove_y] = "x";
  insertShape("x", bestMove_x, bestMove_y);
}

function isMovesLeft() {
  var ctr = 0;

  for (var i = 0; i < 3; i++) {
    for (var j = 0; j < 3; j++) {
      if (state[i][j] == 0) {
        return true;
      }
    }
  }
  return false;
}

function minimax(depth, isMaximiser) {
  let result = checkWin(state);

  if (result == 10 || result == -10) return result;

  if (isMovesLeft() == false) return 0;

  if (isMaximiser) {
    var bestScore = -100;
    for (var i = 0; i < 3; i++) {
      for (var j = 0; j < 3; j++) {
        if (state[i][j] == 0) {
          state[i][j] = "x";
          var score = minimax(depth + 1, false);
          state[i][j] = 0;
          bestScore = max(bestScore, score);
        }
      }
    }
    return bestScore;
  } else {
    var bestScore = 100;
    for (var i = 0; i < 3; i++) {
      for (var j = 0; j < 3; j++) {
        if (state[i][j] == 0) {
          state[i][j] = "o";
          var score = minimax(depth + 1, true);
          state[i][j] = 0;
          bestScore = min(score, bestScore);
        }
      }
    }
    return bestScore;
  }
}
