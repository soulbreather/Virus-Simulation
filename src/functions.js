// Updates all slider values to match the sim size
function updateSliderValues() {
  var newMax = document.getElementById("peopleSlider").value;
  document.getElementById("infectedSlider").max = newMax;
  document.getElementById("foolsSlider").max = newMax - document.getElementById("infectedSlider").value;
}

// Updates the text value of hygiene
function updateHygieneValue() {
  let sliderValue = document.getElementById("hygieneSlider");
  let hygieneText = document.getElementById("hygieneText");

  hygieneText.innerHTML = sliderValue.value;

  return int(hygieneText.innerHTML);
}

// Updates the text value of fools
function updateFoolsValue() {
  let foolsValue = document.getElementById("foolsSlider");
  let foolsText = document.getElementById("foolsText");

  foolsText.innerHTML = foolsValue.value;

  return int(foolsText.innerHTML);
}

// Updates the text value of infected
function updateInfectedValue() {
  let infectedValue = document.getElementById("infectedSlider");
  let infectedText = document.getElementById("infectedText");

  infectedText.innerHTML = infectedValue.value;

  return int(infectedText.innerHTML);
}

// Updates the text value of infected
function updatePeopleValue() {
  let peopleValue = document.getElementById("peopleSlider");
  let peopleText = document.getElementById("peopleText");

  peopleText.innerHTML = peopleValue.value;

  return int(peopleText.innerHTML);
}




// Starts|restarts the simulation when called
function run() {
  amount_of_people = peopleNumber;
  amount_of_infected = infectedNumber;
  amount_of_fools = foolsNumber;


  for (let i = 0; i < amount_of_people; i++) {
    count = i;

    if (i < amount_of_infected) {
      list_of_people[i] = new People(true, false);
    }
    if (i >= amount_of_infected) {
      list_of_people[i] = new People(false, false);
    }
  }

  for (let f = 0; f < amount_of_fools; f++) {
    if (!list_of_people[f].infected && !list_of_people[f].fool) {
      list_of_people[f].fool = true
    } else {
      amount_of_fools += 1;

    }
  }

  start = true;
}

// Checks if any of the circles er touching|(intercepting)
function isTouching(i) {

  for (let j = 0; j < amount_of_people; j++) {
    let distance = dist(list_of_people[i].x_pos, list_of_people[i].y_pos, list_of_people[j].x_pos, list_of_people[j].y_pos);

    if (i != j && distance <= list_of_people[j].diameter / hygieneNumber && !list_of_people[i].fool && !list_of_people[j].fool) {

      if (list_of_people[j].infected || list_of_people[i].infected) {
        list_of_people[j].infected = true;
        list_of_people[i].infected = true;
      }
    } else if (i != j && distance <= list_of_people[j].diameter && list_of_people[i].fool || i != j && distance <= list_of_people[j].diameter && list_of_people[j].fool) {
      if (list_of_people[j].infected || list_of_people[i].infected) {
        list_of_people[j].infected = true;
        list_of_people[i].infected = true;

        list_of_people[i].fool = false;
        list_of_people[j].fool = false;
      }
    }
  }
}

// Updates the countdowns of all infected circles
function infectedChecker() {
  for (let i = 0; i < amount_of_people; i++) {

    // fjerner infected not defined error
    try {
      if (list_of_people[i].infected) {
        list_of_people[i].infectedDuration();
      }
    } catch (error) {

    }
  }
}