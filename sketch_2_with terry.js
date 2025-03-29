let canvas;

// webcam variables
let capture; // our webcam
let captureEvent; // callback when webcam is ready


function setup() {
  canvas = createCanvas(windowWidth, windowHeight); // Set canvas size to window dimensions
  canvas.position(0, 0); // Position the canvas at the top-left corner
  canvas.style('z-index', '-1'); // Send the canvas to the background
  textAlign(CENTER, CENTER);
  frameRate(5);

  captureWebcam(); // launch webcam

  
}

function draw() {
  //background(220); // Example background color
  //fill(255);
  
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
  
// Adding capture code 


background(0);


/* WEBCAM */
push();
centerOurStuff(); // center the webcam
scale(-1, 1); // mirror webcam
image(capture, -capture.scaledWidth, 0, capture.scaledWidth, capture.scaledHeight); // draw webcam
scale(-1, 1); // unset mirror
pop();


/* TRACKING */
if (mediaPipe.landmarks[0]) { // is hand tracking ready?

  // index finger
  let indexX = map(mediaPipe.landmarks[0][8].x, 1, 0, 0, capture.scaledWidth);
  let indexY = map(mediaPipe.landmarks[0][8].y, 0, 1, 0, capture.scaledHeight);

  // draw index finger
  push();
  centerOurStuff();
  fill('white');
  ellipse(indexX, indexY, 50, 50);
  fill('blue');
  text("Index", indexX + 30, indexY);
  pop();

}

}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight); // Resize the canvas when the window is resized
}





/* - - Helper functions - - */

// function: launch webcam
function captureWebcam() {
  capture = createCapture(
    {
      audio: false,
      video: {
        facingMode: "user",
      },
    },
    function (e) {
      captureEvent = e;
      console.log(captureEvent.getTracks()[0].getSettings());
      // do things when video ready
      // until then, the video element will have no dimensions, or default 640x480
      capture.srcObject = e;

      setCameraDimensions(capture);
      mediaPipe.predictWebcam(capture);
      //mediaPipe.predictWebcam(parentDiv);
    }
  );
  capture.elt.setAttribute("playsinline", "");
  capture.hide();
}

// function: resize webcam depending on orientation
function setCameraDimensions(video) {

  const vidAspectRatio = video.width / video.height; // aspect ratio of the video
  const canvasAspectRatio = width / height; // aspect ratio of the canvas

  if (vidAspectRatio > canvasAspectRatio) {
    // Image is wider than canvas aspect ratio
    video.scaledHeight = height;
    video.scaledWidth = video.scaledHeight * vidAspectRatio;
  } else {
    // Image is taller than canvas aspect ratio
    video.scaledWidth = width;
    video.scaledHeight = video.scaledWidth / vidAspectRatio;
  }
}


// function: center our stuff
function centerOurStuff() {
  translate(width / 2 - capture.scaledWidth / 2, height / 2 - capture.scaledHeight / 2); // center the webcam
}

// function: window resize
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  setCameraDimensions(capture);
}
