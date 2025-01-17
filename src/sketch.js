// Predefining every variable necessary
let amount_of_people = 100;
let amount_of_fools;
count = 0;
list_of_people = [];
let start = false;
let data;

let peopleNumber;
let hygieneNumber;
let foolsNumber;
let infectedNumber;

function setup() {

  // Updates values corresponding with the slider values
  peopleNumber = updatePeopleValue();
  amount_of_people = peopleNumber;
  updateSliderValues();
  hygieneNumber = updateHygieneValue();
  foolsNumber = updateFoolsValue();
  infectedNumber = updateInfectedValue();

  // Creates the canvas
  canvas = createCanvas(500, 500);
  canvas.parent('canvas-holder');

  // Makes buttons functional
  document.getElementById('startSim').onclick = () => run();
  document.getElementById('resume').onclick = () => loop();
  document.getElementById('pause').onclick = () => noLoop();

  // Calls infectedChecker every 1000 milliseconds
  setInterval(infectedChecker, 1000);
  setInterval(updateGraph, 200);
  setInterval(updateGraphSlow, 5000);

}

// This function is called 60 times a second
function draw() {
  background(144, 144, 144);

  // This updates the people
  if (start) {
    for (let i = 0; i < amount_of_people; i++) {
      list_of_people[i].drawPerson();
      list_of_people[i].move();
      if (!list_of_people[i].dead || !list_of_people[i].recovered)
        isTouching(i);

    }
  }

  // This updates slider values and corresponding values within the program
  updateSliderValues();
  peopleNumber = updatePeopleValue();
  hygieneNumber = updateHygieneValue();
  foolsNumber = updateFoolsValue();
  infectedNumber = updateInfectedValue();

}

// This is a class for making people
class People {
  constructor(infected, fool) {
    // Defining necessary variables
    this.infected = infected;
    this.diameter = 10;
    this.x_pos = random(this.diameter, width - this.diameter);
    this.y_pos = random(this.diameter, height - this.diameter);
    this.fool = fool;
    this.recovered = false;
    this.dead = false;
    if (!this.infected) {
      this.healthy = true;
    }

    // Chance|(count) of death or suvival
    this.survival_count = int(random(0, 100));
    this.count = int(random(10, 30));

    this.healthiness = 30;
  }

  // Draws the person on the canvas
  drawPerson() {
    // State detection for deciding the color of the person
    if (this.infected) {
      fill(255, 0, 0);
    }
    if (!this.fool && !this.infected && !this.dead && !this.recovered) {
      fill(240);
    }
    if (this.fool && !this.infected) {
      fill(255, 0, 255);
    }
    if (this.dead && !this.recovered) {
      fill(0, 0, 0);
    }
    if (this.recovered) {
      fill(0, 255, 0);
    }

    // creates an outline around the circle
    stroke(0);
    strokeWeight(.5);
    circle(this.x_pos, this.y_pos, this.diameter);
  }

  // Counts the duration the person has till he/she dies or recovers
  infectedDuration() {
    // Counts go down by 1
    this.count -= 1;
    this.recovery_count -= 1;

    // Deciding if the person lives or dies
    if (this.survival_count >= this.healthiness && !this.dead && this.count == 0) {
      this.infected = false;
      this.recovered = true;
      this.healthy = false;
      this.fool = false;
      this.dead = false;

    }

    if (this.survival_count < this.healthiness && !this.recovered && this.count == 0) {
      this.infected = false;
      this.healthy = false;
      this.fool = false;
      this.recovered = false;
      this.dead = true;

    }
  }

  // This funcition just moves the person on screen randomly
  move() {
    this.speed_x = random(-5, 5);
    this.speed_y = random(-5, 5);

    if (!this.dead) {

      if (this.x_pos >= width - this.diameter / 2) {
        this.speed_x = -Math.abs(this.speed_x);
      }
      if (this.x_pos <= this.diameter / 2) {
        this.speed_x = Math.abs(this.speed_x);
      }
      if (this.y_pos >= width - this.diameter / 2) {
        this.speed_y = -Math.abs(this.speed_y);
      }
      if (this.y_pos <= this.diameter / 2) {
        this.speed_y = Math.abs(this.speed_y);
      }

      this.x_pos += this.speed_x;
      this.y_pos += this.speed_y;
    }
  }
}