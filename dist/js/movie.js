// Init Tmdb
const tmdb = new Tmdb

// Initialize dom variables
const movieName = document.getElementById('movie-name');
const description = document.getElementById('description');
const movieTopImage = document.getElementById('movie-top-image');

// set movie id
const movieID = 447404;

// Make http call
tmdb.getMovie(movieID)
  .then(data => {
    if (data.movie.status_message == 'The resource you requested could not be found.'){
      // Movie not found
    }
    else{
      console.log(data.movie);
      movieName.innerHTML = data.movie.title
      description.innerHTML = data.movie.overview;
      movieTopImage.style.backgroundImage = 'url("https://image.tmdb.org/t/p/w1000_and_h563_face/lvjscO8wmpEbIfOEZi92Je8Ktlg.jpg")';
    }
  })