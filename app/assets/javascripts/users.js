document.addEventListener("turbolinks:load", function() {
  let createPostDiv = document.getElementsByClassName("main-page-create-post")[0];
  createPostDiv.addEventListener("click", enlargeAndFocus);

  function enlargeAndFocus() {
    createPostDiv.removeEventListener("click", enlargeAndFocus);
    let createPostFormText = document.getElementsByClassName("main-page-create-post-form")[0].querySelectorAll("input")[2];
    createPostFormText.style.fontSize = "24px";

    let createPostFocus = document.getElementsByClassName("main-page-create-post-focus")[0];
    createPostFocus.style.display = "block";

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

    let submitButton = document.getElementsByClassName("main-page-create-post-submit")[0];
    submitButton.hoverBackground = "rgb(75,0,130)";
    submitButton.normalBackground = "rgb(147,112,219)";
    let activateButtonInterval = setInterval(function() {
      if (createPostFormText.value != "") {
        if (submitButton.style.pointerEvents != "auto") {
          submitButton.style.pointerEvents = "auto";
          submitButton.style.backgroundColor = "rgb(147,112,219)";
          submitButton.addEventListener("mouseover", changeBackgroundColorHover);
          submitButton.addEventListener("mouseleave", changeBackgroundColorNormal);
        }
      } else {
        submitButton.style.pointerEvents = "none";
        submitButton.style.backgroundColor = "rgba(147,112,219,0.5)";
        submitButton.removeEventListener("mouseover", changeBackgroundColorHover);
        submitButton.removeEventListener("mouseleave", changeBackgroundColorNormal);
      }
    },500)

    createPostDiv.style.boxShadow = "0 0 0 2000px rgba(0,0,0,0.55)";

    exitButton.addEventListener("click", undoEnlargeAndFocus);
  }

  function changeBackgroundColorHover(element) {
    element.target.style.backgroundColor = element.target.hoverBackground;
  }

  function changeBackgroundColorNormal(element) {
    element.target.style.backgroundColor = element.target.normalBackground;
  }

  function undoEnlargeAndFocus(event) {
    event.stopPropagation();
    let createPostFormText = document.getElementsByClassName("main-page-create-post-form")[0].querySelectorAll("input")[2];
    createPostFormText.style.fontSize = "14px";
    createPostFormText.value = "";

    let createPostFocus = document.getElementsByClassName("main-page-create-post-focus")[0];
    createPostFocus.style.display = "none";

    let createPostForm = createPostDiv.getElementsByClassName("main-page-create-post-form")[0];
    createPostDiv.style.borderBottomLeftRadius = "4px";
    createPostDiv.style.borderBottomRightRadius = "4px";
    createPostForm.style.borderBottomLeftRadius = "4px";
    createPostForm.style.borderBottomRightRadius = "4px";

    let createPostHeader = createPostDiv.getElementsByClassName("main-page-create-post-header")[0];
    let exitButton = document.getElementsByClassName("main-page-create-post-exit")[0];
    createPostHeader.removeChild(exitButton);

    createPostDiv.style.boxShadow = "none";

    createPostDiv.addEventListener("click", enlargeAndFocus);
  }
})
