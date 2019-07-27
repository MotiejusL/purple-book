document.addEventListener("turbolinks:load", function() {
  validateSingup();
})

function validateSingup() {
  let signupDiv = document.getElementsByClassName("signup")[0];
  let signupInputs = signupDiv.querySelectorAll("input");
  let regexForEmail = /\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
  signupInputs.forEach(function (element) {
      element.addEventListener("blur", function() {
        if (element.value == "" ||
            element.id == "email" && regexForEmail.test(element.value) != true ||
            element.id == "password" && element.value.length < 6) {
          element.style.border = "1px solid red";
        } else {
          element.style.border = "1px solid #ccd0d5";
        }
      })
  })
}
