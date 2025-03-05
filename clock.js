/*
 * use p5.js to draw a clock on a 960x500 canvas
 */

function draw_clock(obj) {
  // draw your own clock here based on the values of obj:
  //    obj.hours goes from 0-23
  //    obj.minutes goes from 0-59
  //    obj.seconds goes from 0-59
  //    obj.millis goes from 0-999
  //    obj.seconds_until_alarm is:
  //        < 0 if no alarm is set
  //        = 0 if the alarm is currently going off
  //        > 0 --> the number of seconds until alarm should go off

  background(35,65,140); //  dark blue
  fill(200); // dark grey
  textSize(40);
  textAlign(CENTER, CENTER);
  angleMode(DEGREES);
  // text("YOUR MAIN CLOCK CODE GOES HERE", width / 2, 200);

  let secondRotate = map(obj.seconds, 0, 59, 0, 360);
  let minuteRotate = map(obj.minutes, 0, 59, 0, 360);
  let hourRotate = map(obj.hours, 0, 23, 0, 720);


  fill(255);
  ellipse(width/2, height/2, 250);
  
  // For Seconds
  push();
  translate(width/2, height/2);
  rotate(secondRotate);

  fill(0);
  ellipse(0, 62, 5, 125);
  pop();

  // For Minutes
  push();
  translate(width/2,height/2);
  rotate(minuteRotate);

  fill(0);
  ellipse(0, 62, 10, 125);
  pop();

  // For Hours
  push();
  translate(width/2,height/2);
  rotate(hourRotate);

  fill(0);
  ellipse(0, 62, 10, 125);
  pop();

  // fill(249, 140, 255);// pink
  // ellipse(width / 3, 350, 150);
  // fill(140, 255, 251) // blue
  // ellipse(width / 2, 350, 150);
  // fill(175, 133, 255); // purple
  // ellipse(width / 3 * 2, 350, 150);

}


function setGradient(c1, c2) { //Code used from https://editor.p5js.org/REAS/sketches/S1TNUPzim
  noFill();
  for (var y = 0; y < height; y++) {
    var inter = map(y, 0, height, 0, 1);
    var c = lerpColor(c1, c2, inter);
    stroke(c);
    line(0, y, width, y);
    }
}