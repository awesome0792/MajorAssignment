const colourPalette = ['#E54379', '#CB010B', '#782221', 'purple'];
const colorKeys = ["flower", "leaves", "endLeaves", "endLeavesStroke"];
let circles = [];
let centerSphereSize,endSphereSize,endSphereStroke;

function setup() { 
  createCanvas(windowWidth, windowHeight);

  const gridSize = windowWidth/5; // Adjust based on average circle size to optimize
  const rows = Math.ceil(windowHeight / gridSize);
  const cols = Math.ceil(windowWidth / gridSize);
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      // Randomize position within the grid cell, with a small random offset
      let x = col * gridSize + random(gridSize * 0.2, gridSize * 0.8);
      let y = row * gridSize + random(gridSize * 0.2, gridSize * 0.8);
      let r = random(50, 100);
      let leavesCount = random(8, 15);
    
      // Check if this circle overlaps with any previous circle in `circles`
      let overlapping = false;
      for (let other of circles) {
        let d = dist(x, y, other.x, other.y);
        if (d < r + other.r) {
          overlapping = true;
          break;
        }
      }

      // Only add the circle if it’s not overlapping
      if (!overlapping) {
        let colors = Object.fromEntries(
          colorKeys.map(key => [key, colourPalette[floor(random(colourPalette.length))]])
        );
        circles.push({ x, y, r, leavesCount,colors });
      }
    }
  }

  // Define Fixed random color for each component

  // colors = {
  //   flower: colourPalette[floor(random(colourPalette.length))],
  //   leaves: colourPalette[floor(random(colourPalette.length))],
  //   endLeaves: colourPalette[floor(random(colourPalette.length))],
  //   endLeavesStroke: colourPalette[floor(random(colourPalette.length))],
  // }

  angleMode(DEGREES);
  centerSphereSize = random(10, 30);
  endSphereSize = centerSphereSize/2;
  endSphereStroke = endSphereSize/3;

  // Initialize Number of Dots
  initializeDots(int((width*height)/800));
}

// Main drawing function
function draw() {
  background(251, 176, 59); // Set background color
  
  for (let i = 0; i < circles.length; i++) {
    drawFlower(circles[i].x, circles[i].y, circles[i].leavesCount, circles[i].r, circles[i].colors); 
    //draw flower instead of circles, but put it in the loop cuz we've made that overlapping boolean statement there
    //if that makes sense...
  }
  drawDots();
}

function drawFlower(x, y, leavesCount, leafLength, colors) {
  push();
  translate(x, y);
  let angleStep = 360 / leavesCount; // Rotation angle per leaf
  //let leafLength = 80; // Leaf length leties with sphere size

  for (let i = 0; i < leavesCount; i++) {
    drawLeaves(angleStep, leafLength,colors); // Pass leaf length to drawing function
  }
    
  // Draw central sphere
  fill(color(colors.flower));
  noStroke();
  ellipse(0, 0, centerSphereSize, centerSphereSize); // Draw central sphere
  pop();
}

function drawLeaves(angle, leafLength,colors) {
  let segments = 15; // number of segments per the length of the leaf (curve)
  let px, py;

  //attributes of the leaves (curve)
  strokeWeight(5);  // Set leaf stem line width thicker
  stroke(color(colors.leaves));

  rotate(angle); // Rotate leaf to respective angle
  noFill(); // Ensure stem part is not filled

  beginShape();
  // leaf curve
  for (let i = 0; i < segments; i++) {
    px = map(i, 0, segments, 0, leafLength); //define x position of the end of the leaf curve
    py = sin(i * 10) * 50; //define y position of the end of the leaf curve, increase frequency and amplitude, make curvature more obvious
    vertex(px, py);
  }
  endShape();

  // Ensure small circle aligns with arc end
  drawEndLeaf(px, py,colors); // Add irregular small sphere at leaf tip, align with line end
}

function drawEndLeaf(x, y,colors) {
  fill(color(colors.endLeaves));
  strokeWeight(endSphereStroke);
  stroke(color(colors.endLeavesStroke));
  ellipse(x, y, endSphereSize, endSphereSize); // Draw small circle, align with line end
}

// Initialize floating dots
function initializeDots(numDots) {
  dots = [];
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
function randomColor() {
  return colourPalette[floor(random(colourPalette.length))];
}
