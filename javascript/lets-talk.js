const greet = document.querySelector(".lt-sub-head h2 span");
const words = ["Hello", "Nǐ hǎo", "Marhaban", "Bonjour", "Hola"];
let cli = 0;
let cwi = 0;
let type_direction = "forward";

function greetings() {
  const word = words[cwi];
  if (type_direction == "forward") {
    if (cli <= word.length) {
      greet.textContent = word.slice(0, cli);
      cli++;
      setTimeout(greetings, 100);
    } else {
      type_direction = "backward";
      setTimeout(greetings, 1000);
    }
  } else if (type_direction == "backward") {
    if (cli >= 0) {
      greet.textContent = word.slice(0, cli);
      cli--;
      setTimeout(greetings, 50);
    } else {
      cli = 0;
      cwi = (cwi + 1) % words.length;
      type_direction = "forward";
      greetings();
    }
  }
}
greetings();
