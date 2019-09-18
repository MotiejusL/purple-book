import { promiseOfCurrentUser } from './users';

addButtonsInFriendTab();

if (document.getElementsByClassName('user-main-page-header-friend-requests')[0] !== undefined) {
  addConfimDeleteRequestActionToAllRequestsPage();
  const friendRequestButton = document.getElementsByClassName('user-main-page-header-friend-requests')[0].querySelector('i');
  const friendRequestsDiv = document.getElementsByClassName('user-main-page-header-friend-requests')[0];
  friendRequestButton.friendRequestsDiv = friendRequestsDiv;
  friendRequestButton.addEventListener('click', showFriendRequests);
}

function showFriendRequests(element) {
  const friendRequestButton = element.currentTarget;
  friendRequestButton.classList.add('active');

  const arrowForRequestsContainer = document.createElement('div');
  arrowForRequestsContainer.classList.add('arrow-for-requests-container');

  const friendRequestsContainer = document.createElement('div');
  friendRequestsContainer.classList.add('headerPopUpContainer');

  addFriendRequestsHeader(friendRequestsContainer);
  loadAllRequests(friendRequestsContainer, friendRequestButton, arrowForRequestsContainer);

  friendRequestButton.container = friendRequestsContainer;
  friendRequestButton.arrow = arrowForRequestsContainer;

  friendRequestButton.removeEventListener('click', showFriendRequests);
  friendRequestButton.addEventListener('click', hideFriendRequests);
}

function hideFriendRequests(element) {
  const friendRequestButton = element.currentTarget;
  const friendRequestsDiv = friendRequestButton.friendRequestsDiv;
  friendRequestButton.classList.remove('active');

  friendRequestsDiv.removeChild(friendRequestButton.container);
  friendRequestsDiv.removeChild(friendRequestButton.arrow);

  friendRequestButton.removeEventListener('click', hideFriendRequests);
  friendRequestButton.addEventListener('click', showFriendRequests);
}

function addFriendRequestsHeader(friendRequestsContainer) {
  const friendRequestsHeader = document.createElement('div');
  friendRequestsHeader.classList.add('friend-requests-header');
  const friendRequestsHeaderLeft = document.createElement('div');
  const friendRequestsHeaderRight = document.createElement('div');
  const linkToAllFriends = document.createElement('a');
  linkToAllFriends.innerHTML = 'Find Friends';
  friendRequestsHeaderRight.appendChild(linkToAllFriends);
  friendRequestsHeaderLeft.innerHTML = 'Friend Requests';
  friendRequestsHeaderLeft.classList.add('friend-requests-text');
  friendRequestsHeaderRight.classList.add('friend-requests-links');
  friendRequestsHeader.appendChild(friendRequestsHeaderLeft);
  friendRequestsHeader.appendChild(friendRequestsHeaderRight);
  friendRequestsContainer.appendChild(friendRequestsHeader);
}

function loadAllRequests(friendRequestsContainer, friendRequestButton, arrowForRequestsContainer) {
  const friendRequestsDiv = friendRequestButton.friendRequestsDiv;
  promiseOfCurrentUser().then((userId) => {
    Rails.ajax({
      url: `/users/${userId}/friend_requests`,
      type: 'GET',
      dataType: 'json',
      beforeSend: function returnTrue() {
        return true;
      },
      success: function getResponse(response) {
        response.friendRequestsUsers.forEach((element) => {
          addRequest(element, friendRequestsContainer);
        });
        friendRequestsDiv.appendChild(friendRequestsContainer);
        friendRequestsDiv.appendChild(arrowForRequestsContainer);
      },
      error: function getResponse(response) {
        console.error(response);
      },
    });
  });
}

function addRequest(element, friendRequestsContainer) {
  const requestContainer = document.createElement('div');
  requestContainer.classList.add('user-main-page-request-container');

  const requestProfile = document.createElement('div');
  requestProfile.classList.add('user-main-page-request-profile');
  const requestUserImage = document.createElement('img');
  requestUserImage.src = `/assets/${element.img}`;
  requestUserImage.classList.add('user-main-page-request-image');
  const requestUserName = document.createElement('div');
  requestUserName.innerHTML = element.name;
  requestUserName.classList.add('user-main-page-request-name');
  requestProfile.appendChild(requestUserImage);
  requestProfile.appendChild(requestUserName);


  const requestButtons = document.createElement('div');
  requestButtons.classList.add('user-main-page-request-buttons');
  const confirmButton = document.createElement('button');
  confirmButton.textContent = 'Confirm';
  confirmButton.requestContainer = requestContainer;
  confirmButton.requestsContainer = friendRequestsContainer;
  confirmButton.requestId = element.requestId;
  confirmButton.addEventListener('click', confirmRequest);
  const deleteButton = document.createElement('button');
  deleteButton.textContent = 'Delete';
  deleteButton.requestContainer = requestContainer;
  deleteButton.requestsContainer = friendRequestsContainer;
  deleteButton.requestId = element.requestId;
  deleteButton.addEventListener('click', deleteRequest);
  requestButtons.appendChild(confirmButton);
  requestButtons.appendChild(deleteButton);

  requestContainer.appendChild(requestProfile);
  requestContainer.appendChild(requestButtons);
  friendRequestsContainer.appendChild(requestContainer);
}

