const toggleHamMenu = () => {
  menu = document.getElementById("menu");
  if (menu.classList.contains("hide")) {
    menu.classList.remove("hide");
  } else {
    menu.classList.add("hide");
  }
};

const getPositions = async () => {
  try {
    return (await fetch("api/jobs/")).json();
  } catch (error) {
    console.log(error);
  }
};

const showPositionsOpen = async () => {
  let positionsOpen = await getPositions();
  console.log(positionsOpen);
  let positionSection = document.getElementById("positions-list");
  positionSection.innerHTML = "";

  positionsOpen.forEach((job, index) => {
    const section = getPositionItem(job);
    section.classList.add(index % 2 === 0 ? "dark" : "light");
    positionSection.appendChild(section);
  });
};

const getPositionItem = (position) => {
  let section = document.createElement("section");
  section.classList.add("flex-container");
  section.classList.add("positions-open");

  let ul = document.createElement("ul");

  section.append(ul);
  ul.append(getLi(position.name));
  ul.append(getLi(position.description));

  let ul2 = document.createElement("ul");
  section.append(ul2);
  ul2.append(getApplyButton());
  const eLink = document.createElement("a");
  eLink.innerHTML = "&#9998;";
  ul2.append(eLink);
  eLink.id = "edit-link";
  const dLink = document.createElement("a");
  dLink.innerHTML = "	&#x2715;";
  ul2.append(dLink);
  dLink.id = "delete-link";

  eLink.onclick = (e) => {
    e.preventDefault();
    populateEditForm(position);
    toggleForm();
  };

  dLink.onclick = (e) => {
    e.preventDefault();
    deleteJob(position);
  };
  populateEditForm(position);

  return section;
};

const getJobs = async () => {
  try {
    return (await fetch("api/jobs/")).json();
  } catch (error) {
    console.log(error);
  }
};

const showJobs = async () => {
  let jobs = await getJobs();
  let jobsDiv = document.getElementById("positions-list");
  jobsDiv.innerHTML = "";
  jobs.forEach((job) => {
    const section = document.createElement("section");
    section.classList.add("flex-container");
    section.classList.add("positions-open");
    jobsDiv.append(section);
    let ul = document.createElement("ul");

    section.append(ul);
    ul.append(getLi(job.name));
    ul.append(getLi(job.description));

    let ul2 = document.createElement("ul");
    section.append(ul2);
    ul2.append(getApplyButton());
    const eLink = document.createElement("a");
    eLink.innerHTML = "&#9998;";
    ul2.append(eLink);
    eLink.id = "edit-link";
    const dLink = document.createElement("a");
    dLink.innerHTML = "	&#x2715;";
    ul2.append(dLink);
    dLink.id = "delete-link";

    eLink.onclick = (e) => {
      e.preventDefault();
      populateEditForm(job);
      toggleForm();
    };

    dLink.onclick = (e) => {
      e.preventDefault();
      deleteJob(job);
    };

  });
};
const getLi = (input) => {
  const li = document.createElement("li");
  li.append(input);
}
const getApplyButton = () => {
  const button = document.createElement("button");
  button.textContent = "Apply";
  return button;
}
const displayDetails = (job) => {
  const jobDetails = document.getElementById("positions-list");
  jobDetails.innerHTML = "";

  const h3 = document.createElement("h3");
  h3.innerHTML = job.name;
  jobDetails.append(h3);

  const dLink = document.createElement("a");
  dLink.innerHTML = "	&#x2715;";
  jobDetails.append(dLink);
  dLink.id = "delete-link";

  const eLink = document.createElement("a");
  eLink.innerHTML = "&#9998;";
  jobDetails.append(eLink);
  eLink.id = "edit-link";

  const p = document.createElement("p");
  jobDetails.append(p);
  p.innerHTML = recipe.description;

  const ul = document.createElement("ul");
  jobDetails.append(ul);
  // console.log(recipe.ingredients);
  // recipe.ingredients.forEach((ingredient) => {
  //   const li = document.createElement("li");
  //   ul.append(li);
  //   li.innerHTML = ingredient;
  // });

  eLink.onclick = (e) => {
    e.preventDefault();
    document.querySelector(".dialog").classList.remove("transparent");
    document.getElementById("modal-background").classList.remove("hidden");
  };

  dLink.onclick = (e) => {
    e.preventDefault();
    deleteJob(job._id);
  };

  populateEditForm(job);
};

async function deleteJob(_id) {
  let response = await fetch(`/api/jobs/${_id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
  });

  if (response.status != 200) {
    console.log("Error deleting");
    return;
  }

  let result = await response.json();
  showJobs();
  document.getElementById("job-details").innerHTML = "";
  resetForm();
  showJobs();
}

const populateEditForm = (job) => {
  const form = document.getElementById("formJobs");
  form._id.value = job._id;
  form.name.value = job.name;
  form.description.value = job.description;

  // const ingredientsP = document.getElementById("ingredient-boxes");
  // ingredientsP.innerHTML = "";
  // console.log(job.ingredients);

  // for (let i in recipe.ingredients) {
  //   const input = document.createElement("input");
  //   input.type = "text";
  //   input.value = recipe.ingredients[i];
  //   ingredientsP.append(input);
  // }
};

const addEditJob = async (e) => {
  e.preventDefault();

  const form = document.getElementById("formJobs");
  const formData = new FormData(form);
  let response;
  console.log(form._id.value > 0 && form._id.value.length);
  if (form._id.value == -1) {
    formData.delete("_id");
    response = await fetch("/api/jobs", {
      method: "POST",
      body: formData,
    });
  } else {
    console.log("editting");
    response = await fetch(`/api/jobs/${form._id.value}`, {
      method: "PUT",
      body: formData,
    });
  }

  if (response.status != 200) {
    console.log("ERROR posting data");
    return;
  }

  let result = await response.json();

  if (form._id.value != -1) {
    const job = await getRecipe(form._id.value);
    displayDetails(job);
  }

  document.querySelector(".dialog").classList.add("transparent");
  resetForm();
  showJobs();
};

const getJob = async (_id) => {
  let response = await fetch(`/api/jobs/${_id}`);
  if (response.status != 200) {
    console.log("Error reciving recipe");
    return;
  }

  return await response.json();
};

const resetForm = () => {
  const form = document.getElementById("formJobs");
  form.reset();
  form._id = "-1";
};

const showHideAdd = (e) => {
  e.preventDefault();
  document.querySelector(".dialog").classList.remove("transparent");
  
  resetForm();
};

window.onload = () => {
  showJobs();
  document.getElementById("formJobs").onsubmit = addEditJob;
  document.getElementById("add-position-button").onclick = showHideAdd;

  // document.querySelector(".close").onclick = () => {
  //   document.querySelector(".dialog").classList.add("transparent");
  // };
};
