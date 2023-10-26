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
let genreUL = document.querySelector(".genre");
let comedyGenre = genreUL.children[0];
let dramaGenre = genreUL.children[1];
let actionGenre = genreUL.children[2];
let romanceGenre = genreUL.children[3];
let fantasyGenre = genreUL.children[4];
let animationGenre = genreUL.children[5];
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
      createSlide(element, swiper1)
    });
  } catch (error) {
      console.log(error)
  }
}

let fetchByGenre = async (genreId) => {
  try {
    let res = await fetch(`https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=${genreId}`, options)
    let data = await res.json()
    let arrayData = data.results;
    arrayData.forEach(element => {
      createSlide(element, swiper3)
    });
  } catch (error) {
      console.log(error)
  }
}

let fetchLatest = async () => {
  try {
    let res = await fetch(``, options)
    let data = await res.json()
    let arrayData = data.results;
    arrayData.forEach(element => {
      createSlide(element, swiper2)
    });
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
  return movieGenre
}

let img = (element) => {
  let url = element.poster_path
  return `https://image.tmdb.org/t/p/original${url}`
}

let titleFunc = (element) => {
  let title = element.original_title;
  return title
}

let yearFunc = (element) => {
  let date = element.release_date;
  let year = date.slice(0,4)
  return year
}

let rateFunc = (element) => {
  let rate = element.vote_average;
  return rate
}

let createSlide = (element, swiper) => {
  let template = document.querySelector("#swiper-template")
  let newDiv = document.createElement("div");
  let swiperSlide = swiper.appendChild(newDiv);
  swiperSlide.classList.add("swiper-slide");
  swiperSlide.innerHTML = template.innerHTML;
  createOver(element, swiperSlide)
}

let createOver = (element, swiperSlide) => {
  let movieImg = img(element);
  let slideImg = swiperSlide.children[0].querySelector("img");
  slideImg.src = movieImg;
  let title = titleFunc(element);
  let slideTitle = swiperSlide.querySelector("h1");
  slideTitle.textContent = title;
  let year = yearFunc(element);
  let slideYear = swiperSlide.querySelector("h2");
  slideYear.textContent = year;
  let genre = genreFunc(element);
  let slideGenre = swiperSlide.querySelector("h3");
  slideGenre.textContent = genre;
  let rate = rateFunc(element);
  let slideRate = swiperSlide.querySelector("h4");
  slideRate.textContent = rate;
}

let resetSwiper = (swiper) => {
  swiper.innerHTML = "";
}

let loginModal = () => {
  let template = document.querySelector("#popup-modal-login");
  let newDiv = document.createElement("div");
  let modal = body.appendChild(newDiv);
  modal.innerHTML = template.innerHTML;
  let newMember = document.querySelector(".new-memeber");
  let signInButton = newMember.querySelector("span")
  closeModal()
  loginCheck()
  document.addEventListener("click", (e) => {
    if (e.target === signInButton) {
      let modalW = document.querySelector(".popup").parentElement;
      modalW.remove()
      registerModal()
    }
  })
  
}

let registerModal = () => {
  let template = document.querySelector("#popup-modal-register");
  let newDiv = document.createElement("div");
  let modal = body.appendChild(newDiv);
  modal.innerHTML = template.innerHTML;
  closeModal()
  registerCheck()
}

let closeModal = () => {
  let modal = document.querySelector(".popup").parentElement
  let crossDiv = document.querySelector(".cross");
  let cross = crossDiv.querySelector("img")
  document.addEventListener("click", (e) => {
    if (e.target.matches(".popup")) {
      modal.remove()
    } else if (e.target === cross) {
      modal.remove()
    }
  })
}

let loginCheck = () => {
  let username = document.querySelector("#username");
  let password = document.querySelector("#password");
  let rememberCheckbox = document.querySelector("#remember");
  let button = document.querySelector(".btn-login")
  button.addEventListener("click", () => {
    if (username.value.trim() && password.value.trim()) {
      let info = {
        Username: username.value,
        Password: password.value,
        Remember: rememberCheckbox.checked,
      };
      console.log(info);
      let modal = document.querySelector(".popup").parentElement;
      modal.remove();
    }
  })
}

let registerCheck = () => {
  let username = document.querySelector("#username");
  let email = document.querySelector("#email");
  let password1 = document.querySelector("#password1");
  let password2 = document.querySelector("#password2");
    document.addEventListener("click", (e) => {
      if (e.target.matches(".btn-register")) {
        if (username.value.trim() && email.value.trim() && password1.value == password2.value) {
          let info = {
            Username: username.value,
            Email: email.value,
            Password: password1.value,
          };
        console.log(info)
        let modal = document.querySelector(".popup").parentElement;
        modal.remove();
      }
    }
  })
}

// Actions

resetSwiper(swiper2)
fetchLatest()
resetSwiper(swiper3)
fetchByGenre(35)

document.addEventListener("click", (e) => {
  if (e.target.matches(".btn-search")) {
    // Fetch by searching bar
    resetSwiper(swiper1)
    fetchBySearch(searchingBar.value)
  } else if (e.target == register || e.target == register.children[0] || e.target == footerRegister || e.target == footerRegister.children[0]) {
    // Open Register Modal
    registerModal()
  } else if (e.target == signIn || e.target == signIn.children[0] || e.target == footerSignIn || e.target == footerSignIn.children[0]) {
    // Open Login Modal
    loginModal()
  } else if (e.target == comedyGenre) {
    // Fetch comedy
    resetSwiper(swiper3)
    fetchByGenre(35)
  } else if (e.target == dramaGenre) {
    // Fetch drama
    resetSwiper(swiper3)
    fetchByGenre(18)
  } else if (e.target == actionGenre) {
    // Fetch action
    resetSwiper(swiper3)
    fetchByGenre(28)
  } else if (e.target == romanceGenre) {
    // Fetch fantasy
    resetSwiper(swiper3)
    fetchByGenre(10749)
  } else if (e.target == fantasyGenre) {
    // Fetch fantasy
    resetSwiper(swiper3)
    fetchByGenre(14)
  } else if (e.target == animationGenre) {
    // Fetch animation
    resetSwiper(swiper3)
    fetchByGenre(16)
  }
})
search.addEventListener("change", (e) => {
  // Fetch by searching bar
  e.preventDefault()
  resetSwiper(swiper1)
  fetchBySearch(searchingBar.value)
}) 