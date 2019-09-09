import { clearChildNodesExcept } from './posts'

countFriendsInProfile();
addButtonsInFriendTab();
enlargePhotosInPhotosTab();
switchInfoInAboutTab();
setStyleToClickedOnTabs();

function countFriendsInProfile() {
  if (document.getElementsByClassName("user-profile-page-friends-count")[0] != undefined) {
    let friendsCount = document.getElementsByClassName("user-profile-page-friends-count")[0];
      Rails.ajax({
        url: "/users/profile/get_friends_count",
        type: "GET",
        beforeSend: function() {
          return true;
        },
        success: function(response) {
          friendsCount.textContent = response.friendsCount;
        },
        error: function(response) {
          alert(response);
        }
      })
  }
}

function addButtonsInFriendTab() {
  let FriendOrNotButtons = document.querySelectorAll(".users-reusable-user-info-right button");
  let usersIds = document.querySelectorAll(".users-reusable-user-info-left input");
  Rails.ajax({
    url: "/users/profile/get_current_user_friends",
    type: "GET",
    beforeSend: function() {
      return true;
    },
    success: function(response) {
      FriendOrNotButtons.forEach(function(element, index) {
        if (response.friendsIds.includes(parseInt(usersIds[index].value))) {
          element.classList.add("friend");
          let icon = document.createElement("i");
          icon.classList.add("fas");
          icon.classList.add("fa-check");
          element.appendChild(icon);
          element.innerHTML += "Friends";
        } else {
          element.classList.add("not-friend");
          let icon = document.createElement("i");
          icon.classList.add("fas");
          icon.classList.add("fa-user-plus");
          element.appendChild(icon);
          element.innerHTML += "Add Friend";
        }
      })
    },
    error: function(response) {
      alert(response);
    }
  })
}

function enlargePhotosInPhotosTab() {
  let images = document.querySelectorAll(".user-profile-page-photos-tab-photo .image-holder img");
  let profileImages = document.querySelectorAll(".user-profile-page-photos-photo img");
  let imageShadows = document.querySelectorAll(".user-profile-page-photos-tab-photo .image-holder .image-hover-shadow");

  images.forEach(function(element, index) {
    imageShadows[index].selectedImage = element;
    imageShadows[index].profile = false;
    imageShadows[index].addEventListener("click", enlargePhoto);
  })

  profileImages.forEach(function(element, index) {
    element.profile = true;
    element.addEventListener("click", enlargePhoto);
  })
}

function enlargePhoto(element) {
  let sentImage;
  if (element.currentTarget.profile) {
    sentImage = element.currentTarget
  } else {
    sentImage = element.currentTarget.selectedImage;
  }
  let modal = document.getElementsByClassName("modal")[0];
  let modalContentImage = document.getElementsByClassName("modal-content")[0];
  let modalExit = document.getElementsByClassName("modal-exit")[0];
  modal.style.display = "flex";
  modalContentImage.src = sentImage.src;

  modalExit.modal = modal;
  modalExit.addEventListener("click", exitEnlargedPhoto);
}

function exitEnlargedPhoto(element) {
  let exitButton = element.currentTarget;
  exitButton.modal.style.display = "none";
  exitButton.removeEventListener("click", exitEnlargedPhoto);
}

