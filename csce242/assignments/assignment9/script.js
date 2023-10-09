window.onload = () => {
  quotes();
  let time = setInterval(quotes, 2000);
  document.getElementById("rainbow-button").onclick = rainbowBuilder;
};

let qCounter = 0;

const quotes = () => {
  const quote1 =
    "Sometimes the most important thing in a whole day is the rest we take between two deep breaths. - Etty Hillesum";
  const quote2 =
    "Almost everything will work again if you unplug it for a few minutes, including you. - Anne Lamott";
  const quote3 = "Self-care is how you take your power back. - Lalah Delia";
  const quote4 =
    "To love oneself is the beginning of a lifelong romance. - Oscar Wilde";
  const quote5 =
    "Success is only meaningful and enjoyable if it feels like your own. - Michelle Obama";

  const quotesList = [quote1, quote2, quote3, quote4, quote5];
  changeQuote();

  function changeQuote() {
    if (qCounter == quotesList.length) {
      qCounter = 0;
      document.getElementById("quotes-list").innerHTML = quotesList[qCounter];
    } else {
      document.getElementById("quotes-list").innerHTML = quotesList[qCounter];
      qCounter++;
    }
  }
};

const rainbowBuilder = () => {
  const rainbow = document.getElementById("rainbow");
  const colors = ["red", "orange", "yellow", "green", "blue", "purple"];
  let rCount = 0;
  const interval = setInterval(start, 1000);
  function start() {
    if (rCount < colors.length) {
      const p = document.createElement("p");
      p.classList.add("rows");
      p.style.backgroundColor = colors[rCount];
      rainbow.appendChild(p);
      rCount++;
    } else if ((rCount = colors.length)) {
      document.getElementById("gold").classList.remove("hide");
    } else {
      clearInterval(interval);
    }
  }
};
