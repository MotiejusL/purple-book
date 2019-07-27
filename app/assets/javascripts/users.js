document.addEventListener("turbolinks:load", function() {
  let createPostDiv = document.getElementsByClassName("main-page-create-post")[0];

  createPostDiv.addEventListener("click", enlargeAndFocus);

  function enlargeAndFocus() {
    createPostDiv.removeEventListener("click", enlargeAndFocus);
    let createPostFormText = document.getElementsByClassName("main-page-create-post-form")[0].querySelectorAll("input")[2];
    createPostFormText.style.fontSize = "24px";

    let createPostFocus = document.getElementsByClassName("main-page-create-post-focus")[0];
    createPostFocus.style.visibility = "visible";

    let createPostForm = createPostDiv.getElementsByClassName("main-page-create-post-form")[0];
    createPostDiv.style.borderBottomLeftRadius = "0";
    createPostDiv.style.borderBottomRightRadius = "0";
    createPostForm.style.borderBottomLeftRadius = "0";
    createPostForm.style.borderBottomRightRadius = "0";

    let createPostHeader = createPostDiv.getElementsByClassName("main-page-create-post-header")[0];
    let exitButton = document.createElement("button");
    let exitIcon = document.createElement("i");
    exitIcon.classList.add("fas");
    exitIcon.classList.add("fa-times");
    exitButton.classList.add("main-page-create-post-exit");
    exitButton.appendChild(exitIcon);
    createPostHeader.appendChild(exitButton);

    let activateButtonInterval = setInterval(function() {
      if (createPostFormText.value != "") {
        let submitButton = document.getElementsByClassName("main-page-create-post-submit")[0];
        submitButton.style.backgroundColor = "rgb(147,112,219)";
        submitButton.style.pointerEvents = "auto";
        submitButton.addEventListener("mouseover", function () { submitButton.style.backgroundColor = "rgb(75,0,130)"});
        submitButton.addEventListener("mouseleave", function () { submitButton.style.backgroundColor = "rgb(147,112,219)"});
        clearInterval(activateButtonInterval);
      }
    },500)

    createPostDiv.style.boxShadow = "0 0 0 2000px rgba(0,0,0,0.55)";

    exitButton.addEventListener("click", undoEnlargeAndFocus);
  }

  function undoEnlargeAndFocus(event) {
    event.stopPropagation();
    let createPostFormText = document.getElementsByClassName("main-page-create-post-form")[0].querySelectorAll("input")[2];
    createPostFormText.style.fontSize = "14px";

    let createPostFocus = document.getElementsByClassName("main-page-create-post-focus")[0];
    createPostFocus.style.visibility = "hidden";

    let createPostForm = createPostDiv.getElementsByClassName("main-page-create-post-form")[0];
    createPostDiv.style.borderBottomLeftRadius = "4px";
    createPostDiv.style.borderBottomRightRadius = "4px";
    createPostForm.style.borderBottomLeftRadius = "4px";
    createPostForm.style.borderBottomRightRadius = "4px";

    let createPostHeader = createPostDiv.getElementsByClassName("main-page-create-post-header")[0];
    let exitButton = document.getElementsByClassName("main-page-create-post-exit")[0];
    createPostHeader.removeChild(exitButton);

    let submitButton = document.getElementsByClassName("main-page-create-post-submit")[0];
    submitButton.style.pointerEvents = "none";

    createPostDiv.style.boxShadow = "none";

    createPostDiv.addEventListener("click", enlargeAndFocus);

  }
})
