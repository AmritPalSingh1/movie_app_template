// Init Tmdb
const tmdb = new Tmdb();

// Initialize DOM variables
const moviesSearch = document.getElementById('movies-search');
const popularNav = document.getElementById('popular-nav');
const nameNav = document.getElementById('name-nav');
const topNav = document.getElementById('top-nav');
const upcomingNav = document.getElementById('upcoming-nav');
const moviesContainer = document.getElementById('movies-container');

let page = 1;

nameNav.addEventListener('click', namesList);
topNav.addEventListener('click', topRatedList);
upcomingNav.addEventListener('click', upcomingList);
popularNav.addEventListener('click', popularList);

function removeMiniNavActive(){
  popularNav.classList.remove("active");
  nameNav.classList.remove("active");
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

tmdb.getPopularMovies(1).then(data => {
  popularMoviesResult = data.popularMovies.results;

  newMoviesList(popularMoviesResult);

});

// tmdb.getPopularMovies(2).then(data => {
//   popularMoviesResult = data.popularMovies.results;

//   addMovies(popularMoviesResult);

// });

function popularList(){
  removeMiniNavActive();
  popularNav.classList.add("active");
}
function namesList(){
  removeMiniNavActive();
  nameNav.classList.add("active");
}
function topRatedList(){
  removeMiniNavActive();
  topNav.classList.add("active");
}
function upcomingList(){
  removeMiniNavActive();
  upcomingNav.classList.add("active");
}