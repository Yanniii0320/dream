let fires = []
let fires_num = 80;
//let bg_color = 'white'
let step = 8;
let mic;
var song;
var button;


function preload(){
  song = loadSound('polla.cut.mp3');
}

function makeAdream(){
  if(song.isPlaying()){
    song.pause();
  }else{
      song.play();
    }
  
}
function setup() {
   canvas = createCanvas(windowWidth, windowHeight);
  colorMode(HSB, 360);
  button = createButton('makeAdream');
  button.mousePressed(makeAdream);
  song.play();
  mic = new p5.AudioIn();
  mic.start();
  noFill();
  for (let i = fires_num; i--;)
    fires[i] = createVector(random(width * .1, width * .9), random(height * .1, height * .9))

  }

function draw (){
  var quantity = frameCount / 30
  var vol = mic.getLevel();
  stroke(map(cos(randomGaussian()*vol*300), -1, 1, 0, 200), 360, 360)
  strokeWeight(randomGaussian()*vol*300)
  //gaussian会返回一个0到1之间的任任意数值，会十分接近于平均数
  for (let {x, y} of fires) {
    beginShape()
    for (let i = 60; i--;) {
      let degree = randomGaussian()*quantity
      for (var b of fires) degree += sin(b.y - y, b.x - x) * 2
      vertex(x += randomGaussian()*cos(degree) * step, y += sin(randomGaussian()*degree) * step)
    }
    endShape()
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}