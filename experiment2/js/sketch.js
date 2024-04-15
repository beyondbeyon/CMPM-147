// sketch.js - generate landscape with a perlin noise fuction
// Author: Bryon Anderson
// Date: 4/15/24

// Here is how you might set up an OOP p5.js project
// Note that p5.js looks for a file called sketch.js

// Constants - User-servicable parts
// In a longer project I like to put these in a separate file
/* exported setup, draw */
let seed = 20;

var t = [];
var m = 200;
var xoff = 50;
var yoff = 0;
var i = 0.03;

const sky_color = "#7782B0";
const cloud_color = "#FFFFFF"
const ground_color = "#4B543F"
const rock_color = "#7B6315"

function setup() {
  createCanvas(500, 300, WEBGL);
  createButton("reload").mousePressed(() => seed++);
  angleMode(DEGREES);
  
  for(var y = 0; y < 60; y++){
    t.push([]);
    xoff = 0;
    for(var x = 0; x < 60; x++){
      t[y][x] = map(noise(xoff, yoff), 0, 1, -m, m);
      xoff += i;
    }
    yoff += i
  }
}

function draw() {
  randomSeed(seed);
  background(ground_color);
  
  stroke(rock_color);
  
  fill(sky_color);
  rect(-400, -200, width * 6, height/ 2.3);
  
  fill("#7B6315")
  ellipse(-mouseX, -200, 33, 33);   // Top circle
  
  fill(cloud_color)
  const clouds = 30*random();
  for(let i = 0; i < clouds; i++){
    let z = random();
    let x = width * ((random(-1,.20) + ((mouseX/width)/50 + millis() / 500000.0) / z) % 1);
    let s = -width / 50 / z;
    let y = random(-100, -65)
    rect(x, y , x - s / 90, random(10, y/2));
  }
  
  fill(ground_color)
  rotateX(70);
  translate(-width/2, -height/2);
  for(var y = 0; y < 60; y++){
    beginShape(TRIANGLE_STRIP);
    for(var x = 0; x < 60; x++){
      vertex(x * 10, y * 10, t[y][x]);
      vertex(x * 10, (y + 1) * 10, t[y][x]);
    }
    endShape(CLOSE);
  }

}