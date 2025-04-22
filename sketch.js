let popupText = "";
let hoverYes = false;
let hoverNo = false;
let stars = []; // Array to hold star positions

let moonY = 50; // Initial position of the moon
let moonDirection = 0.07; // Slower movement of the moon
let messageY = 330; // Initial position of the popup message
let messageDirection = 0.1; // Slower movement of the popup message

// Define star movement speed
let starSpeed = 0.05; // Speed of the star movement

function preload() {
  pixelFont = loadFont('https://raw.githubusercontent.com/google/fonts/main/ofl/pressstart2p/PressStart2P-Regular.ttf');
}

function setup() {
  createCanvas(400, 400);
  textFont(pixelFont);
  textSize(10);
  textAlign(CENTER, CENTER);
  rectMode(CENTER);

  // Generate stars at random positions
  for (let i = 0; i < 150; i++) {
    stars.push({
      x: random(width),
      y: random(height),
      size: random(1, 3),
      xSpeed: random(-starSpeed, starSpeed), // Random horizontal speed
      ySpeed: random(-starSpeed, starSpeed)  // Random vertical speed
    });
  }
}

function draw() {
  background(20, 20, 40); // Dark background

  // Draw the floating stars
  drawStars();

  // Move the moon up and down (floating effect)
  moonY += moonDirection;
  if (moonY > 60 || moonY < 40) {
    moonDirection *= -1;
  }

  // Draw the moon at a new position (further right and up)
  drawMoon();

  // Dialog box with border
  stroke(255);
  strokeWeight(3);
  noFill();
  rect(width / 2, height / 2 - 20, 280, 140);

  // Display question
  noStroke();
  fill(255);
  text("GO TO SLEEP FOR THE NIGHT?", width / 2, height / 2 - 60);

  // Buttons for Yes and No
  hoverYes = mouseX > 110 && mouseX < 170 && mouseY > 200 && mouseY < 230;
  hoverNo = mouseX > 230 && mouseX < 290 && mouseY > 200 && mouseY < 230;

  drawButton(140, 215, "YES", hoverYes, color(0, 255, 0)); // Green for Yes
  drawButton(260, 215, "NO", hoverNo, color(255, 0, 0)); // Red for No by default

  // Move the popup message up and down (floating effect)
  messageY += messageDirection;
  if (messageY > 340 || messageY < 320) {
    messageDirection *= -1;
  }

  // Display the popup message
  if (popupText !== "") {
    fill(255);
    textSize(8);
    text(popupText, width / 2, messageY);
    textSize(10);
  }
}

// Function to draw floating stars
function drawStars() {
  noStroke();
  fill(255, 255, 255, 150); // White stars with some transparency

  // Update and draw each star at a new position based on speed
  for (let star of stars) {
    star.x += star.xSpeed;
    star.y += star.ySpeed;

    // Bounce stars off edges of the screen
    if (star.x < 0 || star.x > width) {
      star.xSpeed *= -1;
    }
    if (star.y < 0 || star.y > height) {
      star.ySpeed *= -1;
    }

    // Draw the star
    ellipse(star.x, star.y, star.size);
  }
}

// Function to draw the moon at a new position
function drawMoon() {
  fill(255, 255, 200); // Light yellow moon
  noStroke();
  ellipse(350, moonY, 80, 80); // Draw the moon with floating effect
}

// Function to draw buttons
function drawButton(x, y, label, hover, buttonColor) {
  // Draw the button background
  fill(hover ? buttonColor : color(180)); // Change color on hover
  rect(x, y, 60, 25);

  // Draw the text on top of the button
  fill(0);
  text(label, x, y);
}

// Handle mouse press
function mousePressed() {
  if (hoverYes) {
    // YES clicked: the player keeps clicking yes but never sleeps
    popupText = random([
      "YOU CAN'T SLEEP YET...",
      "YOU'RE STILL AWAKE...",
      "YOUR BODY IS TIRED, YET YOUR MIND IS AWAKE...",
      "YOU CLOSE YOUR EYES BUT CAN'T FALL ASLEEP...",
      "THE BED IS COMFORTABLE, BUT YOU'RE NOT READY...",
      "YOU TOSS AND TURN...",
      "THERE'S SOMETHING YOU'RE FORGETTING..."
    ]);
  }

  if (hoverNo) {
    // NO clicked: The player needs sleep to keep playing
    popupText = random([
      "IT'S GETTING LATE.",
      "YOU MUST SLEEP TO KEEP PLAYING.",
      "YOU NEED TO REST.",
      "YOU CANNOT KEEP GOING WITHOUT SLEEP.",
      "YOUR BODY DEMANDS REST.",
      "YOU'RE STARTING TO FEEL EXHAUSTED."
    ]);
  }
}