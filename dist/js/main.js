const movieImage = document.querySelector("#movie-top-image");
const movieDetails = document.querySelector(".movie-details");

const castList = document.querySelector("#cast-list");

const leftArrow = document.querySelector("#left-arrow");
const rightArrow = document.querySelector("#right-arrow");

// Load all event listeners
loadEventListeners();

// Load all event listeners
function loadEventListeners() {
  // remove and add arrows display
  setInterval(leftCursor, 100);
  setInterval(rightCursor, 100);
}

// fix background movie poster image size on device size change
function fixMovieBackground(mobile) {
  if (mobile.matches) {
    movieImage.style.backgroundSize =
      "700px " + movieDetails.offsetHeight + "px";
  } else {
    movieImage.style.backgroundSize = "cover";
  }
}

var mobile = window.matchMedia("(max-width: 700px)");
fixMovieBackground(mobile); // Call listener function at run time
mobile.addListener(fixMovieBackground); // Attach listener function on state changes

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

// Add cast arrow scroll functionality

// position left and right arrows
positionArrows();
window.onresize = positionArrows;

function positionArrows() {
  // Position left arrow
  leftArrow.style.left = castList.offsetLeft - 15 + "px";
  leftArrow.style.top =
    castList.offsetTop + castList.offsetHeight / 2 - 25 + "px";

  // Position right arrow
  rightArrow.style.top =
    castList.offsetTop + castList.offsetHeight / 2 - 25 + "px";
  rightArrow.style.left =
    castList.offsetLeft + castList.offsetWidth - 20 + "px";
}

// Scroll events
leftArrow.addEventListener("click", scrollLeft);
rightArrow.addEventListener("click", scrollRight);

// Controlling left movement
function scrollLeft(e) {
  let movingLeft = setInterval(moveLeft, 1);
  setTimeout(stopMoveLeft, 265, movingLeft);
  e.preventDefault();
}

function stopMoveLeft(movingLeft) {
  clearInterval(movingLeft);
}

function moveLeft() {
  castList.scrollLeft -= 7;
}

// Controlling Right Movement
function scrollRight(e) {
  let movingRight = setInterval(moveRight, 1);
  setTimeout(stopMoveRight, 265, movingRight);
  e.preventDefault();
}

function stopMoveRight(movingRight) {
  clearInterval(movingRight);
}

function moveRight() {
  castList.scrollLeft += 7;
}

// Hide and display left cursor when needed
function leftCursor() {
  let beforeScroll = castList.scrollLeft;
  castList.scrollLeft -= 1;
  if (beforeScroll == castList.scrollLeft) {
    leftArrow.style.display = "none";
  } else {
    leftArrow.style.display = "flex";
  }
  castList.scrollLeft = beforeScroll;

  console.log("okka");
}

// Hide and display right cursor when needed
function rightCursor() {
  let beforeScroll = castList.scrollLeft;
  castList.scrollLeft += 1;
  if (beforeScroll == castList.scrollLeft) {
    rightArrow.style.display = "none";
  } else {
    rightArrow.style.display = "flex";
  }
  castList.scrollLeft = beforeScroll;
}
