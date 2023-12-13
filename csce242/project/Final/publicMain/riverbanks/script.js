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