/*
 * use p5.js to draw a clock on a 960x500 canvas
 */

//Code used and changed from https://editor.p5js.org/Pole/sketches/AotekHRKA and https://editor.p5js.org/anjchang/sketches/S_rkFOKoP
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

  textSize(40);
  textAlign(CENTER, CENTER);
  angleMode(DEGREES);
  // text("YOUR MAIN CLOCK CODE GOES HERE", width / 2, 200);

  let secondRotate = map(obj.seconds, 0, 59, 0, 360);
  let minuteRotate = map(obj.minutes, 0, 59, 0, 360);
  let hourRotate = map(obj.hours, 0, 23, 0, 720);

  //Default Background Color
  let bg_color = color(0);

  //Shifting the Background Color
  if (obj.hours >= 0 && obj.hours < 12) {
    bg_color = lerpColor( color(35, 65, 140), color(135, 206, 235), map(obj.hours, 0, 12, 0, 1, true));
  } else if (obj.hours >= 12 && obj.hours <= 23) {
    bg_color = lerpColor(color(135, 206, 235), color(35, 65, 140), map(obj.hours, 12, 23, 0, 1, true));
  }
  
  let moon_color = color(255);
  let sun_color = color(255, 204, 51, 255);
  background(bg_color);

  // Map hours to a smooth moon phase cycle (0 - 24 scaled to -2PI to 0)
  let time = obj.hours + obj.minutes / 60 + obj.seconds / 3600;
  let a = map(time, 0, 24, 360, 0); // Smooth moon phase transition

  noStroke();
  let phasex = width / 2;
  let phasey = height / 2;
  let d2 = (2 * height) / 4;

  let color1 = color(0, 25, 25, 0);
  let color2 = color(0, 25, 25, 0);
  let color3 = color(0, 25, 25, 0);
  let color4 = color(0, 25, 25, 0);

  if (270 < a && a <= 360) {
    color3 = moon_color;
    color4 = moon_color;
    color1 = moon_color;
    color2 = sun_color;
  } else if (180 < a && a <= 270) {
    color1 = moon_color;
    color3 = sun_color;
    color4 = sun_color;
    color2 = sun_color;
  } else if (90 < a && a <= 180) {
    color4 = sun_color;
    color2 = moon_color;
    color1 = sun_color;
    color3 = sun_color;
  } else if (0 <= a && a <= 90) {
    color4 = color(0, 255, 0, 0);
    color3 = moon_color;
    color1 = sun_color;
    color2 = moon_color;
  }

  // Donut Shape (Stationary)
  noStroke();
  fill(139, 69, 19, 190); // Light golden glow
  ellipse(phasex, phasey, d2 + 200, d2 + 200); // Outer ring

  fill(bg_color); // Background color to create cut-out effect
  ellipse(phasex, phasey, d2 + 125, d2 + 125); // Inner cut-out (hole)

  ellipseMode(CENTER);
  fill(color1);
  arc(phasex, phasey, d2, d2, 90, 270);
  fill(color2);
  arc(phasex, phasey, d2, d2, 270, 90);

  let heightPhase = d2;
  let widthPhase = map(cos(a), 0, 1, 0, d2);

  fill(color3);
  arc(phasex, phasey, widthPhase - 2, heightPhase + 1, 90, 270);
  fill(color4);
  arc(phasex, phasey, widthPhase - 2, heightPhase + 1, 270, 90);

  if (obj.seconds_until_alarm < 0) {
    // For Seconds
    push();
    translate(width / 2, height / 2);
    rotate(secondRotate);

    fill(0);
    ellipse(0, 150, 20, 20);
    pop();

    // For Minutes
    push();
    translate(width / 2, height / 2);
    rotate(minuteRotate);

    fill(0);
    ellipse(0, 175, 20, 20);
    pop();

    // // For Hours
    // push();
    // translate(width / 2, height / 2);
    // rotate(hourRotate);

    // fill(0);
    // ellipse(0, 62, 10, 125);
    // pop();

  } else if (obj.seconds_until_alarm > 0) {

  } else {
    translate(width / 2, height/ 2);
    fill(0)
    ellipse(0, -150, 20, 20);
    ellipse(0, -175, 20, 20);
  }
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