function switchInfoInAboutTab() {
  if (document.getElementById("profile-user-id") != undefined) {
    let aboutTabSelects = document.querySelectorAll(".user-profile-page-about-tab-select li");
    let aboutTabShow = document.getElementsByClassName("user-profile-page-about-tab-selects-show")[0];
    let profileUserId = document.getElementById("profile-user-id").value;

    Rails.ajax({
      url: "/users/" + profileUserId + "/profile/about/get_profile_user_info",
      type: "GET",
      beforeSend: function() {
        return true;
      },
      success: function(response) {
        let birthday = new Date(response.birthday);
        let birthdayMonthAndDay = birthday.toLocaleDateString("en-US", { month: 'long', day: 'numeric'});
        let birthdayYear = birthday.toLocaleDateString("en-US", { year: 'numeric'});

        aboutTabSelects[0].classList.add("user-profile-page-about-tab-select-clicked");
        createInfoBox("CONTACT INFORMATION", ["Email"], [response.email], aboutTabShow);
        createInfoBox("BASIC INFORMATION", ["Birth Date", "Birth Year", "Gender"], [birthdayMonthAndDay, birthdayYear, response.gender], aboutTabShow);
        aboutTabSelects.forEach(function (element, index) {
          element.showContainer = aboutTabShow;
          element.allProfileInfo = response;
          element.birthdayMonthAndDay = birthdayMonthAndDay;
          element.birthdayYear = birthdayYear;
          element.allSelects = aboutTabSelects;

          element.addEventListener("click", infoShow);
        })
      },
      error: function(response) {
        alert(error);
      }
    })
  }
}

function addClassClickedFromSelectsInAboutTab(element, allSelects) {
  element.classList.add("user-profile-page-about-tab-select-clicked");
  allSelects.forEach(function (select) {
    if (select != element) {
      select.classList.remove("user-profile-page-about-tab-select-clicked");
    }
  })
}

function infoShow(element) {
  let elementClicked = element.currentTarget;
  clearChildNodesExcept(0, elementClicked.showContainer);
  addClassClickedFromSelectsInAboutTab(elementClicked, elementClicked.allSelects);

  if (elementClicked.id == "basic-info") {
    createInfoBox("CONTACT INFORMATION", ["Email"], [elementClicked.allProfileInfo.email], elementClicked.showContainer);
    createInfoBox("BASIC INFORMATION", ["Birth Date", "Birth Year", "Gender"], [elementClicked.birthdayMonthAndDay, elementClicked.birthdayYear, elementClicked.allProfileInfo.gender], elementClicked.showContainer);
  } else if (elementClicked.id == "education") {
    createInfoBox("SCHOOL", ["Went to"], [elementClicked.allProfileInfo.school], elementClicked.showContainer);
  }
}

function createInfoBox(headerString, informationHeaders ,informationToShow, containerToStore) {
  let informationContainer = document.createElement("div");
  informationContainer.classList.add("user-profile-about-tab-information-container");
  let informationHeader = document.createElement("h3");
  informationHeader.textContent = headerString;
  informationContainer.appendChild(informationHeader);
  informationToShow.forEach(function (element, index) {
    let informationInfoHeader = document.createElement("span");
    informationInfoHeader.textContent = informationHeaders[index];
    let informationInfo = document.createElement("p");
    informationInfo.textContent = element;
    informationContainer.appendChild(informationInfoHeader);
    informationContainer.appendChild(informationInfo);
  })
  containerToStore.appendChild(informationContainer);
}

function setStyleToClickedOnTabs() {
  let currentPage = document.querySelectorAll(".user-profile-page-content .hidden-tab-fields input");
  currentPage.forEach(function (element) {
    let tab = document.getElementById(String(element.id).slice(6));
    tab.style.color = "rgb(75,79,86)";
    let triangle = createTriangleArrowUp();
    triangle.style.position = "absolute";
    triangle.style.bottom = "0";
    triangle.style.left = "50%";
    triangle.style.marginLeft = "-7.5px";
    tab.appendChild(triangle);
  })
}

function createTriangleArrowUp() {
  let innerTriangle = document.createElement("div");
  innerTriangle.style.cssText = "width: 0; height: 0; border-bottom: 8px solid rgb(230,233,236); border-right: 7.5px solid transparent; border-left: 7.5px solid transparent; position: relative; top: 1.5px; right: 7.45px";
  let outerTriangle = document.createElement("div");
  outerTriangle.style.cssText = "width: 0; height: 0; border-bottom: 9.5px solid rgb(211,214,219); border-right: 9px solid transparent; border-left: 9px solid transparent;";
  outerTriangle.appendChild(innerTriangle);
  return outerTriangle;
}
