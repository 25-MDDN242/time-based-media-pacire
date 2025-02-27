// Update this function to draw you own maeda clock on a 960x500 canvas
function draw_clock(obj) {
  // YOUR MAIN CLOCK CODE GOES HERE

 // draw your own clock here based on the values of obj:
    //    obj.hours goes from 0-23
    //    obj.minutes goes from 0-59
    //    obj.seconds goes from 0-59
    //    obj.millis goes from 0-999

  background(50); //  beige
  fill(200); // dark grey
  angleMode(DEGREES);
  let secondsToDegrees = map(obj.seconds, 0, 59, 0, 360);
  // textSize(40);
  // textAlign(CENTER, CENTER);
  // text("YOUR MAEDA CLOCK CODE GOES HERE", width/2, height/2);
  
  push();
  translate(width/2, height/2);
  ellipse(0,0,30);
  rotate(secondsToDegrees);

  console.log(obj.seconds)

  rect(120, 20, 55, 55);
  ellipse(130, 20, 80, 80);
  pop();

}
