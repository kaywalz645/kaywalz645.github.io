const submitEvent = (e) => {
    e.preventDefault();
    document.getElementById("results").classList.remove("hide");
  
    const form = document.getElementById("inputEvent");
    const name = form.elements["name"].value;
    const email = form.elements["email"].value;
    const organization = form.elements["Organization"].value;
    const typeOfEvent = form.elements["Type of Event"].value;
    const dates = form.elements["Perferred Dates"].value;
    const guestNumbers = form.elements["Number of Guests"].value;
    const timings = form.elements["Timings"].value;
    const furtherNotes = form.elements["Further Notes"].value;
  
    console.log(name);
    console.log(email);
    console.log(organization);
    console.log(typeOfEvent);
    console.log(dates);
    console.log(guestNumbers);
    console.log(timings);
    console.log(furtherNotes);


};

document.getElementById("inputEvent").onsubmit = submitEvent;