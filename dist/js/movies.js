// Init Tmdb
const tmdb = new Tmdb();

// Initialize DOM variables
const moviesSearch = document.getElementById('movies-search');
const popularNav = document.getElementById('popular-nav');
const latestNav = document.getElementById('latest-nav');
const topNav = document.getElementById('top-nav');
const upcomingNav = document.getElementById('upcoming-nav');
const moviesContainer = document.getElementById('movies-container');
const resultsList = document.getElementById('results-list');
const moviesSearchBtn = document.getElementById('movies-search-btn');
const loadMore = document.querySelector('.load-more');

// Current results page number
let upcomingPage = 0;
let popularPage = 0;
let customPage = 0;
let topPage = 0;

try{
  latestNav.addEventListener('click', latestList);
  topNav.addEventListener('click', topRatedList);
  upcomingNav.addEventListener('click', upcomingList);
  popularNav.addEventListener('click', popularList);
  moviesSearchBtn.addEventListener('click', showSearchMovies);
  loadMore.addEventListener('click', loadMoreMovies);
}
catch{
  // Do nothing
}

popularList();

// Dropdown results while searching effect
if (moviesSearch != null){
  moviesSearch.addEventListener('keyup', showDropdown);
}

function showDropdown(e){
  query = moviesSearch.value;

  resultsList.innerHTML = "";

  if (e.code == "Enter"){
    showSearchMovies();
  }
  else{

    
    tmdb.searchMovies(query, 1).then(data => {
      resultsList.innerHTML = "";
    results = data.searchMovies.results;

    if (results != undefined){
      results.forEach(function(result){
        const a = document.createElement('a');
        a.href = "movie.html";
        
        const div = document.createElement('div');
        div.className = "result cursor-pointer";
        div.innerHTML = result.title + " (" + result.release_date.substring(0, 4) + ")";
        a.appendChild(div);
        resultsList.appendChild(a);
      });
      
    }
  });
}
}

// Show movies searched using manual input
function showSearchMovies(){
  query = moviesSearch.value;
  if (query != ""){
    resultsList.innerHTML = "";
    tmdb.searchMovies(query, customPage).then(data => {
      resultsList.innerHTML = "";
      results = data.searchMovies.results;
      
      if (results != undefined){
        newMoviesList(results);
        removeMiniNavActive()
      }
    });
  }
}

// Load more movies when load more button is clicked
function loadMoreMovies(){
  if (popularPage > 0){
    tmdb.getPopularMovies(popularPage).then(data => {
      popularMoviesResult = data.popularMovies.results;
    
      addMovies(popularMoviesResult);
    
    });
  }
}

function removeMiniNavActive(){
  try{
    popularNav.classList.remove("active");
    latestNav.classList.remove("active");
    topNav.classList.remove("active");
    upcomingNav.classList.remove("active");
  }
  catch{
    // Do nothing
  }
}

// Remove all existing movies and add new ones
function newMoviesList(movies){
  if (moviesContainer != null){
    moviesContainer.innerHTML = "";

    
    movies.forEach(function(movie){
      const movieCard = document.createElement("div");
      movieCard.className = "movie-card";
      movieCard.innerHTML = `
      <a href="movie.html">
      <div class="movie-poster">
      <img
      src="https://image.tmdb.org/t/p/w185_and_h278_bestv2/${movie.poster_path}" class="shadow"
      alt=""
      />
      <div class="movie-grade">
      A
      </div>
      </div>
      <div class="movie-name">
      ${movie.title} (${movie.release_date.substring(0,4)})
      </div>
      </a>
      `;
      
      moviesContainer.appendChild(movieCard);

    });
  }
}

// Add more movies to the display
function addMovies(movies){
  if (moviesContainer != null){
    movies.forEach(function(movie){
      const movieCard = document.createElement("div");
      movieCard.className = "movie-card";
      
      movieCard.innerHTML = `
      <a href="">
      <div class="movie-poster">
      <img
      src="https://image.tmdb.org/t/p/w185_and_h278_bestv2/${movie.poster_path}" class="shadow"
      alt=""
      />
      <div class="movie-grade">
      A
      </div>
      </div>
      <div class="movie-name">
      ${movie.title} (${movie.release_date.substring(0,4)})
      </div>
      </a>
      `;
      
      moviesContainer.appendChild(movieCard);
    });
  }
}

function popularList(){
  removeMiniNavActive();
  popularPage++;

  try{
    popularNav.classList.add("active");
  }
  catch{
    // Do nothing
  }

  tmdb.getPopularMovies(1).then(data => {
    popularMoviesResult = data.popularMovies.results;
  
    newMoviesList(popularMoviesResult);
  
  });
}

function latestList(){
  removeMiniNavActive();
  latestNav.classList.add("active");

  tmdb.getLatestMovies(1).then(data => {
    latestMoviesResult = data.latestMovies.results;
  
    newMoviesList(latestMoviesResult);
  
  });
}
function topRatedList(){
  removeMiniNavActive();
  topNav.classList.add("active");

  tmdb.getTopRatedMovies(1).then(data => {
    topRatedMoviesResult = data.topMovies.results;
  
    newMoviesList(topRatedMoviesResult);
  
  });
}
function upcomingList(){
  removeMiniNavActive();
  upcomingNav.classList.add("active");

  tmdb.getUpcomingMovies().then(data => {
    upcomingMoviesResult = data.upcomingMovies.results;
  
    newMoviesList(upcomingMoviesResult);
  
  });
}