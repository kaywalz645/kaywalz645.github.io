var height = 500;
var margin = 0;
window.onload = () => {
  document.getElementById("thermometer-button").onclick = donationThermometer;
  document.getElementById("running-man").onclick = running;
};

const donationThermometer = () => {
  const thermometer = document.getElementById("thermometer");
  const donation = parseInt(document.getElementById("donation-number").value);
 
  const donationgoal = 10000;
  const thermobar = donation / donationgoal;
  height = thermobar * 500;

 
  thermometer.style.setProperty("--x", height + "px");
};

const running = () => {
  const man = document.getElementById("running-man");
  margin += 3;

  man.style.setProperty("--r", margin + "px");
  man.src = "photos/runningman2.png";
};
