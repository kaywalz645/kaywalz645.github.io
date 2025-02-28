window.onload = () => {
    showMovies();
  };

  const getMovies = async () => {
    const url = "https://portiaportia.github.io/json/movies.json"
    try{
        const response = await fetch(url);
        return await response.json();
    }
    catch{error}
    {
        console.log(error);
    }
  }

  const showMovies  = async () => {
    let movies = await getMovies();
    let movieSection = document.getElementById("movies-list");
    let h1 = document.createElement("h1");
    h1.append(`Movies`);
    movieSection.append(h1);
    movies.forEach(movie =>{
        movieSection.append(getMovieItem(movie));
    })
  }

  const getMovieItem = (movie) => {
    let section = document.createElement("section");
    
    section.append(getImg(movie.img));
    let div = document.createElement("div");
    let h3 = document.createElement("h3");
    let ul = document.createElement("ul");

    h3.innerText = movie.title;
    div.append(h3);
    div.append(ul);
    ul.append(getLi(`Director: ${movie.director}`));
    ul.append(getLi(`Actors: ${movie.actors}`));
    ul.append(getLi(`Year Made: ${movie.year}`));
    ul.append(getLi(`Genres: ${movie.genres}`));
    ul.append(getLi(`Description: ${movie.description}`));

    section.append(div);
    return section;
  }


  const getLi = (data) => {
    const li = document.createElement("li");
    li.textContent = data;
    return li;
  }


  const getImg = (data) => {
    const div = document.createElement("div");

    const img = document.createElement("img");
    img.src = data; 
    div.appendChild(img);
    
    return div;
  }

// title, director, actors, year, genres, description, img