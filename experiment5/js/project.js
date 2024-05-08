/* exported p4_inspirations, p4_initialize, p4_render, p4_mutate */


function p4_inspirations() {
  return [
    {name: 'Fuji', assetUrl:"img\Fuji.jpg" },
    {name: 'Nature', assetUrl:"img\Nature.jpg"},
    {name: 'Chameleon', assetUrl:"img\Chameleon.jpg"}]
}

function p4_initialize(inspiration) {
  // set the canvas size based on the container
  let canvasContainer = $('.image-container'); // Select the container using jQuery
  let canvasWidth = canvasContainer.width(); // Get the width of the container
  let aspectRatio = inspiration.image.height / inspiration.image.width;
  let canvasHeight = canvasWidth * aspectRatio; // Calculate the height based on the aspect ratio
  resizeCanvas(canvasWidth, canvasHeight);
  $(".caption").text(inspiration.credit); // Set the caption text

  // add the original image to #original
  const imgHTML = `<img src="${inspiration.assetUrl}" style="width:${canvasWidth}px;">`
  $('#original').empty();
  $('#original').append(imgHTML);

  
  let design = {
    bg: 520,
    fg: []
  }
  
  for(let i = 0; i < 100; i++) {
    design.fg.push({x: random(width),
      y: random(height),
      w: random(width/2),
      h: random(height/2),
      fill: random(255)})
  }
  
  if(inspiration.name == 'Nature'){

    let design = {
      bg: 230,
      fg: []
    }

    for(let i = 0; i < 100; i++) {
      design.fg.push({x: random(width),
        y: random(height),
        w: random(width/2),
        h: random(height/2),
        fill: random(255)})
    }
  }
  return design;
}


function p4_render(design, inspiration) {
  background(design.bg);
  noStroke();
  for(let box of design.fg) {
    fill(box.fill, 52, 235, 76);
    rect(box.x, box.y, box.w, box.h);
  }
}

function p4_mutate(design, inspiration, rate) {
  design.bg = mut(design.bg, 79, 52, 235, rate)
  for(let box of design.fg){
    box.fill = mut(box.fill, 79, 200, rate);
    box.x = mut(box.x, 0, width, rate);
    box.y = mut(box.y, 0, height, rate);
    box.w = mut(box.w, 0, width/2, rate);
    box.h = mut(box.h, 0, height/2, rate);
  }
}

function mut(num, min, max, rate) {
    return constrain(randomGaussian(num, (rate * (max - min)) / 10), min, max);
}
