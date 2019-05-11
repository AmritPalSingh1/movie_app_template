const movieImage = document.querySelector("#movie-top-image");
const movieDetails = document.querySelector(".movie-details");

// fix background movie poster image size on device size change
function fixBackgroundMovieImage(mobile) {
  if (mobile.matches) {
    movieImage.style.backgroundSize =
      "700px " + movieDetails.offsetHeight + "px";
    console.log(movieDetails.offsetHeight);
  } else {
    movieImage.style.backgroundSize = "cover";
  }
}

var mobile = window.matchMedia("(max-width: 700px)");
fixBackgroundMovieImage(mobile); // Call listener function at run time
mobile.addListener(fixBackgroundMovieImage); // Attach listener function on state changes
