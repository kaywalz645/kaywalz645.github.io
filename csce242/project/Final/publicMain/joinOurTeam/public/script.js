const toggleHamMenu = () => {
  menu = document.getElementById("menu");
  if (menu.classList.contains("hide")) {
    menu.classList.remove("hide");
  } else {
    menu.classList.add("hide");
  }
};

const getJobs = async() => {
  try {
    const response = await fetch("/api/jobs");
    
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching positions:", error);
    throw error; 
  }
};

const showJobs = async () => {
  let jobs = await getJobs();
  console.log(jobs);
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
      showHideAdd();
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
  return li;
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
  p.innerHTML = job.description;

  const ul = document.createElement("ul");
  jobDetails.append(ul);

  eLink.onclick = (e) => {
    e.preventDefault();
    populateEditForm(job);
    showHideAdd();
    
  };

  dLink.onclick = (e) => {
    e.preventDefault();
    deleteJob(job._id);
  };

  populateEditForm(job);
};

const deleteJob = async (job) => {
  const id = job._id;
  console.log('Deleting job with ID:', id);
  let response = await fetch(`/api/jobs/${id}`, {
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
  resetForm();
  showJobs();
}

const populateEditForm = (job) => {
  const form = document.getElementById("formJobs");
  form._id.value = job._id;
  form.name.value = job.name;
  form.description.value = job.description;

};

const addEditJob = async (e) => {
  e.preventDefault();


  const form = document.getElementById("formJobs");
  const formData = new FormData(form);

  const jobData = {};
  for (let [key, value] of formData.entries()) {
    jobData[key] = value;
  }
  
  console.log(jobData);

  let response;
  console.log(form._id.value > 0 && form._id.value.length);
  if (form._id.value != -1) {
    delete jobData._id;
    response = await fetch("/api/jobs", {
      method: "POST",
      headers: {
        "Content-Type": "application/json", 
      },
      body: JSON.stringify(jobData), 
    });
  } else {
    console.log("editting");
    response = await fetch(`/api/jobs/${form._id.value}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json", 
      },
      body: JSON.stringify(jobData),
    });
  }

  if (response.status != 200) {
    console.log("ERROR posting data");
    return;
  }

  let result = await response.json();

  if (form._id.value != -1) {
    const job = await getJob(form._id.value);
    displayDetails(job);
  }

  document.querySelector(".dialog").classList.add("transparent");
  resetForm();
  showJobs();
};

const getJob = async (_id) => {
  let response = await fetch(`/api/jobs/${_id}`);
  if (response.status != 200) {
    console.log(`Error fetching job with ID ${_id}. Status: ${response.status}`);
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
  if (e) {
    e.preventDefault();
  }
  
  document.querySelector(".dialog").classList.remove("transparent");
  
  resetForm();
};

window.onload = () => {
  showJobs();
  document.getElementById("formJobs").onsubmit = addEditJob;
  document.getElementById("add-position-button").onclick = showHideAdd;

  
};
