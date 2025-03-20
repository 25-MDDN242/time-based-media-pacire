// Update this function to draw you own maeda clock on a 960x500 canvas
function draw_clock(obj) {
  // YOUR MAIN CLOCK CODE GOES HERE

 // draw your own clock here based on the values of obj:
    //    obj.hours goes from 0-23
    //    obj.minutes goes from 0-59
    //    obj.seconds goes from 0-59
    //    obj.millis goes from 0-999
    

  angleMode(DEGREES);

  let secondsToDegrees = map(obj.seconds, 0, 59, 0, 360);
  textSize(40);
  textAlign(CENTER, CENTER);
  background(0);

  push();
  translate(width / 2, height / 2);
  rotate(secondsToDegrees);
  fill(200);
  if (obj.hours <= 0 && obj.hours < 12) {
    text('AM', 0, 0);
  } else {
    text('PM', 0, 0);
  }
  fill(255); // dark grey
  text(obj.minutes, 0, -140);
  fill(255,0,0);
  text(':', 0, -185);
  fill(255);
  text(obj.hours, 0, -220);
  pop();
 }