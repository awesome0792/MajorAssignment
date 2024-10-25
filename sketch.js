// We define our palette
let palette = ["#2c695a", "#4ad6af", "#7facc6", "#4e93cc", "#f6684f", "#ffd300"];
let available_brushes;

function setup () {
   createCanvas(windowWidth, windowHeight, WEBGL)
   angleMode(DEGREES);
   background("#fffceb");

   // Scale brushes to adapt to canvas size
  //  brush.scaleBrushes(1.5);
   brush.add("watercolor", {
    type: "custom",
    weight: 5,
    vibration: 0.08,
    opacity: 90,
    spacing: 0.6,
    blend: true,
    pressure: {
        type: "standard",
        min_max: [1.35,1],
        curve: [0.35,0.25] // Values for the bell curve
    },
    tip: (_m) => {
       // in this example, the tip is composed of two squares, rotated 45 degrees
       // Always execute drawing functions within the _m buffer!
       _m.rotate(45), _m.rect(-1.5,-1.5,3,3), _m.rect(1,1,1,1);
    },
    rotate: "natural",
})
   // brush.box() returns an array with available brushes
   available_brushes = brush.box();
   console.log(available_brushes);

}

function draw() {
  frameRate(10);
  // translate(width/2,height/2);
   
  // Activate the flowfield we're going to use
  brush.field("curved");
   
  // Set the stroke to a random brush, color, and weight = 1
  // You set a brush like this: brush.set(name_brush, color, weight)  
  // brush.set("marker", random(palette), 2)
  brush.pick("watercolor");
  brush.fill(244, 15, 24, 0.99);

  // Draw a random flowLine (x, y, length, direction)
  brush.flowLine(random(width), random(height), random(300,800), random(0,360))
  brush.circle(random(-width/2,width/2),random(-height/2,height/2),0,3);
  brush.noField();
  // fill(10);
  // rect(0,0,100,10);
}
