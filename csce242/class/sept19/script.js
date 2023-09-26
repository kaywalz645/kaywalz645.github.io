window.onload = ()=> {
    document.getElementById("button").onclick = animate;
    document.getElementById("square").classList.remove("start-anim");
    document.getElementById("button-show-name").onclick = displayName;
}

const moveSquare = ()=> {
    const square = document.getElementById("square");
    const button = document.getElementById("button-move");
    //is it currently animating
    if (square.classList.contains("move-square")){
        square.classList.remove("move-square");
        button.innerHTML = "Start";
    } else {
        square.classList.add("move-square");
        button.innerHTML = "Stop";
    }
}