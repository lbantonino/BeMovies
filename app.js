var swiper = new Swiper(".mySwiper", {
    slidesPerView: 4,
    spaceBetween: 19,
    navigation: {
        nextEl: ".button-next",
        prevEl: ".button-prev",
        clickable: true,
      },
      // mousewheel: true,
  });

  var newSwiper = new Swiper(".mySwiper1", {
    slidesPerView: 4,
    spaceBetween: 19,
    navigation: {
        nextEl: ".button-next1",
        prevEl: ".button-prev1",
        clickable: true,
      },
      // mousewheel: true,
  });

  var newSwiper1 = new Swiper(".mySwiper2", {
    slidesPerView: 4,
    spaceBetween: 19,
    navigation: {
        nextEl: ".button-next2",
        prevEl: ".button-prev2",
        clickable: true,
      },
      // mousewheel: true,
  });

// Variables

const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkMTJjZjE0ZDQzNzQyZjJiMWE1ZWFjMmNkMmQxMDU3MiIsInN1YiI6IjY1MzhjMDEzYWUzNjY4MDBhZGE4MDIzNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.L1jWmZ_mygneYzG_Jd0RZ57Avi5K1qyiSvvFXwl6ybc'
  }
}
let body = document.querySelector("body")
let popup = document.querySelector(".popup");
let crossDiv = document.querySelector(".cross");
let cross = crossDiv.querySelector("img");
let menu = document.querySelector(".menu");
let register = menu.children[3];
let signIn = menu.children[4];
let footerMenu = document.querySelector(".footer-menu");
let footerRegister = footerMenu.children[3];
let footerSignIn = footerMenu.children[4];
let searchingBar = document.querySelector("#search");
let mySwiper1 = document.querySelector(".mySwiper");
let swiper1 = mySwiper1.querySelector(".swiper-wrapper");
let mySwiper2 = document.querySelector(".mySwiper1");
let swiper2 = mySwiper2.querySelector(".swiper-wrapper");
let mySwiper3 = document.querySelector(".mySwiper2");
let swiper3 = mySwiper3.querySelector(".swiper-wrapper");
let genres = {
  id28: "Action",
  id12: "Adventure",
  id16: "Animation",
  id35: "Comedy",
  id80: "Crime",
  id99: "Documentary",
  id18: "Drama",
  id10751: "Family",
  id14: "Fantasy",
  id36: "History",
  id27: "Horror",
  id10402: "Music",
  id9648: "Mystery",
  id10749: "Romance",
  id878: "Science Fiction",
  id10770: "TV Movie",
  id53: "Thriller",
  id10572: "War",
  id37: "Western",
}

// Functions


let fetchBySearch = async (search) => {
  try {
    let res = await fetch(`https://api.themoviedb.org/3/search/movie?query=${search}&include_adult=false&language=en-US`, options)
    let data = await res.json()
    let arrayData = data.results;
    arrayData.forEach(element => {
      // create the swiper slide div
      let newDiv = document.createElement("div");
      let swiperSlide = swiper1.appendChild(newDiv);
      swiperSlide.classList.add("swiper-slide");
      // retrieve data for the movie
      console.log(element)
      genreFunc(element);
      titleFunc(element);
      yearFunc(element);
      rateFunc(element);
      let newImg = document.createElement("img");
      let img = swiperSlide.appendChild(newImg);
      img.src = posterFunc(element.poster_path);
    });
    console.log(arrayData)
  } catch (error) {
      console.log(error)
  }
}

let genreFunc = (element) => {
  let arrayOfGenre = element.genre_ids;
  let movieGenre = []
  arrayOfGenre.forEach(cat => {
    movieGenre.push(genres[`id${cat}`])
  });
  movieGenre = movieGenre.toString()
  movieGenre = movieGenre.replaceAll(","," / ")
  console.log(movieGenre)
  return movieGenre
}

let posterFunc = (url) => {
  return `https://image.tmdb.org/t/p/original${url}`
}

let titleFunc = (element) => {
  let title = element.original_title;
  console.log(title)
  return title
}

let yearFunc = (element) => {
  let date = element.release_date;
  let year = date.slice(0,4)
  console.log(year)
  return year
}

let rateFunc = (element) => {
  let rate = element.vote_average;
  console.log(rate)
  return rate
}

// Reset Swiper

let resetSwiper = (swiper) => {
  swiper.innerHTML = "";
}

let loginModal = () => {
  let template = document.querySelector();
  let newDiv = document.createElement("div");
  let modal = body.appendChild(newDiv);
  modal.classList.add("popup");
  modal.innerHTML = template.children[0].innerHTML;
}

let registerModal = () => {
  let template = document.querySelector();
  let newDiv = document.createElement("div");
  let modal = body.appendChild(newDiv);
  modal.classList.add("popup");
  modal.innerHTML = template.children[0].innerHTML;
}

/* let loginCheck = () => {
  let username = document.querySelector("#username");
  let password = document.querySelector("#password");
  let rememberCheckbox = document.querySelector("#remember");
  let menu = document.querySelector(".menu");
  // let openSignIn = menu.childElement[5].children;
  
  if (username.value.trim()) {
    let info = {
      Username: username.value,
      Password: password.value,
      Remember: rememberCheckbox.checked,
    };
    console.log(info);
    username.value = "";
    password.value = "";
    rememberCheckbox.checked = false;
  }
} */

// Actions
document.addEventListener("click", (e) => {
  if (e.target === cross) {
    popup.style.display = "none"
  } else if (e.target.matches(".btn-login")) {
    loginCheck()
  } else if (e.target.matches(".btn-search")){
    resetSwiper(swiper1)
    fetchBySearch(searchingBar.value)
  } else if (e.target == register || e.target == register.children[0] || e.target == footerRegister || e.target == footerRegister.children[0]) {
    console.log("register")
  } else if (e.target == signIn || e.target == signIn.children[0] || e.target == footerSignIn || e.target == footerSignIn.children[0]) {
    loginModal()
  }
})