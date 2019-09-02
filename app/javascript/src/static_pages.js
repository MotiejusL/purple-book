validateSingup();

function validateSingup() {
  if (document.getElementsByClassName("signup")[0] != undefined) {
    const signupDiv = document.getElementsByClassName("signup")[0];
    const signupInputs = signupDiv.querySelectorAll("input");
    const regexForEmail = /\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
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
}
