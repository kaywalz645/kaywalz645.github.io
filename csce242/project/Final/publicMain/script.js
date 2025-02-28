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


document.addEventListener('DOMContentLoaded', function () {
    const navigationLinks = document.querySelectorAll('a');

    navigationLinks.forEach(link => {
        link.addEventListener('click', function (event) {
            event.preventDefault();

            const targetPage = this.getAttribute('href');

            window.location.href = targetPage;
        });
    });
});