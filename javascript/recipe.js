const chck_bxs = document.querySelectorAll(".checkbox");

chck_bxs.forEach( checkbox => {
  checkbox.addEventListener("change", () => {
    let text = checkbox.nextElementSibling;
    if(checkbox.checked){
      text.classList.add("checked");
    }else{
      text.classList.remove("checked");
    }
  });
});