function addConfimDeleteRequestActionToAllRequestsPage() {
  if (document.querySelector('.users-reusable-user-info .users-user-info-right-all-page') !== undefined) {
    const allRequestsPageUsersContainer = document.getElementsByClassName('users-reusable-container')[0];
    const allRequestsPageUsers = document.getElementsByClassName('users-reusable-user');
    Array.from(allRequestsPageUsers).forEach((element) => {
      const userConfirmDeleteButtons = element.querySelectorAll('.users-reusable-user-info .users-user-info-right-all-page .user-main-page-request-buttons button');
      const requestIdElement = element.querySelector('.users-reusable-user-info .users-user-info-right-all-page .user-main-page-request-buttons input');
      let requestId;
      if (requestIdElement !== null) {
        requestId = requestIdElement.value;
        userConfirmDeleteButtons[0].requestContainer = element;
        userConfirmDeleteButtons[1].requestContainer = element;
        userConfirmDeleteButtons[0].requestsContainer = allRequestsPageUsersContainer;
        userConfirmDeleteButtons[1].requestsContainer = allRequestsPageUsersContainer;
        userConfirmDeleteButtons[0].requestId = requestId;
        userConfirmDeleteButtons[1].requestId = requestId;
        userConfirmDeleteButtons[0].addEventListener('click', confirmRequest);
        userConfirmDeleteButtons[1].addEventListener('click', deleteRequest);
      }
    });
  }
}

function confirmRequest(element) {
  const buttonClicked = element.currentTarget;
  Rails.ajax({
    url: `/users/friend_requests/${buttonClicked.requestId}/accept`,
    type: 'PUT',
    beforeSend: function returnTrue() {
      return true;
    },
    success: function getResponse() {
      buttonClicked.requestsContainer.removeChild(buttonClicked.requestContainer);
    },
    error: function getError(response) {
      console.error(response);
    },
  });
}

function deleteRequest(element) {
  const buttonClicked = element.currentTarget;
  Rails.ajax({
    url: `/users/friend_requests/${buttonClicked.requestId}/delete`,
    type: 'DELETE',
    beforeSend: function returnTrue() {
      return true;
    },
    success: function getResponse() {
      buttonClicked.requestsContainer.removeChild(buttonClicked.requestContainer);
    },
    error: function getError(response) {
      console.error(response);
    },
  });
}

function addButtonsInFriendTab() {
  const friendOrNotButtons = document.querySelectorAll('.users-reusable-user-info-right button');
  const usersIds = document.querySelectorAll('.users-reusable-user-info-left input');
  Rails.ajax({
    url: '/users/profile/get_current_user_friends',
    type: 'GET',
    beforeSend: function returnTrue() {
      return true;
    },
    success: function getResponse(response) {
      friendOrNotButtons.forEach((element, index) => {
        if (response.friendsIds.includes(parseInt(usersIds[index].value, 10))) {
          element.classList.add('friend');
          const icon = document.createElement('i');
          icon.classList.add('fas');
          icon.classList.add('fa-check');
          element.appendChild(icon);
          element.innerHTML += 'Friends';
        } else if (response.pendingFriendsIds.includes(parseInt(usersIds[index].value, 10))) {
          element.classList.add('not-friend');
          element.innerHTML += 'Friend Request Sent';
        } else {
          element.classList.add('not-friend');
          const icon = document.createElement('i');
          icon.classList.add('fas');
          icon.classList.add('fa-user-plus');
          element.appendChild(icon);
          element.innerHTML += 'Add Friend';
        }
      });
      addUserToRequestsListOnClick();
    },
    error: function getError(response) {
      console.error(response);
    },
  });
}

function addUserToRequestsListOnClick() {
  const reusableUsers = document.getElementsByClassName('users-reusable-user');

  Array.from(reusableUsers).forEach((element) => {
    const addRequestToListButton = element.querySelector('.users-reusable-user-info .users-reusable-user-info-right .not-friend');
    if (addRequestToListButton != null) {
      const userToSendId = element.querySelector('.users-reusable-user-info .users-reusable-user-info-left input').value;
      addRequestToListButton.userToSendId = userToSendId;
      addRequestToListButton.addEventListener('click', addUserToRequestList);
    }
  });
}

function addUserToRequestList(element) {
  const addRequestToListButton = element.currentTarget;
  promiseOfCurrentUser().then((userId) => {
    Rails.ajax({
      url: `/users/${userId}/friend_requests`,
      type: 'POST',
      data: `[friendId]=${addRequestToListButton.userToSendId}`,
      beforeSend: function returnTrue() {
        return true;
      },
      success: function getResponse() {
        addRequestToListButton.textContent = 'Friend Request Sent';
      },
      error: function getError(response) {
        console.error(response);
      },
    });
  });
}
