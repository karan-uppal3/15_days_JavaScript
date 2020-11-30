var canvas, h1;

var y = 0;

function setup() {
  canvas = createCanvas(600, 600); // creates a canvas

  // createP() , createDiv() , createButton() , createImg()
  // are also available commands to create HTML elements
  // For e.g. - createP("Hello World");

  // Uses aboslute positioning to position the canvas
  // It will be made on top of other elements too
  canvas.position(400, 100);

  // We can also do this to create elements
  h1 = createElement("h1", "Heading 1 created by JS");
  // h1 variable stores all the information about the element

  h1.position(400, 0);
}

/* We can also do stuff like this 
function mousePressed() {
  createP("You clicked");
} */

function mousePressed() {
  // Using html() you can change the content of an element
  h1.html("You clicked");
}

function draw() {
  background(51);
  // We can also move elements using the animation loop
  h1.position(400, y);
  y += 0.5;
}
