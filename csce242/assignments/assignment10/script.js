window.onload = () =>
  createToysTable();


class Toy {
  constructor(name, price, ageRange, rating, image) {
    this.name = name;
    this.price = price;
    this.ageRange = ageRange;
    this.rating = rating;
    this.image = image;
  }

  get ul() {
    let toyul = document.createElement("ul");
    toyul.classList.add("toy-item");
    
    toyul.append(this.li(this.name));
    toyul.append(this.li("Price: " + this.price));
    toyul.append(this.li("Age Range: " + this.ageRange));
    toyul.append(this.li("Rating: " + this.rating));

    toyul.style.backgroundImage = `url('${this.image}')`;

    return toyul;
  }

  li(data) {
    let toyli = document.createElement("li");
    toyli.textContent = data;
    return toyli;
  }

  img(data) {
    toyImg.src = data;
    return toyImg;
  }
}

const createToysTable = () => {
  let toysList = document.getElementById("toys");
  let toys = [];

  toys.push(new Toy("Potato Head", "$8", "3-12", 8, "images/potatoHead.jpg" ));
  toys.push(new Toy("Ender Dragon Plush", "$20", "3-12", 9, "images/enderDragon.jpg"));
  toys.push(new Toy("Holiday Barbie", "$50", "4-12", 7, "images/holidayBarbie.jpg"));
  toys.push(new Toy("Pink Four Wheeler", "$100", "5 - 12", 5, "images/pinkFourWheeler.jpg"));
  toys.push(new Toy("Play Dough", "$6", "4 - 15", 6, "images/playDough.jpg"));
  toys.push(new Toy("Lightning Mcqueen and Mater", "$50", "3 - 12", 8, "images/cars.jpg"));

  for (let i in toys) {
    toysList.append(toys[i].ul)
  }
}