window.onload = () => {
  document.getElementById("toggle-menu").onclick = toggleHamMenu;
};


const toggleHamMenu = () => {
    menu = document.getElementById("menu");
    if(menu.classList.contains("hide")){
        menu.classList.remove("hide");
    }else{
        menu.classList.add("hide");
    }
}


// document.addEventListener('DOMContentLoaded', function () {
//     // Get the navigation links
//     const navigationLinks = document.querySelectorAll('a');

//     // Add click event listeners to each navigation link
//     navigationLinks.forEach(link => {
//         link.addEventListener('click', function (event) {
//             // Prevent the default behavior of the link (e.g., following the href)
//             event.preventDefault();

//             // Get the href attribute of the clicked link
//             const targetPage = this.getAttribute('href');

//             // Change the current page to the target page
//             window.location.href = targetPage;
//         });
//     });
// });