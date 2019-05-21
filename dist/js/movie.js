// Init Tmdb
const tmdb = new Tmdb

// Initialize dom variables
const movieName = document.getElementById('movie-name');
const description = document.getElementById('description');
const movieTopImage = document.getElementById('movie-top-image');
const movieDetails = document.querySelector(".movie-details");
const posterImage = document.querySelector("#poster-image");
const movieTime = document.getElementById('movie-time');
const releaseDate = document.getElementById('release-date');
const genreList = document.getElementById('genre-list');
const crewList = document.getElementById('crew-list');



// set movie id
const movieID = 64690;

// 447404 8 9 126 339846 307081 118

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
      movieTopImage.style.backgroundImage = `url("https://image.tmdb.org/t/p/w1280/${data.movie.backdrop_path}")`;


      // Fix background Image size for mobile devices
      let mobile = window.matchMedia("(max-width: 700px)");
      if (mobile.matches) {
        movieTopImage.style.backgroundSize =
          "700px " + movieDetails.offsetHeight + "px";
      } else {
        movieTopImage.style.backgroundSize = "cover";
      }

      // Add poster image
      posterImage.src = `https://image.tmdb.org/t/p/w300_and_h450_bestv2/${data.movie.poster_path}`;

      // Add movie time
      movieTime.innerHTML = data.movie.runtime;
      
      // Add movie release date
      
      let uglyDate = new Date(data.movie.release_date);
      let month = ["January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"][uglyDate.getMonth()];
      let goodDate = month + ' ' + uglyDate.getDate() + ', ' + uglyDate.getFullYear();
      releaseDate.innerHTML = goodDate;

      // Add movie genre list
      const genres = data.movie.genres;
      genres.forEach(function(genre){
        const genreItem = document.createElement("div");
        genreItem.className = "genre-item";
        genreItem.innerHTML = genre.name;

        genreList.appendChild(genreItem);
      });

      // Add crew members list
      const crew = data.movieCredits.crew;
      const directorsOrWriters = [];
      crew.forEach(function(member){
        if (member.job == "Director" || member.job == "Writer")
          directorsOrWriters.push(member);
      });

      // Check if someone is both director Or writer
      for(let i = 0; i < directorsOrWriters.length; i++){
        for (let j = i+1; j < directorsOrWriters.length; j++){
          if (directorsOrWriters[i].name == directorsOrWriters[j].name && directorsOrWriters[i].name != ''){
            console.log(directorsOrWriters[i]);
            directorsOrWriters[i].job = "Director, Writer"
            directorsOrWriters[j].name = "";
          }
        }
      }

      // Now add members to crew list
      for(let i = 0; i < directorsOrWriters.length; i++){
        if(directorsOrWriters[i].name != ''){
          const crewItem = document.createElement("div");
          crewItem.className = "crew-item";
          const crewHeading = document.createElement("div");
          crewHeading.className = "crew-heading";
          crewHeading.innerHTML = directorsOrWriters[i].job;
          const item = document.createElement("div");
          item.className = "item";
          item.innerHTML = directorsOrWriters[i].name;

          crewItem.appendChild(crewHeading);
          crewItem.appendChild(item);
          crewList.appendChild(crewItem);
        }
      }
      console.log(directorsOrWriters);


    }
  })


