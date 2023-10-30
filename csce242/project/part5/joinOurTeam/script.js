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
  const path = "./positionsOpen.json";
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
  let positonSection = document.getElementById("positions-list");

  positionsOpen.forEach((position) => {
    positonSection.append(getPositionItem(position));
  });
};

const getPositionItem = (position) => {
  let section = document.createElement("section");
  let ul = document.createElement("ul");

  section.append(ul);
  ul.append(getLi(position.title));
  ul.append(getLi(position.description));

  section.append(div);
  return section;
};

const getLi = (data) => {
  const li = document.createElement("li");
  li.textContent = data;
  return li;
};
