let canvas;
let indexX = 0; // Track index finger position
let indexY = 0;

function setup() {
  canvas = createCanvas(windowWidth, windowHeight);
  canvas.position(0, 0);
  canvas.style('z-index', '-1');
  textAlign(CENTER, CENTER);
  frameRate(5);

  // Initialize MediaPipe Hand Tracking by setting up the webcam feed
  captureWebcam(); // Initialize webcam capture
  capture.elt.addEventListener('loadedmetadata', () => {
    if (typeof mediaPipe !== 'undefined' && typeof mediaPipe.predictWebcam === 'function') {
      mediaPipe.predictWebcam(capture);
    } else {
      console.error("mediaPipe is not defined or predictWebcam is not a function.");
    }
  });
  captureWebcam();
}

function draw() {
  background(220);
  fill(255);

  let resolution = 20;

  let dx = width / resolution;
  let dy = height / resolution;

  for (let row = 0; row <= resolution; row++) {
    for (let col = 0; col <= resolution; col++) {
      let x = col * dx;
      let y = row * dy;
      let d = dist(indexX, indexY, x, y); // Replace mouseX/mouseY with index finger position

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

// Function to update index finger position
function updateFingerPosition() {
  if (mediaPipe.landmarks[0]) {
    indexX = map(mediaPipe.landmarks[0][8].x, 1, 0, 0, capture.scaledWidth);
    indexY = map(mediaPipe.landmarks[0][8].y, 0, 1, 0, capture.scaledHeight);
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  setCameraDimensions(capture);
}