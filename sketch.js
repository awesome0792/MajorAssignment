class JellyFish {
  constructor(centerX,centerY) {
    this.centerX = centerX;
    this.centerY = centerY;
  }

  
}

function setup() {
  createCanvas(600, 1200);  // Adjusting for the elongated shape
  background(255, 204, 0);  // Yellow background

  noLoop();
}

function draw() {
  // Draw random black strokes and lines
  for (let i = 0; i < 500; i++) {
    strokeWeight(random(1, 4));
    stroke(0);  // Black color
    noFill();
    // Random bezier curves for organic strokes
    bezier(random(width), random(height), random(width), random(height), random(width), random(height), random(width), random(height));
  }

  // Draw purple-ish strokes and lines
  for (let i = 0; i < 300; i++) {
    strokeWeight(random(1, 6));
    stroke(200, 50, 150);  // Purple-pink color
    noFill();
    // Drawing arcs and curves
    arc(random(width), random(height), random(50, 150), random(50, 150), random(TWO_PI), random(TWO_PI));
  }

  // Adding dot-like patterns
  for (let i = 0; i < 1000; i++) {
    strokeWeight(random(2, 5));
    stroke(150, 0, 100);  // Dark pinkish dots
    point(random(width), random(height));
  }
}