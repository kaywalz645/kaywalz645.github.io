const submitContactUs = (e) => {
    e.preventDefault();
    document.getElementById("results").classList.remove("hide");
  
    const form = document.getElementById("inputContact");
    const name = form.elements["name"].value;
    const email = form.elements["email"].value;
    const askAnything = form.elements["message"].value;
  
    console.log(name);
    console.log(email);
    console.log(askAnything);


};

document.getElementById("inputContact").onsubmit = submitContactUs;