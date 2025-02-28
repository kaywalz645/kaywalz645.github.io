alert("hi");
// let //when your changing variable
// const everything is in constant

// const loadFunction = () => {
//     const helloP = document.getElementById("date");
//     helloP.innerHTML = "helloooooo (changed)";
// }
// window.onload = loadFunction; 

// OR


// when the window is loaded it will call the syntax inside of the curly braces
window.onload = ()=> {
    document.getElementById("button-click").onclick = changeText;
    document.getElementById("buttons-show").onclick = showRaccoon;
    document.getElementById("button-hide").onclick = hideRaccoon;
}

const hideRaccoon = () => {
    document.getElementById("babyraccoon").classList.remove("hide");
}
const showRaccoon = () => {
    document.getElementById("babyraccoon").classList.add("hide");
}