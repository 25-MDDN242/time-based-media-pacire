/*
 * use p5.js to draw a clock on a 960x500 canvas
 */
var skoll;
var hati;
var jormungandr;

//Link to original image https://uk.pinterest.com/pin/390405861449185880/ was tweaked with adobe photoshop
function preload() {
  skoll = loadImage("Skoll.png");
  hati = loadImage("Hati.png");
  jormungandr = loadImage("Jormungandr.png");
}

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

  //Maps for the rotation of objects
  let millisRotate = map(obj.millis, 0, 999, 0, 360);
  let secondRotate = map(obj.seconds, 0, 59, 0, 360);
  let minuteRotate = map(obj.minutes, 0, 59, 0, 360);
  let hourRotate = map(obj.hours, 0, 23, 0, 720);

  //Default Background Color
  let bg_color = color(0);

  //Shifting the Background Color
  if (obj.seconds_until_alarm < 0) {
    if (obj.hours >= 0 && obj.hours < 12) {
      bg_color = lerpColor(color(19,0,61), color(135, 206, 235), map(obj.hours, 0, 12, 0, 1, true));
    } else if (obj.hours >= 12 && obj.hours <= 23) {
      bg_color = lerpColor(color(135, 206, 235), color(19,0,61), map(obj.hours, 12, 23, 0, 1, true));
    }
  } else if (obj.seconds_until_alarm > 0) {
    if (obj.seconds >= 0 && obj.seconds < 29) {
      bg_color = lerpColor(color(19,0,61), color(135, 206, 235), map(obj.seconds, 0, 29, 0, 1, true));
    } else if (obj.seconds >= 29 && obj.seconds <= 59) {
      bg_color = lerpColor(color(135, 206, 235), color(19,0,61), map(obj.seconds, 29, 59, 0, 1, true));
    }
  } else {
    if (obj.millis >= 0 && obj.millis < 499) {
      bg_color = lerpColor(color(23,30,40), color(0), map(obj.millis, 0, 499, 0, 1, true));
    } else if (obj.millis >= 499 && obj.millis <= 999) {
      bg_color = lerpColor(color(0), color(23,30,40), map(obj.millis, 499, 999, 0, 1, true));
    }
  }
  background(bg_color);

  //Setting The Color of the Sun and Moon
  let moon_color = color(0);
  let sun_color = color(0);
  if (obj.seconds_until_alarm < 0 || obj.seconds_until_alarm > 0) {
    moon_color = color(255);
    sun_color = color(255, 204, 51, 255);
  } else {
    moon_color = color(0);
    sun_color = color(23,30,40);
  }

  //Shifting the moon phase transition depending on alarm setting
  let a = 0;
  if (obj.seconds_until_alarm < 0) {
    a = map(obj.hours, 0, 23, 360, 0);
  } else if (obj.seconds_until_alarm > 0) {
    a = map(obj.seconds, 0, 59, 360, 0);
  } else {
    a = map(obj.millis, 0, 999, 360, 0);
  }

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
  fill(139, 69, 19, 190);
  ellipse(phasex, phasey, d2 + 200, d2 + 200); // Outer ring

  fill(bg_color); // Background color to create cut-out effect
  ellipse(phasex, phasey, d2 + 125, d2 + 125); // Inner cut-out (hole)

  // Norse Runes
  let runes = ["ᚠ", "ᚢ", "ᚦ", "ᚨ", "ᚱ", "ᚲ", "ᚷ", "ᚹ", "ᚻ", "ᚾ", "ᛁ", "ᛃ",
    "ᛇ", "ᛈ", "ᛉ", "ᛊ", "ᛏ", "ᛒ", "ᛖ", "ᛗ", "ᛚ", "ᛜ", "ᛟ", "ᛞ"];
  let radius = 206; // Adjust for spacing

  let runeColor = color(0);

  let ellipseCenterX = width / 2;  // Adjust if your ellipse center isn't exactly in the middle
  let ellipseCenterY = height / 2 - 50; // Adjust based on your existing drawing

  if (obj.seconds_until_alarm < 0 || obj.seconds_until_alarm > 0) {
    fill(runeColor);
    push();
    translate(ellipseCenterX, ellipseCenterY);
    rotate(minuteRotate);
    for (let i = 0; i < runes.length; i++) {
      let angle = map(i, 0, runes.length, 0, 360); // Convert index to degrees
      let x = radius * cos(angle);
      let y = radius * sin(angle);

      push();
      translate(x, y);
      rotate(-minuteRotate); // Adjust rotation for readability
      fill(0);
      text(runes[i], 0, 50);
      pop();
    }
    pop();
  } else {
    if (obj.millis >= 0 && obj.millis < 499) {
      runeColor = lerpColor(color(0), color(255), map(obj.millis, 0, 499, 0, 1, true));
    } else if (obj.millis >= 499 && obj.millis <= 999) {
      runeColor = lerpColor(color(255), color(0), map(obj.millis, 499, 999, 0, 1, true));
    }
    fill(runeColor);
    push();
    translate(ellipseCenterX, ellipseCenterY);
    rotate(secondRotate);
    for (let i = 0; i < runes.length; i++) {
      let angle = map(i, 0, runes.length, 0, 360); // Convert index to degrees
      let x = radius * cos(angle);
      let y = radius * sin(angle);

      push();
      translate(x, y);
      rotate(-secondRotate); // Adjust rotation for readability
      text(runes[i], 0, 50);
      pop();
    }
    pop();
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

  // imageMode(CENTER);
  // push();
  // translate(0, height / 2);
  // rotate(-secondRotate + 1700);
  // image(jormungandr, 0, 0, -400, -400);
  // pop();

  // push();
  // translate(width, height / 2);
  // rotate(-secondRotate);
  // image(jormungandr, 0, 0, 400, 400);
  // pop();

  if (obj.seconds_until_alarm < 0) {
    imageMode(CENTER);
    push();
    translate(width / 2, height / 2);
    rotate(secondRotate);
    image(skoll, -140, 0, 150, 150);
    image(hati, 150, 0, 150, 150);
    fill(sun_color);
    ellipse(0, -160, 30, 30);
    fill(moon_color);
    ellipse(0, 160, 30, 30);
    pop();

  } else if (obj.seconds_until_alarm > 0) {
    imageMode(CENTER);
    push();
    translate(width / 2, height / 2);
    rotate(secondRotate);
    fill(sun_color);
    ellipse(0, -160, 30, 30);
    fill(moon_color);
    ellipse(0, 160, 30, 30);
    pop();

    push();
    translate(width / 2, height / 2);
    rotate(millisRotate);
    image(skoll, -140, 0, 150, 150);
    image(hati, 150, 0, 150, 150);
    pop();


  } else {
    imageMode(CENTER);
    push();
    translate(width / 2, height / 2);
    rotate(millisRotate);
    image(skoll, -140, 0, 150, 150);
    image(hati, 150, 0, 150, 150);
    pop();
  }
}

//Code used from https://editor.p5js.org/REAS/sketches/S1TNUPzim, Determining whether if used
function setGradient(c1, c2) {
  noFill();
  for (var y = 0; y < height; y++) {
    var inter = map(y, 0, height, 0, 1);
    var c = lerpColor(c1, c2, inter);
    stroke(c);
    line(0, y, width, y);
  }
}
