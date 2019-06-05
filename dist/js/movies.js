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

let page = 1;

latestNav.addEventListener('click', latestList);
topNav.addEventListener('click', topRatedList);
upcomingNav.addEventListener('click', upcomingList);
popularNav.addEventListener('click', popularList);

popularList();

// Dropdown results while searching effect
moviesSearch.addEventListener('keyup', showDropdown);

function showDropdown(){
  query = moviesSearch.value;

  resultsList.innerHTML = "";

  tmdb.searchMovies(query).then(data => {
    results = data.searchMovies.results;

    results.forEach(function(result){
      const div = document.createElement('div');
      div.className = "result";
      div.innerHTML = result.title + " (" + result.release_date.substring(0, 4) + ")";
      resultsList.appendChild(div);
    });
      
  });
}

function removeMiniNavActive(){
  popularNav.classList.remove("active");
  latestNav.classList.remove("active");
  topNav.classList.remove("active");
  upcomingNav.classList.remove("active");
}

// Remove all existing movies and add new ones
function newMoviesList(movies){
  if (moviesContainer != null){
    moviesContainer.innerHTML = "";

    
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
  popularNav.classList.add("active");

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

  tmdb.getUpcomingMovies(1).then(data => {
    upcomingMoviesResult = data.upcomingMovies.results;
  
    newMoviesList(upcomingMoviesResult);
  
  });
}