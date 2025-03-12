/*
 * use p5.js to draw a clock on a 960x500 canvas
 */

function draw_clock(obj) { //Code used and changed from https://editor.p5js.org/Pole/sketches/AotekHRKA and https://editor.p5js.org/anjchang/sketches/S_rkFOKoP
  // draw your own clock here based on the values of obj:
  //    obj.hours goes from 0-23
  //    obj.minutes goes from 0-59
  //    obj.seconds goes from 0-59
  //    obj.millis goes from 0-999
  //    obj.seconds_until_alarm is:
  //        < 0 if no alarm is set
  //        = 0 if the alarm is currently going off
  //        > 0 --> the number of seconds until alarm should go off

  let sunPhase = map(obj.hours, 0, 12, 0, 255, true);
  let moonPhase = map(obj.hours, 13, 23, 0 ,255, true);

  // let skyColor = obj.hours >= 1 && obj.hours < 13 ?
  //   color(135, 206, 235, sunPhase):
  //   color(35, 65, 140, moonPhase);

  // //Background Color
  // setGradient(skyColor, skyColor);

  moon_color = color(255);
  sun_color = color(255,255,75);
 
 // bacground(sun_color);
  textSize(40);
  textAlign(CENTER, CENTER);
  angleMode(DEGREES);
  // text("YOUR MAIN CLOCK CODE GOES HERE", width / 2, 200);

  let secondRotate = map(obj.seconds, 0, 59, 0, 360);
  let minuteRotate = map(obj.minutes, 0, 59, 0, 360);
  let hourRotate = map(obj.hours, 0, 23, 0, 720);

  let bg_color = color(35, 65, 140);
  let light_color = color(255, 255, 75, 255);
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
    color3 = light_color;
    color4 = light_color;
    color1 = light_color;
    color2 = bg_color;
  } else if (180 < a && a <= 270) {
    color1 = light_color;
    color3 = bg_color;
    color4 = bg_color;
    color2 = bg_color;
  } else if (90 < a && a <= 180) {
    color4 = bg_color;
    color2 = light_color;
    color1 = bg_color;
    color3 = bg_color;
  } else if (0 <= a && a <= 90) {
    color4 = color(0, 255, 0, 0);
    color3 = light_color;
    color1 = bg_color;
    color2 = light_color;
  }
  
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

// Determining whether this code will be used as of right now
// function moonPhase(phaseX, phaseY, d2, a, sun_color, moon_color) { //Code used from https://editor.p5js.org/Pole/sketches/AotekHRKA and https://editor.p5js.org/anjchang/sketches/S_rkFOKoP
  
//   let color1 = color(0, 25, 25, 0);
//   let color2 = color(0, 25, 25, 0);
//   let color3 = color(0, 25, 25, 0);
//   let color4 = color(0, 25, 25, 0);

//   if (-Math.PI/2 < a && a < 0) {
//     color3 =  sun_color;
//     color4 = sun_color;
//     color1 = sun_color;
//     color2 = moon_color;
//   }
//   else if (-Math.PI < a && a < -Math.PI/2) {
//     color1 = sun_color;
//     color3 = moon_color;
//     color4 = moon_color;
//     color2 = moon_color;
//   }
//   else if (-3*Math.PI/2 < a && a < -3*Math.PI) {
//     color4 = moon_color;
//     color2 = sun_color;
//     color1 = moon_color;
//     color3 = moon_color;
//   }
//   else if (-2*Math.PI < a && a < -3*Math.PI/2) {
//     color4 = color(0,255,0,0);
//     color3 = sun_color;
//     color1 = moon_color;
//     color2 = sun_color;
//   }

//   fill(color1);
//   arc(phaseX, phaseY, d2, d2, PI/2, 3 * PI/2);
//   fill(color2);
//   arc(phaseX, phaseY, d2, d2, 3 * PI/2, PI/2);

//   let heightphase = d2;
//   let widthphase = map(Math.cos(a), 0, 1, 0, d2);

//   fill(color3);
//   arc(phaseX, phaseY, widthphase - 2, heightphase + 1, PI/2, 3 * PI/2);
//   fill(color4);
//   arc(phaseX, phaseY, widthphase - 2, heightphase + 1, 3 * PI/2, PI/2);
// }