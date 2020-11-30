var bgcolor;

function setup() {
  createCanvas(400, 400);
  bgcolor = color(200);

  // creates a button
  var button = createButton("Press me");

  // This calls the function changeColor
  // everytime the button is clicked
  button.mousePressed(changeColor);
}

/* This runs every time the mouse is clicked
function mousePressed() {
  changeColor();
}*/

// We basically want the button press to be
// linked to the changeColor() function

function changeColor() {
  bgcolor = color(random(255));
}

function draw() {
  background(bgcolor);
}
