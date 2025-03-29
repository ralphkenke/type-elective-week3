let canvas;

function setup() {
  canvas = createCanvas(windowWidth, windowHeight); // Set canvas size to window dimensions
  canvas.position(0, 0); // Position the canvas at the top-left corner
  canvas.style('z-index', '-1'); // Send the canvas to the background
  textAlign(CENTER, CENTER);
  frameRate(5);
}

function draw() {
  background(220); // Example background color
  fill(255);
  
  let resolution = 20;
  
  let dx = width / resolution;
  let dy = height / resolution;
  
  for (let row = 0; row <= resolution; row = row + 1) {
    for (let col = 0; col <= resolution; col = col + 1) {
      let x = col * dx;
      let y = row * dy;
      let d = dist(mouseX, mouseY, x, y);
      
      textSize(0.1*d);
      
      if (random() <= 0.7) {
      text("OK", x, y);
      }
    }
  }
  
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight); // Resize the canvas when the window is resized
}