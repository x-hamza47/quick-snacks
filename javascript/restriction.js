import * as res from "./modules.js";
document.addEventListener("DOMContentLoaded", () => {

    const name_restriction = document.querySelector(".inp_grp #name");

    name_restriction.addEventListener("keypress", function (e) {
    let maxLength = 50;
    let inputText = this.value;

    if (inputText.length >= maxLength) {
        e.preventDefault();
    }
    });
    const num_restriction = document.querySelector("#phone");

    num_restriction.addEventListener("keypress", function (e) {
    let key = e.key;
    if (/^[a-zA-Z]$/.test(key)) {
        e.preventDefault();
    }
    let maxLength = 14;
    let inputText = this.value;

    if (inputText.length > maxLength) {
        e.preventDefault();
    }
    });

    const cont_msg = document.querySelector(".msg_grp #msg");

    cont_msg.addEventListener("keypress", function (e) {
    let maxLength = 500;
    let inputText = this.value;

    if (inputText.length >= maxLength) {
        if (
        e.key === "Backspace" ||
        e.key === "Delete" ||
        e.key === "ArrowLeft" ||
        e.key === "ArrowRight"
        ) {
        return;
        }
        e.preventDefault();
    }
    });
  function checkEmail(email) {
    const emailPattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return emailPattern.test(email);
  }
  function checkPhone(phone) {
    let phonePattern = /^(?:\+?\d{1,3}[-.\s]?)?(\(?\d{2,5}\)?[-.\s]?\d{1,4}){1,4}$/;
    return phonePattern.test(phone);
  }

  res.closeIcon.addEventListener("click", res.clears);

  // Form Submission
  let errors = {
    fields: "Please fill out all required fields.",
    email: "Please enter a valid email.",
    number: "Please enter a valid number.",
  };

  res.send_btn.addEventListener("click", function (e) {
    e.preventDefault();
    let sndr_name = document.querySelector("#name").value;
    let sndr_phone = document.querySelector("#phone").value;
    let sndr_email = document.querySelector("#email").value;
    let sndr_msg = document.querySelector("#msg").value;

    if (sndr_name == "" || sndr_email == "" || sndr_msg == "") {
      res.err("Validation Error", errors.fields);
    } else if (!checkEmail(sndr_email)) {
      res.err("Validation Error", errors.email);
    } else if (!checkPhone(sndr_phone) && sndr_phone != "") {
      res.err("Validation Error", errors.number);
    } else {
      res.success(
        "Successfull",
        "Your message has been sent successfully."
      );
      form.reset();
      const inputBox =form.querySelectorAll("input, textarea");
      inputBox.forEach( e => e.classList.remove("filled"));
      res.send_btn.firstElementChild.classList.add("send-email");
        let parms = {
          name: sndr_name,
          email: sndr_email,
          phone: sndr_phone,
          message: sndr_msg,
        };
        emailjs.send("service_ugwl7ggk", "template_ovq9e0k", parms).then();
    }
  });
});