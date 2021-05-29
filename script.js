const APIURL = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=1'
const IMGPATH = 'https://image.tmdb.org/t/p/w1280';
const wrapper = document.querySelector(".wrapper");
const voteAverage = document.querySelector(".voteAverage");
const SEARCHAPI = "https://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&query=";
const movieList = document.querySelector(".movieList");
const form = document.querySelector(".form");
const input = document.querySelector(".input");

async function getMovies(url) {
  const res = await fetch(url);
  const respData = await res.json();

  showData(respData);
}

getMovies(APIURL);

function showData(respData) {
  movieList.innerHTML = "";
  console.log(respData);
  respData.results.forEach(movie => {
    const { title, poster_path, vote_average, overview } = movie;
    movieList.innerHTML += `<div class="movie"><img src=${IMGPATH + poster_path} alt="${title}">
  <span class="movieInfo">
    <span class="movieName">${title}</span>
    <span class="voteAverage ${getColor(vote_average)}">${vote_average}</span> 
  </span>
  <div class="overview">
     <h4>Overview:</h4>${overview}
  </div>
  </div>`
  })
  return respData;
};

function getColor(vote_average) {
  if (vote_average >= 8) { return "red"; }
  else if (vote_average >= 7) { return "green"; }
  else { return "orange"; }
};

form.addEventListener("submit", (event) => {
  const inputValue = input.value;
  event.preventDefault();
  getMovies(SEARCHAPI + inputValue);
  inputValue = "";
});


