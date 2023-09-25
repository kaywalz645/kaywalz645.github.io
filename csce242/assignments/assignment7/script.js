window.onload = () => {
  document.getElementById("ex1").onclick = exercise1;
  document.getElementById("ex2").onclick = exercise2;
  document.getElementById("calculate-age").onclick = calculateAge;
  document.getElementById("thermometer-button").onclick = donationThermometer;
};

const exercise1 = () => {
  const ex1 = document.getElementById("ex1");
  const ex2 = document.getElementById("ex2");
  const ex1body = document.getElementById("oldest");
  const ex2body = document.getElementById("funds");
  if (ex1.classList.contains("marker")) {
    ex1.classList.add("border");
    ex2.classList.remove("border");
    ex1.classList.remove("marker");
    ex2.classList.add("marker");
    ex1body.classList.remove("hide");
    ex2body.classList.add("hide");
  } else {
    ex1.classList.add("border");
    ex2.classList.remove("border");
    ex2.classList.add("marker");
    ex2body.classList.add("hide");
  }
};
const exercise2 = () => {
  const ex1 = document.getElementById("ex1");
  const ex2 = document.getElementById("ex2");
  const ex1body = document.getElementById("oldest");
  const ex2body = document.getElementById("funds");
  if (ex2.classList.contains("marker")) {
    ex2.classList.add("border");
    ex1.classList.remove("border");
    ex1.classList.add("marker");
    ex2.classList.remove("marker");
    ex1body.classList.add("hide");
    ex2body.classList.remove("hide");
  } else {
    ex2.classList.add("border");
    ex1.classList.remove("border");
    ex1body.classList.add("hide");
    ex1.classList.add("marker");
  }
};

const calculateAge = () => {
  const ageOne = parseInt(document.getElementById("age1").value);
  const ageTwo = parseInt(document.getElementById("age2").value);
  const ageThree = parseInt(document.getElementById("age3").value);
  const nameOne = document.getElementById("name1").value;
  const nameTwo = document.getElementById("name2").value;
  const nameThree = document.getElementById("name3").value;

  let oldestName, oldestAge;
  let middleName, middleAge;
  let youngestName, youngestAge;

  if ((ageOne >= ageTwo) & (ageOne >= ageThree)) {
    console.log("1");
    oldestAge = ageOne;
    oldestName = nameOne;
    if ((ageTwo >= ageThree) & (ageTwo <= ageOne)) {
      middleAge = ageTwo;
      middleName = nameTwo;
      youngestAge = ageThree;
      youngestAge = ageThree;
    } else {
      youngestAge = ageTwo;
      youngestName = nameTwo;
      middleAge = ageThree;
      middleName = nameThree;
    }
  }
  if ((ageTwo >= ageOne) & (ageTwo >= ageThree)) {
    console.log("2");
    oldestAge = ageTwo;
    oldestName = nameTwo;
    if ((ageOne >= ageThree) & (ageOne <= ageTwo)) {
      middleAge = ageOne;
      middleName = nameOne;
      youngestAge = ageThree;
      youngestAge = ageThree;
    } else {
      youngestAge = ageOne;
      youngestName = nameOne;
      middleAge = ageThree;
      middleName = nameThree;
    }
  }
  if ((ageThree >= ageOne) & (ageThree >= ageTwo)) {
    console.log("3");
    oldestAge = ageThree;
    oldestName = nameThree;
    if ((ageOne >= ageTwo) & (ageOne <= ageThree)) {
      middleAge = ageOne;
      middleName = nameOne;
      youngestAge = ageTwo;
      youngestAge = ageTwo;
    } else {
      youngestAge = ageOne;
      youngestName = nameOne;
      middleAge = ageTwo;
      middleName = nameTwo;
    }
  }
  const ageContainer = document.getElementById("ages-container");
  ageContainer.innerHTML = `<p>Oldest to Youngest:${oldestName}, ${middleName}, ${youngestName}</p>`;
};

const donationThermometer = () => {
  const thermometer = document.getElementById("thermometer");
  const donation = parseInt(document.getElementById("donation-number").value);
  const donationgoal = 10000;
  const thermobar = (donation / donationgoal) * 100;
  console.log(thermobar);
  if (thermobar < 25) {
    thermometer.style.height = "0px";
  } else if ((thermobar >= 25) & (thermobar < 50)) {
    thermometer.style.height = "100px";
  } else if ((thermobar >= 50) & (thermobar < 75)) {
    thermometer.style.height = "200px";
  } else if ((thermobar >= 75) & (thermobar < 100)) {
    thermometer.style.height = "300px";
  } else {
    thermometer.style.height = "400px";
  }
};
