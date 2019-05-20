// Init Tmdb
const tmdb = new Tmdb

// Initialize dom variables
const movieName = document.getElementById('movie-name');
const description = document.getElementById('description');
const movieTopImage = document.getElementById('movie-top-image');
const movieDetails = document.querySelector(".movie-details");

// set movie id
const movieID = 447404;

// 447404 8 9 126

// Make http call
tmdb.getMovie(movieID)
  .then(data => {
    if (data.movie.status_message == 'The resource you requested could not be found.'){
      // Movie not found
    }
    else{
      console.log(data.movie);
      movieName.innerHTML = data.movie.title
      if (data.movie.overview != ''){
        description.innerHTML = data.movie.overview;
      }
      movieTopImage.style.backgroundImage = `url("https://image.tmdb.org/t/p/w1000_and_h563_face/${data.movie.backdrop_path}")`;


      // Fix background Image size for mobile devices
      let mobile = window.matchMedia("(max-width: 700px)");
      if (mobile.matches) {
        movieTopImage.style.backgroundSize =
          "700px " + movieDetails.offsetHeight + "px";
      } else {
        movieTopImage.style.backgroundSize = "cover";
      }


      console.log(data.movie.backdrop_path);
    }
  })


