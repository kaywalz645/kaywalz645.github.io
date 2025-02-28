
window.onload = ()=> {
    document.getElementById("button").onclick = animate;
    document.getElementById("square").classList.remove("start-anim");
    document.getElementById("button-show-name").onclick = displayName;
}
const animate = () => {
    document.getElementById("square").classList.add("start-anim");
}

const displayName = () => {
    const firstName = document.getElementById("txt-first-name").value; //value is the infomation or string inside the paragraph
    console.log("hello" + firstName + "!");
}

// const add = (a,b) => a+b;
//  OR  
// const add = (a,b) => {return a+b;}
// console.log(add(5,6));
//----------------------------------
// const square = a => a*a;

// console.log(square(5));

//----------------------------------
// const helloSpecific = userName =>console.log("Hello " + userName + "!");

// helloSpecific("kaylee")

//----------------------------------

// const helloFullName = (firstName,lastName)=> {
//     console.log("hello " + firstName + " " + lastName );
//     console.log("You are awesome!");
// };

// helloFullName("kay", "walz");


// no okay to change a constant
// const myName = "kaylee";
// myName = "sally";

// const myFunct = () => console.log("hey you!");