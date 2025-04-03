let canvas;
let indexX = 0; // Track index finger position
let indexY = 0;

// Webcam variables
let capture;
let captureEvent;

function setup() {
  canvas = createCanvas(windowWidth, windowHeight);
  canvas.position(0, 0);
  canvas.style('z-index', '-1');
  textAlign(CENTER, CENTER);
  frameRate(5);

  // Initialize MediaPipe Hand Tracking by setting up the webcam feed
  captureWebcam();
}

function draw() {
  background(220);
  fill(255);

  let resolution = 20;
  let dx = width / resolution;
  let dy = height / resolution;

  // Draw grid based on finger position
  for (let row = 0; row <= resolution; row++) {
    for (let col = 0; col <= resolution; col++) {
      let x = col * dx;
      let y = row * dy;
      let d = dist(indexX, indexY, x, y); // Use index finger position

      textSize(0.1 * d);

      if (random() <= 0.7) {
        text("OK", x, y);
      }
    }
  }

  // Draw red dot for finger tracking
  if (indexX !== 0 && indexY !== 0) {
    fill('red');
    noStroke();
    ellipse(indexX, indexY, 20, 20); // Red dot representing the finger
  }
}

// Function: launch webcam
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
      capture.srcObject = e;

      setCameraDimensions(capture);
      if (typeof mediaPipe !== 'undefined' && typeof mediaPipe.predictWebcam === 'function') {
        mediaPipe.predictWebcam(capture);
      } else {
        console.error("mediaPipe is not defined or predictWebcam is not a function.");
      }
    }
  );
  capture.elt.setAttribute("playsinline", "");
  capture.hide();
}

// Function: resize webcam depending on orientation
function setCameraDimensions(video) {
  const vidAspectRatio = video.width / video.height;
  const canvasAspectRatio = width / height;

  if (vidAspectRatio > canvasAspectRatio) {
    video.scaledHeight = height;
    video.scaledWidth = video.scaledHeight * vidAspectRatio;
  } else {
    video.scaledWidth = width;
    video.scaledHeight = video.scaledWidth / vidAspectRatio;
  }
}

// Function: update index finger position
function updateFingerPosition() {
  if (mediaPipe.landmarks && mediaPipe.landmarks[0]) {
    indexX = map(mediaPipe.landmarks[0][8].x, 0, 1, 0, width); // Map x-coordinate
    indexY = map(mediaPipe.landmarks[0][8].y, 0, 1, 0, height); // Map y-coordinate
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  setCameraDimensions(capture);
}