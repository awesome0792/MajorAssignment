let arcs = []; // Stores information of floating arcs
let noiseOffset = []; // Stores Perlin noise offset
let dots = []; // Stores small circles
let numDots; // Number of small circles
let arcSpeed = 2; // Speed of arcs falling
  
function setup() { 
  createCanvas(windowWidth, windowHeight);
  frameRate(6); // Set frame rate to 6 FPS
  background(251, 176, 59);
  angleMode(DEGREES);
  
  // Initialize floating short arcs
  for (let i = 0; i < 20; i++) { // Increase to 20 arcs
    arcs.push({
      x: random(width),
      y: random(-100, height), // Randomly start from top of the canvas
      angle: random(360), // Random angle
      length: random(10, 30), // Shorter random arc length
      offset: random(1000) // Random offset for diversity
    });
    noiseOffset.push(random(1000)); // Random noise offset for each arc
  }
  
  // Initialize the number of small circles
  numDots = int((width * height) / 500);
  initializeDots();
}
  
function draw() {
  background(251, 176, 59); // Redraw background each frame
  drawDots(); // Draw small circles background
  drawPalmLeavesGroup1(); // Call function to draw first group of palm leaves
  drawPalmLeavesGroup2(); // Call function to draw second group of palm leaves
  drawFloatingArcs(); // Call function to draw floating arcs
}
  
function drawDots() {
  noStroke(); // Remove outline
  for (let dot of dots) {
    fill(dot.chosenColor);
      
    // Update position using Perlin noise and constrain within boundaries
    dot.x += map(noise(dot.noiseOffset), 0, 1, -2, 2);
    dot.y += map(noise(dot.noiseOffset + 100), 0, 1, -2, 2);
  
    // Keep dots within canvas boundaries
    dot.x = constrain(dot.x, dot.size / 2, width - dot.size / 2);
    dot.y = constrain(dot.y, dot.size / 2, height - dot.size / 2);
  
    ellipse(dot.x, dot.y, dot.size * 0.5, dot.size * 0.5); // Shrink dot size and draw
    dot.noiseOffset += 0.01; // Increase noise offset for smooth movement
  }
}
  
function drawPalmLeavesGroup1() {
  let groupCount = 6; // Number of groups in the first set
  let leafCount = 20; // Number of leaves per group
  let angleStep = 360 / leafCount; // Rotation angle per leaf
  
  // Define position of each group
  let positions = [
    { x: width * 0.25, y: height * 0.25 },  // First group
    { x: width * 0.75, y: height * 0.25 },  // Second group
    { x: width * 0.25, y: height * 0.75 },  // Third group
    { x: width * 0.75, y: height * 0.75 },  // Fourth group
    { x: width * 0.5, y: height * 0.15 },   // Fifth group
    { x: width * 0.5, y: height * 0.85 }    // Sixth group
  ];
  
  for (let g = 0; g < groupCount; g++) {
    push();
    translate(positions[g].x, positions[g].y); // Move each group to designated position
  
    // Set random size for central sphere between 15 and 30
    let sphereSize = random(15, 30);
      
    // Calculate leaf length based on central sphere size
    // let leafLength = map(sphereSize, 15, 30, 100, 180); // Leaf length varies with sphere size
    let leafLength = 150;
      
    // Calculate rotation angle, slow down speed
    // let rotationAngle = frameCount * 0.1; // Adjust rotation speed to 0.2
  
    for (let i = 0; i < leafCount; i++) {
      let angle = (i * angleStep) % 360; // Rotate leaves each frame
      let noiseValue = noise(noiseOffset[g] + frameCount * 0.005); // Slow down noise change
      let floatOffset = map(noiseValue, 0, 1, -5, 5); // Map noise value to float range
      drawLeaves(angle + floatOffset, leafLength); // Pass leaf length to drawing function
    }
      
    // Draw central sphere
    fill(randomColor());
    noStroke();
    ellipse(0, 0, sphereSize, sphereSize); // Draw central sphere
    pop();
  }
}
  
