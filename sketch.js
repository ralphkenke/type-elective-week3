function setup() {
  createCanvas(1200, 800);
  textAlign(CENTER, CENTER);
  frameRate(10);
}

function draw() {
  background(0);
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
      
      if (random() <= 0.5) {
      text("OK", x, y);
      }
    }
  }
}