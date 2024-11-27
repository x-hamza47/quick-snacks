const nav_links = document.querySelector(".nav__links"),
  nav_toggle_btn = document.querySelector("#menu-icon");

const toggler = () => {
  
  if (nav_toggle_btn.classList.contains("bx-menu")) {
    nav_toggle_btn.classList.replace("bx-menu", "bx-x");
    nav_links.style.display = "flex";
  } else {
    nav_toggle_btn.classList.replace("bx-x", "bx-menu");
    nav_links.style.display = "none";
  }
};

nav_toggle_btn.addEventListener("click", toggler);


// Info: hero section
const slides = document.querySelectorAll(".bg-slide"),
total_slides = slides.length;

let index = 0;

const heroSLides = () => {
  slides.forEach((slide) => {
    if (slide.classList.contains("active")) {
      slide.classList.add("after-active");
    } else {
      slide.classList.remove("after-active");
    }
  });

  slides[index].classList.remove("active");

  index++;

  if (index == total_slides) {
    index = 0;
  }

  slides[index].classList.add("active");
};

setInterval(() => {
  heroSLides();
}, 7000);

// ! Multiple Text Typer
const txt_bx = document.querySelector("#anim-words"),
words = ["Delicious", "Healthy", "Quick", "Tasty"];
let curr_let_in = 0, curr_word_in = 0, type_direction = "forward";

const textType = () => {
  const word = words[curr_word_in];
  if(type_direction == "forward") {
    if(curr_let_in <= word.length){
      txt_bx.textContent = word.slice(0,curr_let_in);
      curr_let_in++;
      setTimeout(textType,200);
    }else{
      type_direction = "backward";
      setTimeout(textType,1000)
    }
  }else if(type_direction == "backward"){
    if(curr_let_in >= 0){
      txt_bx.textContent = word.slice(0, curr_let_in);
      curr_let_in--;
      setTimeout(textType,80);
    }else{
      curr_let_in = 0;
      type_direction = "forward";
      curr_word_in = (curr_word_in + 1) % words.length;
      textType();
    }
  }
}
textType();

// const txt_bx = document.querySelector("#sec-txt");
// const words = ["Web Developer", "UI/UX Designer"];
// let cur_let_in = 0;
// let cur_wrd_in = 0;
// let type_direction = "forward";

// function textType() {
//   const word = words[cur_wrd_in];
//   if (type_direction == "forward") {
//     if (cur_let_in <= word.length) {
//       txt_bx.textContent = word.slice(0, cur_let_in);
//       cur_let_in++;
//       setTimeout(textType, 200);
//     } else {
//       type_direction = "backward";
//       setTimeout(textType, 1000);
//     }
//   } else if (type_direction == "backward") {
//     if (cur_let_in >= 0) {
//       txt_bx.textContent = word.slice(0, cur_let_in);
//       cur_let_in--;
//       setTimeout(textType, 80);
//     } else {
//       cur_let_in = 0;
//       type_direction = "forward";
//       cur_wrd_in = (cur_wrd_in + 1) % words.length;
//       textType();
//     }
//   }
// }
// textType();