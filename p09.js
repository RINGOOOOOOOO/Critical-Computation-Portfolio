let scene = 0
let video;

function setup() {
  checkbox = createCheckbox("Consent to Use the Camera");
  checkbox.position(20, 20);
  checkbox.changed(pixelcamera);
  
  /* styling in CSS for checkbox */
  checkbox.style("color", "white")
  checkbox.style("background", "pink")
  checkbox.style("font-size", "20px")

  
  // background('#F9E79F');
  createCanvas(window.innerWidth,
    window.innerHeight, WEBGL);
  video = createCapture(VIDEO);
  video.size(width,height);
  video.hide();
  noStroke()
}


function draw() {
	if (checkbox.checked()) {
      pixelcamera()
    } else {
      background('pink')
    }
}

function pixelcamera() {
  
  // background(0)
  pointLight(255,255,255,width/2,height/2,300)
  ambientLight(255)
  video.loadPixels();
  
  let boxSize = int(map(mouseX,0,width,12,32));
  
  for(let y=0;y<video.height;y+=boxSize){
    for(let x=0;x<video.width;x+=boxSize){
      let index = (x +y*video.width)*4;
      let r = video.pixels[index];
      let g = video.pixels[index+1];
      let b = video.pixels[index+2];
      let a = video.pixels[index+3];
      let h = 1-r/255
      push()
      fill(r,g,b,a)
      translate(x-width/2,y-height/2,boxSize/2);
      rotateZ(h*TWO_PI)
      box(boxSize-2,boxSize-2,h*boxSize*20)
      pop()
    }
  }
}