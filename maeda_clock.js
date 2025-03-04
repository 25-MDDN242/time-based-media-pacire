// Update this function to draw you own maeda clock on a 960x500 canvas
function draw_clock(obj) {
  // YOUR MAIN CLOCK CODE GOES HERE

 // draw your own clock here based on the values of obj:
    //    obj.hours goes from 0-23
    //    obj.minutes goes from 0-59
    //    obj.seconds goes from 0-59
    //    obj.millis goes from 0-999

  const radial_step = 360/(6*6);
  angleMode(DEGREES);
  noStroke();

  let diameter_step = min(height, width) / 10;
  let angle = map(obj.millis % 6000, 0, 6000, 0, 360);

  let h = obj.hours;
  let m = obj.minutes;

  if (h < 10){
    h = ' '+h;
  }
  if (m < 10){
    m = ' '+m;
  }

  let text = h+':'+m+' ';

  background(50); //  beige
  for (let i = 6; i >= 0; i--) {
    for (let j = 0; j < 5; j++) {
      for (let k = 0; k < 6; k++) {
        fill(255);
        if (text[k] == ' ' || font[text[k]][6-i][j] == 0) {
          continue;
        }

        let hasRightNeigh = (j+1 < 5 && font[text[k]][6-i][j+i] == 1);
        let pad = hasRightNeigh ? 1 : 0;

        arc(0, height/2, diameter_step*(i+3), diameter_step*(i+3), 
        radial_step*(angle + k*6 + j), radial_step*(angle + k*6 + j+1)+pad);

        arc(width, height/2, diameter_step*(i+3), diameter_step(i*3), radial_step*(angle + k*6 + j), radial_step*(angle + k*6 + j+1)+pad);
      }
      fill(0);
    }
    ellipse(0, height/2, diameter_step*(i+2) - 1);
    ellipse(width, height/2, diameter_step*(i+2) - 1);
  }
  // fill(200); // dark grey

  // let secondsToDegrees = map(obj.seconds, 0, 59, 0, 360);
  // textSize(40);
  // textAlign(CENTER, CENTER);
  // text("YOUR MAEDA CLOCK CODE GOES HERE", width/2, height/2);
  
  // push();
  // translate(width/2, height/2);
  // ellipse(0,0,30);
  // rotate(secondsToDegrees);

  // console.log(obj.seconds)

  // rect(120, 20, 55, 55);
  // ellipse(130, 20, 80, 80);
  // pop();

  // let angle = map(obj.millis % 999, 0, 999, 0, PI * 2);
  // translate(width/2, 0);
  
  // push();
  // rotate(sin(angle) * 0.5);
  // translate(0, height - 50);

  // fill(255);
  // if (obj.hours >= 10) {
  //   draw_character(floor(obj.hours / 10), -60, 0);
  // }
  // draw_character(obj.hours % 10, -30, 0);

  // draw_character(':', 0, 0);

  // draw_character(floor(obj.minutes / 10), 30, 0);
  // draw_character(obj.minutes % 10, 60, 0);
  // pop();

  // push();
  // rotate(-sin(angle) * 0.5);
  // translate(0, height - 50);

  // fill(128);
  // draw_period(obj.hours);
  // pop();

}

function draw_period(hour) {
  if (hour < 12) {
    draw_character('A', -15, 0);
  } else {
    draw_character('P', -15, 0);
  }
  draw_character('M', 15, 0);
}

function draw_character(character, x, y) {
  let dots = font[character];
  for (let row = 0; row < dots.length; row++) {
    for (let col = 0; col < dots.length; col++) {
      if (dots[row][col] === 1){
        ellipse(x + 5 * col - 10, y + 5 * row - 15, 5, 5);
      }
    }
  }
}