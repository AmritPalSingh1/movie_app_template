const movieImage = document.querySelector("#movie-top-image");
const movieDetails = document.querySelector(".movie-details");

// fix background movie poster image size on device size change
function fixBackgroundMovieImage(mobile) {
  if (mobile.matches) {
    movieImage.style.backgroundSize =
      "700px " + movieDetails.offsetHeight + "px";
  } else {
    movieImage.style.backgroundSize = "cover";
  }
}

var mobile = window.matchMedia("(max-width: 700px)");
fixBackgroundMovieImage(mobile); // Call listener function at run time
mobile.addListener(fixBackgroundMovieImage); // Attach listener function on state changes

// When the user scrolls the page, execute myFunction
window.onscroll = function() {
  myFunction();
};

// Get the navbar
const navbar = document.querySelector(".menu");
const main = document.querySelector("main");

// Get the offset position of the navbar
var sticky = navbar.offsetTop;

// Add the sticky class to the navbar when you reach its scroll position. Remove "sticky" when you leave the scroll position
function myFunction() {
  if (window.pageYOffset >= sticky) {
    navbar.classList.add("sticky");
    main.classList.add("fix-padding");
  } else {
    navbar.classList.remove("sticky");
    main.classList.remove("fix-padding");
  }
}
