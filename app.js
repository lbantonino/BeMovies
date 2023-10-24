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

// Functions

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

document.addEventListener("click", (e) => {
  if (e.target === cross) {
    popup.style.display = "none"
  } else if (e.target.matches(".btn-login")) {
    loginCheck()
  } /* else if (e.target.matches("")){

  } */
})