function drawLeaves(angle, leafLength) {
  let segments = 15; // Number of segments per leaf
  let x = 0;
  let y = 0;
  let px, py;
  
  // Thicker main stem of each leaf
  strokeWeight(5);  // Set leaf stem line width thicker
  // stroke(randomColor());
  stroke(203,1,11);
  push();
  rotate(angle); // Rotate leaf to respective angle
  noFill(); // Ensure stem part is not filled
  beginShape();
    
  // Draw curved part of the stem
  for (let i = 0; i < segments; i++) {
    px = x + map(i, 0, segments, 0, leafLength);
    py = y + sin(i * 10) * 30; // Increase frequency and amplitude, make curvature more obvious
    vertex(px, py);
  }
  endShape();
  
  // Ensure small circle aligns with arc end
  // drawEndSphere(px, py); // Add irregular small sphere at leaf tip, align with line end
  pop();
}
  
// Draw irregular small circle at leaf end
function drawEndSphere(x, y) {
  let sphereSize = random(5, 15); // Set random size for small circle
  
  fill(randomColor());
  noStroke();
  ellipse(x, y, sphereSize, sphereSize); // Draw small circle, align with line end
}
  
let floatOffset = 0; // Controls floating offset
let floatSpeed = 0.5; // Floating speed
let floatAmplitude = 10; // Floating amplitude
  
function drawPalmLeavesGroup2() {
  let groupCount = 6; // Number of groups in the second set
  
  for (let g = 0; g < groupCount; g++) {
    // Randomly generate position for each group
    let posX = random(100, width - 100);
    let posY = height / 2 + sin(floatOffset + g) * floatAmplitude; // Control vertical float with sine function
      
    push();
    translate(posX, posY); // Move each group to designated position
  
    let leafCount = 20;               // Number of leaves
    let angleStep = 360 / leafCount;  // Rotation angle per leaf
  
    for (let i = 0; i < leafCount; i++) {
      let angle = i * angleStep; // No need to rotate
      drawLeaves2(angle); // Generate one leaf per angle
    }
  
    // Draw central sphere, set random color and size
    fill(randomColor());
    noStroke();
    ellipse(0, 0, random(15, 30), random(15, 30)); // Central sphere, radius between 15 and 30
    pop();
  }
  
  floatOffset += floatSpeed; // Update floating offset for continuous floating effect
}
  
// Drawing function for the second group of leaves
function drawLeaves2(angle) {
  let segments = 12; // Number of segments per leaf
  let leafLength = random(30, 60); // Smaller random length per leaf
  let x = 0;
  let y = 0;
  let px, py;
  
  
  push();
  rotate(angle); // Rotate leaf to respective angle
  noFill(); // Ensure stem part is not filled
  strokeWeight(1.5);  // Set leaf line width thinner
  stroke(randomColor());
  
  // Draw curved part of the stem
  beginShape();
  for (let i = 0; i < segments; i++) {
    let length = map(i, 0, segments, 0, leafLength);
    px = x + length;
    py = y + sin(i * 10) * 15; // Increase frequency and amplitude, make curvature more obvious
    vertex(px, py);
  }
  endShape();
  
  // Draw opposite side of the leaf
  beginShape();
  for (let i = 0; i < segments; i++) {
    let length = map(i, 0, segments, 0, leafLength);
    px = x + length;
    py = y + sin(i * 10 + 20) * 15; // Increase angle for opposite side
    vertex(px, py);
  }
  endShape();
  
  pop();
}
  
// Generate random color
function randomColor() {
  let colors = [
    color(229, 67, 121),
    color(120, 34, 33),
    color(203, 1, 11),
    color(18, 12, 8),
    color(122, 70, 118)
  ];
  return colors[int(random(colors.length))];
}
  
