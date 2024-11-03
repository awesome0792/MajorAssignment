let polies = []; // Variable to store polygon object
const n = 4; // Number of vertices for the initial polygon (e.g., a square)
let numLayers = 100; // Number of watercolor layers

function setup() {
  createCanvas(600, 600); // Sets up a 600x600 pixel canvas
  
  for (let j = 250; j<width/2;j+=20){
    let v = []; // Array to store vertices of the polygon
    for(let i = 0; i < n; i++) {
      // Calculate each vertex position in a circular layout
      let a = i * (TWO_PI / n); // Angle for each vertex around the circle
      v.push(createVector(j + cos(a) * 50, height/2 + sin(a) * 50)); // Push vertices at radius 200
    }
    polies.push(new Poly(v)); // Create a polygon with the generated vertices
  }
  
  noLoop(); // Prevent the draw function from looping
}

function draw() {
  background(255); // Set background to white
  strokeWeight(90);
  // stroke('magenta');
  stroke(255, 100, 0); // Set fill with alpha for layering
  line(0,height/2,width/2-20,height/2);
  
  // Apply watercolor effect on the polygon with an orange color
  for (const poly of polies) {
    waterColour(poly, color(255, 100, 0));
  }
}

// Polygon class to represent a polygon with vertices and growth modifiers
class Poly {
  constructor(vertices) {
    this.vertices = vertices; // Vertices of the polygon
    let modifiers = [];
    for(let i = 0; i < vertices.length; i++) {
      modifiers.push(random(0.1, 0.8)); // Random modifier for vertex distortion
    }
    this.modifiers = modifiers; // Store the modifiers
  }
  
  grow() {
    // Function to "grow" the polygon by adjusting vertices
    let grownVerts = []; // Array to store new grown vertices
    let grownMods = []; // Array to store new modifiers
    
    for(let i = 0; i < this.vertices.length; i++) {
      let j = (i + 1) % this.vertices.length; // Connect to the next vertex
      let v1 = this.vertices[i];
      let v2 = this.vertices[j];
      
      let mod = this.modifiers[i]; // Modifier for the current vertex
      
      // Function to slightly change the modifier
      let chmod = m => m + (rand() - 0.5) * 0.1;
      
      grownVerts.push(v1); // Add the current vertex
      grownMods.push(chmod(mod)); // Modify and add the modifier
      
      // Calculate and manipulate segment between vertices to create a "grown" vertex
      let segment = p5.Vector.sub(v2, v1); // Segment vector between two vertices
      let len = segment.mag(); // Segment length
      segment.mult(rand()); // Randomly scale the segment
      
      let v = p5.Vector.add(segment, v1); // Calculate a new vertex along the segment
      
      // Apply a random rotation to the segment
      segment.rotate(-PI / 2 + (rand() - 0.5) * PI / 4);
      segment.setMag(rand() * len / 2 * mod); // Adjust segment length based on modifier
      v.add(segment); // Apply final position adjustment for the new vertex
      
      grownVerts.push(v); // Add the adjusted vertex
      grownMods.push(chmod(mod)); // Add the modified growth factor
    }
    return new Poly(grownVerts, grownMods); // Return a new grown polygon
  }
  
  dup() {
    // Create a duplicate of the polygon with the same vertices and modifiers
    return new Poly(Array.from(this.vertices), Array.from(this.modifiers));
  }
  
  draw() {
    // Draw the polygon using its vertices
    beginShape();
    for(let v of this.vertices) {
      vertex(v.x, v.y); // Plot each vertex
    }
    endShape(CLOSE); // Close the shape
  }
}

// Function to create a watercolor effect by repeatedly drawing a "grown" polygon
function waterColour(poly, colour) {
  fill(red(colour), green(colour), blue(colour), 255 / (numLayers * 0.8)); // Set fill with alpha for layering
  noStroke(); // Remove outline
  
  poly = poly.grow().grow(); // Grow the polygon twice for an initial larger size
  
  for(let i = 0; i < numLayers; i++) {
    // Regrow the polygon at intervals for a more spread effect
    if(i == int(numLayers / 3) || i == int(2 * numLayers / 3)) {
      poly = poly.grow().grow(); // Add additional growth stages at specific layers
    }
    
    poly.grow().draw(); // Draw the grown polygon on each layer
  }  
}

// Generate a random value with a distribution for smoother transitions
function rand() {
  return distribute(random(1)); // Apply distribution to a random number between 0 and 1
}

// Adjust the distribution of random values for a smoother effect
function distribute(x) {
  return pow((x - 0.5) * 1.58740105, 3) + 0.5; // Distribution function
}