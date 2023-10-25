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

let popup = document.querySelector(".popup");
let crossDiv = document.querySelector(".cross");
let cross = crossDiv.querySelector("img");
let searchingBar = document.querySelector("#search")
const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkMTJjZjE0ZDQzNzQyZjJiMWE1ZWFjMmNkMmQxMDU3MiIsInN1YiI6IjY1MzhjMDEzYWUzNjY4MDBhZGE4MDIzNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.L1jWmZ_mygneYzG_Jd0RZ57Avi5K1qyiSvvFXwl6ybc'
  }
};

// Functions


let checkAuth = async() => {
    try {
      let res = await fetch('https://api.themoviedb.org/3/authentication', options)
      let data = await res.json()
      console.log(data)
  } catch (error) {
      console.log(error)
  }
}

let fetchBySearch = async (search) => {
  try {
    let res = await fetch(`https://api.themoviedb.org/3/search/movie?query=pirate&include_adult=false&language=en-US`, options)
    let data = await res.json()
    let arrayData = data.results
    arrayData.forEach(element => {
      posterFunc(element.poster_path)
    });
    console.log(arrayData)
  } catch (error) {
      console.log(error)
  }
}

let posterFunc = (url) => {
  console.log(`https://image.tmdb.org/t/p/original${url}`)
}

/* let fetchLatest = async () => {
  try {
    let res = await fetch('https://api.themoviedb.org/3/movie/latest', options)
    let data = await res.json()
    console.log(data)
  } catch (error) {
      console.log(error)
  }
} */

let loginCheck = () => {
  let username = document.querySelector("#username");
  let password = document.querySelector("#password");
  let rememberCheckbox = document.querySelector("#remember");
  let menu = document.querySelector(".menu");
  /* let openSignIn = menu.childElement[5].children; */
  
  
  
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
}

// Actions
/* fetchBySearch("pirate") */
document.addEventListener("click", (e) => {
  if (e.target === cross) {
    popup.style.display = "none"
  } else if (e.target.matches(".btn-login")) {
    loginCheck()
  } else if (e.target.matches(".btn-search")){
    fetchBySearch(searchingBar.value)
  }
})


// https://image.tmdb.org/t/p/original${poster-path}

//https://api.themoviedb.org/3/search/movie?query=pirate&include_adult=false&language=en-US&page=1