// Draw floating arcs and balls
function drawFloatingArcs() {
  for (let i = 0; i < arcs.length; i++) {
    let arc = arcs[i];
    stroke(randomColor()); // Set a random color for each arc
    strokeWeight(3); // Set the stroke width for the arc
    noFill(); // No fill color for the arc
  
    push();
    translate(arc.x, arc.y); // Move to the arc's current coordinates
    arc.angle += 0.2; // Update angle to create floating effect
    let length = arc.length;
  
    beginShape(); // Start creating a shape for the arc
    for (let j = 0; j < 10; j++) {
      let x = cos(arc.angle + j * 15) * length; // Calculate the X-coordinate for each point
      let y = sin(arc.angle + j * 15) * length; // Calculate the Y-coordinate for each point
      vertex(x, y); // Create vertices for each point on the arc
    }
    endShape();
  
    let ballPosX = cos(arc.angle) * length; // Calculate the X-coordinate of the floating ball
    let ballPosY = sin(arc.angle) * length; // Calculate the Y-coordinate of the floating ball
    drawFloatingBall(ballPosX, ballPosY); // Draw the floating ball
    pop();
  
    // Update the Y position of the arc for a falling effect
    arc.y += arcSpeed;
  
    // If arc goes beyond the canvas height, reset it to the top with a random X position
    if (arc.y > height) {
      arc.y = 0;
      arc.x = random(width);
    }
  }
}
  
// Add a new arc with random properties
function addNewArc() {
  arcs.push({
    x: random(width), // Random X-coordinate
    y: random(-height, 0), // Start at a random point from the top
    angle: random(PI), // Random initial angle
    length: random(50, 100) // Random length for the arc
  });
}
  
// Initialize floating dots
function initializeDots() {
  for (let i = 0; i < numDots; i++) {
    dots.push({
      x: random(width), // Random X-coordinate
      y: random(height), // Random Y-coordinate
      size: random(5, 15), // Set dot size between 5 and 15
      chosenColor: randomColor(), // Randomly select color
      noiseOffset: random(1000) // Random noise offset for unique movement
    });
  }
}
  
// Draw the floating ball at given coordinates
function drawFloatingBall(x, y) {
  noStroke(); // No outline for the ball
  fill(randomColor()); // Set a random color for the ball
  ellipse(x, y, 5, 5); // Draw the ball with a size of 5x5
}
  
// Resize canvas and reinitialize arcs and dots when window is resized
function windowResized() {
  resizeCanvas(windowWidth, windowHeight); // Adjust canvas size
  background(251, 176, 59); // Reset background
  
  // Recalculate the number of dots based on new window size
  numDots = int((width * height) / 500);
  initializeDots(); // Reinitialize dots with updated size
  initializeArcs(); // Reinitialize arcs with updated size
}
  
// Initialize floating dots with random positions, sizes, and colors
function initializeDots() {
  dots = []; // Clear existing dots
  
  for (let i = 0; i < numDots; i++) {
    let size = random(5, 10); // Random size range for dots
    let x = random(size / 2, width - size / 2); // Ensure within horizontal boundaries
    let y = random(size / 2, height - size / 2); // Ensure within vertical boundaries
    let chosenColor = random([color(229, 67, 121), color(120, 34, 33), color(203, 1, 11), color(18, 12, 8), color(122, 70, 118)]);
    dots.push({ x, y, size, chosenColor, noiseOffset: random(1000) }); // Store properties
  }
}
  
// Initialize floating arcs based on window size
function initializeArcs() {
  arcs = []; // Clear existing arcs
  noiseOffset = []; // Clear noise offsets
  
  let arcCount = int((width * height) / 8000); // Adjust arc count based on window size
  for (let i = 0; i < arcCount; i++) {
    arcs.push({
      x: random(width), // Random X position
      y: random(-100, height), // Random Y position
      angle: random(360), // Random initial angle
      length: random(10, 30), // Random arc length
      offset: random(1000) // Random offset for noise
    });
    noiseOffset.push(random(1000)); // Store offset
  }
}
  
// Main drawing function
function draw() {
  background(251, 176, 59); // Set background color
  drawDots(); // Draw dots as background
  drawPalmLeavesGroup1(); // Draw first group of palm leaves
  drawPalmLeavesGroup2(); // Draw second group of palm leaves
  drawFloatingArcs(); // Draw floating arcs and balls
}
