import { clearChildNodesExcept } from './posts';

countFriendsInProfile();
enlargePhotosInPhotosTab();
switchInfoInAboutTab();
setStyleToClickedOnTabs();

function countFriendsInProfile() {
  if (document.getElementsByClassName('user-profile-page-friends-count')[0] !== undefined) {
    const friendsCount = document.getElementsByClassName('user-profile-page-friends-count')[0];
    Rails.ajax({
      url: '/users/profile/get_friends_count',
      type: 'GET',
      beforeSend: function returnTrue() {
        return true;
      },
      success: function getResponse(response) {
        friendsCount.textContent = response.friendsCount;
      },
      error: function getError(response) {
        console.error(response);
      },
    });
  }
}

function enlargePhotosInPhotosTab() {
  const images = document.querySelectorAll('.user-profile-page-photos-tab-photo .image-holder img');
  const profileImages = document.querySelectorAll('.user-profile-page-photos-photo img');
  const imageShadows = document.querySelectorAll('.user-profile-page-photos-tab-photo .image-holder .image-hover-shadow');

  images.forEach((element, index) => {
    imageShadows[index].selectedImage = element;
    imageShadows[index].profile = false;
    imageShadows[index].addEventListener('click', enlargePhoto);
  });

  profileImages.forEach((element) => {
    element.profile = true;
    element.addEventListener('click', enlargePhoto);
  });
}

function enlargePhoto(element) {
  let sentImage;
  if (element.currentTarget.profile) {
    sentImage = element.currentTarget;
  } else {
    sentImage = element.currentTarget.selectedImage;
  }
  const modal = document.getElementsByClassName('modal')[0];
  const modalContentImage = document.getElementsByClassName('modal-content')[0];
  const modalExit = document.getElementsByClassName('modal-exit')[0];
  modal.style.display = 'flex';
  modalContentImage.src = sentImage.src;

  modalExit.modal = modal;
  modalExit.addEventListener('click', exitEnlargedPhoto);
}

function exitEnlargedPhoto(element) {
  const exitButton = element.currentTarget;
  exitButton.modal.style.display = 'none';
  exitButton.removeEventListener('click', exitEnlargedPhoto);
}

function switchInfoInAboutTab() {
  if (document.getElementById('profile-user-id') !== null && document.querySelector('.user-profile-page-about-tab-select li') !== null) {
    const aboutTabSelects = document.querySelectorAll('.user-profile-page-about-tab-select li');
    const aboutTabShow = document.getElementsByClassName('user-profile-page-about-tab-selects-show')[0];
    const profileUserId = document.getElementById('profile-user-id').value;
    Rails.ajax({
      url: `/users/${profileUserId}/profile/about/get_profile_user_info`,
      type: 'GET',
      beforeSend: function returnTrue() {
        return true;
      },
      success: function getResponse(response) {
        const birthday = new Date(response.birthday);
        const birthdayMonthAndDay = birthday.toLocaleDateString('en-US', { month: 'long', day: 'numeric' });
        const birthdayYear = birthday.toLocaleDateString('en-US', { year: 'numeric' });

        aboutTabSelects[0].classList.add('user-profile-page-about-tab-select-clicked');
        createInfoBox('CONTACT INFORMATION', ['Email'], [response.email], aboutTabShow);
        createInfoBox('BASIC INFORMATION', ['Birth Date', 'Birth Year', 'Gender'], [birthdayMonthAndDay, birthdayYear, response.gender], aboutTabShow);
        aboutTabSelects.forEach((element) => {
          element.showContainer = aboutTabShow;
          element.allProfileInfo = response;
          element.birthdayMonthAndDay = birthdayMonthAndDay;
          element.birthdayYear = birthdayYear;
          element.allSelects = aboutTabSelects;

          element.addEventListener('click', infoShow);
        });
      },
      error: function getError(response) {
        console.error(response);
      },
    });
  }
}

function addClassClickedFromSelectsInAboutTab(element, allSelects) {
  element.classList.add('user-profile-page-about-tab-select-clicked');
  allSelects.forEach((select) => {
    if (select !== element) {
      select.classList.remove('user-profile-page-about-tab-select-clicked');
    }
  });
}

function infoShow(element) {
  const elementClicked = element.currentTarget;
  clearChildNodesExcept(0, elementClicked.showContainer);
  addClassClickedFromSelectsInAboutTab(elementClicked, elementClicked.allSelects);

  if (elementClicked.id === 'basic-info') {
    createInfoBox('CONTACT INFORMATION', ['Email'], [elementClicked.allProfileInfo.email], elementClicked.showContainer);
    createInfoBox('BASIC INFORMATION', ['Birth Date', 'Birth Year', 'Gender'], [elementClicked.birthdayMonthAndDay, elementClicked.birthdayYear, elementClicked.allProfileInfo.gender], elementClicked.showContainer);
  } else if (elementClicked.id === 'education') {
    createInfoBox('SCHOOL', ['Went to'], [elementClicked.allProfileInfo.school], elementClicked.showContainer);
  }
}

function createInfoBox(headerString, informationHeaders, informationToShow, containerToStore) {
  const informationContainer = document.createElement('div');
  informationContainer.classList.add('user-profile-about-tab-information-container');
  const informationHeader = document.createElement('h3');
  informationHeader.textContent = headerString;
  informationContainer.appendChild(informationHeader);
  informationToShow.forEach((element, index) => {
    const informationInfoHeader = document.createElement('span');
    informationInfoHeader.textContent = informationHeaders[index];
    const informationInfo = document.createElement('p');
    informationInfo.textContent = element;
    informationContainer.appendChild(informationInfoHeader);
    informationContainer.appendChild(informationInfo);
  });
  containerToStore.appendChild(informationContainer);
}

function setStyleToClickedOnTabs() {
  const currentPage = document.querySelectorAll('.user-profile-page-content .hidden-tab-fields input');
  currentPage.forEach((element) => {
    const tab = document.getElementById(String(element.id).slice(6));
    tab.style.color = 'rgb(75,79,86)';
    createTriangleArrowUpAndAddToTab(tab);
  });
}

function createTriangleArrowUpAndAddToTab(parentContainer) {
  const innerTriangle = document.createElement('div');
  innerTriangle.style.cssText = 'width: 0; height: 0; border-bottom: 8px solid rgb(230,233,236); border-right: 7.5px solid transparent; border-left: 7.5px solid transparent;';
  const outerTriangle = document.createElement('div');
  outerTriangle.style.cssText = 'width: 0; height: 0; border-bottom: 9.5px solid rgb(211,214,219); border-right: 9px solid transparent; border-left: 9px solid transparent;';
  [innerTriangle, outerTriangle].forEach((element) => {
    element.style.position = 'absolute';
    element.style.bottom = '0';
    element.style.left = '50%';
    element.style.marginLeft = `-${element.style.borderBottomWidth}`;
  });
  outerTriangle.appendChild(innerTriangle);
  parentContainer.appendChild(outerTriangle);
  parentContainer.appendChild(innerTriangle);
}
