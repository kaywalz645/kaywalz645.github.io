window.onload = () => {
  document.getElementById("toggle-menu").onclick = toggleHamMenu;
  showPositionsOpen();
};

const toggleHamMenu = () => {
  menu = document.getElementById("menu");
  if (menu.classList.contains("hide")) {
    menu.classList.remove("hide");
  } else {
    menu.classList.add("hide");
  }
};

const getPositons = async () => {
  const path = "https://kaywalz645.github.io/csce242/project/part5/joinOurTeam/json/positionsOpen.json";
  try {
    const response = await fetch(path);
    return await response.json();
  } catch {
    error;
  }
  {
    console.log(error);
  }
};


const showPositionsOpen = async () => {
  let positionsOpen = await getPositons();
  let positionSection = document.getElementById("positions-list");

  positionsOpen.forEach((position, index) => {
    const section = getPositionItem(position);
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
  ul.append(getLi(position.title));
  ul.append(getLi(position.description));

  let ul2 = document.createElement("ul");
  section.append(ul2);
  ul2.append(getButton());
  getButton();
  return section;
};

const getButton = () => {
  const button = document.createElement("button");
  button.textContent = "Apply Here"; 
  return button;
}

const getLi = (data) => {
  const li = document.createElement("li");
  li.textContent = data;
  return li;
};
