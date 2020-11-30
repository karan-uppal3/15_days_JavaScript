var state = [0, 0, 0, 0, 0, 0, 0, 0, 0];
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

function draw() {
  if (mouseIsPressed && won == false) {
    var val = floor(mouseY / 200) * 3 + floor(mouseX / 200);

    if (state[val] == 0) {
      state[val] = dictShape[currShape];

      insertShape(dictShape[currShape], val);

      if (checkWinner(dictShape[currShape])) {
        console.log(dictShape[currShape], " wins");
        won = true;
      }

      currShape = !currShape;
    }
  }
}

function insertShape(shape, pos) {
  noFill();
  stroke(230, 50, 100);
  var m = (pos % 3) * 200 + 100;
  var n = floor(pos / 3) * 200 + 100;

  if (shape == "o") circle(m, n, 130);
  else if (shape == "x") {
    line(m - 65, n - 65, m + 65, n + 65);
    line(m + 65, n - 65, m - 65, n + 65);
  }
}

function checkWinner(shape) {
  var i, j, ctr;

  for (j = 0; j < 3; j++) {
    ctr = 0;
    for (i = 0; i < 3; i++) {
      if (state[j * 3 + i] == shape) ctr++;
    }

    if (ctr == 3) return true;
  }

  for (j = 0; j < 3; j++) {
    ctr = 0;
    for (i = 0; i < 3; i++) {
      if (state[j + i * 3] == shape) ctr++;
    }

    if (ctr == 3) return true;
  }

  ctr = 0;
  for (i = 0; i < 3; i++) {
    if (state[i + i * 3] == shape) ctr++;
  }
  if (ctr == 3) return true;

  ctr = 0;
  for (j = 2; j <= 6; j += 2) {
    if (state[j] == shape) ctr++;
  }
  if (ctr == 3) return true;

  return false;
}
