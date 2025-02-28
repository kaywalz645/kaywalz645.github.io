// const { application } = require("express");

const getPeople = async () => {
  try {
    return (await fetch("/api/people")).json();
  } catch (error) {
    console.log(error);
  }
};

const displayPeople = async () => {
  let peopleJSON = await getPeople();
  console.log(peopleJSON);
  let peopleNameDiv = document.getElementById("people-list");
  peopleNameDiv.innerHTML = "";
  peopleJSON.forEach((person) => {
    const section = document.createElement("section");
    peopleNameDiv.append(section);

    const a = document.createElement("a");
    a.href = "#";
    section.append(a);

    let h3 = document.createElement("h3");
    h3.innerHTML = person.name;
    a.append(h3);

    a.onclick = (e) => {
      e.preventDefault();
      displayDetails(person);
    };
  });
};

const displayDetails = (person) => {
  let peopleDetailsDiv = document.getElementById("people-details");
  peopleDetailsDiv.innerHTML = "";
  const p = document.createElement("p");
  const h2 = document.createElement("h2");
  h2.innerHTML = "Details";
  const section1 = document.createElement("section");
  section1.append(h2);
  section1.append(p);

  p.innerHTML = `
            ${person.name} <br>
            Age: ${person.age} <br>
            Favorite Color: ${person.fcolor} <br>
            Activity: ${person.activity} <br>
            Favorite Foods: ${person.fFoods.join(", ")} <br>
        `;

  const dLink = document.createElement("a");
  dLink.innerHTML = "&#x2715;";
  peopleDetailsDiv.append(dLink);
  dLink.id = "delete-link";

  const eLink = document.createElement("a");
  eLink.innerHTML = "&#9998;";
  peopleDetailsDiv.append(eLink);
  eLink.id = "edit-link";

  peopleDetailsDiv.append(section1);

  eLink.onclick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    document.querySelector(".dialog").classList.remove("hidden");
    document.getElementById("add-edit-title").innerHTML = "Edit Person";
  };

  dLink.onclick = (e) => {
    e.preventDefault();
    //delete person
  };
  populateEditForm(person);
};

const populateEditForm = (person) => {
  const form = document.getElementById("add-person");
  form._id.value = person._id;
  form.name.value = person.name;
  form.age.value = person.age;
  form.fColor.value = person.fcolor;
  form.activity.value = person.activity;

  populateFavoriteFoods(person.fFoods);
};

const populateFavoriteFoods = (foods) => {
  const foodBoxes = document.getElementById("favorite-food-box");
  foods.forEach((food) => {
    const input = document.createElement("input");
    input.type = "text";
    input.value = food;
    foodBoxes.append(input);
  });
};
const addEditPerson = async (e) => {
  e.preventDefault();

  const form = document.getElementById("add-person");
  const formData = new FormData(form);

  formData.append("fFoods", getFavoriteFoods());

  let response;

  if (form._id.value == -1) {
    formData.delete("_id");
    formData.delete("img");
    response = await fetch("/api/people", {
      method: "POST",
      body: formData,
    });
  } else {
    response = await fetch(`/api/people/${form._id.value}`, {
      method: "PUT",
      body: formData,
    });
  }

  if (response.status != 200) {
    console.log("error contacting server");
    return;
  }
  if (form._id.value != -1) {
    displayDetails(person);
  }
  document.querySelector(".dialog").classList.add("hidden");
  resetForm();
  displayPeople();
};

const getFavoriteFoods = () => {
  const inputs = document.querySelectorAll("#favorite-food-box input");
  const foods = [];
  inputs.forEach((input) => {
    foods.push(input.value);
  });
  return foods;
};
const resetForm = () => {
  const form = document.getElementById("add-person");
  form.reset();
  form._id = "-1";
  document.getElementById("favorite-food-box").innerHTML = "";
};
const showHideAdd = (e) => {
  e.preventDefault();
  document.querySelector(".dialog").classList.remove("hidden");
  document.getElementById("add-edit-title").innerHTML = "Add Person";
  resetForm();
};

const addFavoriteFood = (e) => {
  e.preventDefault();
  const foodBoxes = document.getElementById("favorite-food-box");
  const input = document.createElement("input");
  input.type = "text";
  foodBoxes.append(input);
};

window.onload = () => {
  displayPeople();
  document.getElementById("add-person").onsubmit = addEditPerson;
  document.getElementById("add-link").onclick = showHideAdd;

  document.getElementById("close-button").onclick = (e) => {
    e.preventDefault();
    document.querySelector(".dialog").classList.add("hidden");
  };

  document.getElementById("add-food").onclick = addFavoriteFood;
};
