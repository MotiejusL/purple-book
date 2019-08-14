import { promiseOfCurrentUser } from './users'

  const friendRequestButton = document.getElementsByClassName("user-main-page-header-friend-requests")[0].querySelector("i");
  const friendRequestsDiv = document.getElementsByClassName("user-main-page-header-friend-requests")[0];
  const headerDiv = document.getElementsByClassName("user-main-page-header")[0];
  let currentUserId;

  friendRequestButton.addEventListener("click", showFriendRequests);

  function showFriendRequests(element) {
    const friendRequestButton = element.currentTarget;
    friendRequestButton.style.color = "rgb(255,255,255)";

    const arrowForRequestsContainer = document.createElement("div");
    arrowForRequestsContainer.classList.add("arrow-for-requests-container");

    const friendRequestsContainer = document.createElement("div");
    friendRequestsContainer.classList.add("headerPopUpContainer");

    addFriendRequestsHeader(friendRequestsContainer);
    loadAllRequests(friendRequestsContainer, friendRequestButton, arrowForRequestsContainer);

    friendRequestButton.container = friendRequestsContainer;
    friendRequestButton.arrow = arrowForRequestsContainer;

    friendRequestButton.removeEventListener("click", showFriendRequests);
    friendRequestButton.addEventListener("click", hideFriendRequests);
  }

  function hideFriendRequests(element) {
    const friendRequestButton = element.currentTarget;
    friendRequestButton.style.color = "#3c1053";

    friendRequestsDiv.removeChild(friendRequestButton.container);
    friendRequestsDiv.removeChild(friendRequestButton.arrow);

    friendRequestButton.removeEventListener("click", hideFriendRequests);
    friendRequestButton.addEventListener("click", showFriendRequests);
  }

  function addFriendRequestsHeader(friendRequestsContainer) {
    const friendRequestsHeader = document.createElement("div");
    friendRequestsHeader.classList.add("friend-requests-header");
    const friendRequestsHeaderLeft = document.createElement("div");
    const friendRequestsHeaderRight = document.createElement("div");
    const linkToAllFriends = document.createElement("a");
    linkToAllFriends.innerHTML = "Find Friends";
    friendRequestsHeaderRight.appendChild(linkToAllFriends);
    friendRequestsHeaderLeft.innerHTML = "Friend Requests";
    friendRequestsHeaderLeft.classList.add("friend-requests-text");
    friendRequestsHeaderRight.classList.add("friend-requests-links");
    friendRequestsHeader.appendChild(friendRequestsHeaderLeft);
    friendRequestsHeader.appendChild(friendRequestsHeaderRight);
    friendRequestsContainer.appendChild(friendRequestsHeader);
  }

  function loadAllRequests(friendRequestsContainer, friendRequestButton, arrowForRequestsContainer) {
    promiseOfCurrentUser().then(function(userId) {
      Rails.ajax({
        url: "/users/" + userId + "/friend_requests",
        type: "GET",
        beforeSend: function() {
          return true;
        },
        success: function(response) {
          response.friendRequestsUsers.forEach(function (element) {
            addRequest(element, friendRequestsContainer);
          })
          friendRequestsDiv.appendChild(friendRequestsContainer);
          friendRequestsDiv.appendChild(arrowForRequestsContainer);
        },
        error: function(response) {
          alert(response);
        }
      })
    })
  }

  function addRequest(element, friendRequestsContainer) {
    const requestContainer = document.createElement("div");
    requestContainer.classList.add("user-main-page-request-container");

    const requestProfile = document.createElement("div");
    requestProfile.classList.add("user-main-page-request-profile");
    const requestUserImage = document.createElement("img");
    requestUserImage.src = "../assets/" + element.img + "";
    requestUserImage.classList.add("user-main-page-request-image");
    const requestUserName = document.createElement("div");
    requestUserName.innerHTML = element.name;
    requestUserName.classList.add("user-main-page-request-name");
    requestProfile.appendChild(requestUserImage);
    requestProfile.appendChild(requestUserName);


    const requestButtons = document.createElement("div");
    requestButtons.classList.add("user-main-page-request-buttons");
    const confirmButton = document.createElement("button");
    confirmButton.innerHTML = "Confirm";
    confirmButton.requestContainer = requestContainer;
    confirmButton.requestsContainer = friendRequestsContainer;
    confirmButton.requestId = element.requestId;
    confirmButton.addEventListener("click", confirmRequest);
    const deleteButton = document.createElement("button");
    deleteButton.innerHTML = "Delete";
    deleteButton.requestContainer = requestContainer;
    deleteButton.requestsContainer = friendRequestsContainer;
    deleteButton.requestId = element.requestId;
    deleteButton.addEventListener("click", deleteRequest);
    requestButtons.appendChild(confirmButton);
    requestButtons.appendChild(deleteButton);

    requestContainer.appendChild(requestProfile);
    requestContainer.appendChild(requestButtons);
    friendRequestsContainer.appendChild(requestContainer);
  }

  function confirmRequest(element) {
    const buttonClicked = element.currentTarget;
    Rails.ajax({
      url: "/users/friend_requests/" + buttonClicked.requestId + "/accept",
      type: "PUT",
      beforeSend: function() {
        return true;
      },
      success: function(response) {
        buttonClicked.requestsContainer.removeChild(buttonClicked.requestContainer);
      },
      error: function(response) {
        alert(response);
      }
    })
  }

  function deleteRequest(element) {
    const buttonClicked = element.currentTarget;
    Rails.ajax({
      url: "/users/friend_requests/" + buttonClicked .requestId + "/delete",
      type: "DELETE",
      beforeSend: function() {
        return true;
      },
      success: function(response) {
        buttonClicked.requestsContainer.removeChild(buttonClicked.requestContainer);
      },
      error: function(response) {
        alert(response);
      }
    })
  }
