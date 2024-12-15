// Carousel
const next_btn = document.getElementById("next"),
  prev_btn = document.getElementById("prev"),
  carousel = document.querySelector(".carousel"),
  list = document.querySelector(".carousel .list"),
  thumbnail = document.querySelector(".carousel .thumbnail");

next_btn.onclick = () => {
  showSlider("next");
};
prev_btn.onclick = () => {
  showSlider("prev");
};
let timer = 3000;
let time_out;
let autoplay = 7000;
let autoRun = setTimeout(() => {
  next_btn.click();
}, autoplay);

function showSlider(type) {
  let item_slider = document.querySelectorAll(".carousel .list .item");
  let item_thumb = document.querySelectorAll(".carousel .thumbnail .item");

  if (type === "next") {
    list.appendChild(item_slider[0]);
    thumbnail.appendChild(item_thumb[0]);
    carousel.classList.add("next");
  } else {
    let pos_last_item = item_slider.length - 1;
    list.prepend(item_slider[pos_last_item]);
    thumbnail.prepend(item_thumb[pos_last_item]);
    carousel.classList.add("prev");
  }

  clearTimeout(time_out);
  time_out = setTimeout(() => {
    carousel.classList.remove("next");
    carousel.classList.remove("prev");
  }, timer);

  clearTimeout(autoRun);
  autoRun = setTimeout(() => {
    next_btn.click();
  }, autoplay);
}
