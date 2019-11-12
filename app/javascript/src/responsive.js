import { clearChildNodesExcept, clearChildNodesExceptFromLast } from './posts';
import { promiseOfCurrentUser } from './users';

changeTabletLayoutNewsfeed();
changeTabletHeaderLayout();
changeMobileLayout();
expandMobileHeaderOnClick();

window.addEventListener('resize', clearMobileHeaderToNormal);

function clearMobileHeaderToNormal() {
  const mobileDevice = window.matchMedia('(max-width: 500px)');
  const header = document.getElementsByClassName('user-main-page-header')[0];
  const headerMenuList = document.querySelector('.user-main-page-header-menu ul');
  const searchBar = document.getElementsByClassName('user-main-page-header-search')[0];
  if (headerMenuList.children.length > 10) {
    if (!mobileDevice.matches) {
      clearChildNodesExceptFromLast(10, headerMenuList);
    }
  }
  if (!mobileDevice.matches) {
    header.removeEventListener('click', expandMobileHeader);
    searchBar.style.display = 'flex';
  } else {
    searchBar.style.display = 'none';
    header.addEventListener('click', expandMobileHeader);
  }
}

function changeTabletLayoutNewsfeed() {
  const tabletDevice = window.matchMedia('(max-width: 768px)');

  if (tabletDevice.matches) {
    resizeMainPageColumnsTablet(tabletDevice);
  }

  tabletDevice.addListener(resizeMainPageColumnsTablet);
}

function changeMobileLayout() {
  const mobileDevice = window.matchMedia('(max-width: 500px)');

  if (mobileDevice.matches) {
    resizeMainPageColumnsMobile(mobileDevice);
    addLinksToHeaderMobile();
  }

  mobileDevice.addListener(resizeMainPageColumnsMobile);
  mobileDevice.addListener(addLinksToHeaderMobile);
}

function expandMobileHeaderOnClick() {
  const mobileDevice = window.matchMedia('(max-width: 500px)');
  if (mobileDevice.matches) {
    const header = document.getElementsByClassName('user-main-page-header')[0];
    const searchBar = document.getElementsByClassName('user-main-page-header-search')[0];
    if (searchBar !== undefined || header !== undefined) {
      searchBar.style.display = 'none';
      header.addEventListener('click', expandMobileHeader);
    }
  }
}

function expandMobileHeader() {
  const headerMenu = document.getElementsByClassName('user-main-page-header-menu')[0];
  const header = document.getElementsByClassName('user-main-page-header')[0];
  const expandIcon = document.getElementsByClassName('expand-icon')[0];
  console.log(expandIcon);
  expandIcon.classList.replace('fa-caret-down', 'fa-caret-up');
  headerMenu.style.height = '100%';
  headerMenu.style.overflow = 'visibile';

  const searchBar = document.getElementsByClassName('user-main-page-header-search')[0];
  searchBar.style.display = 'flex';
  header.removeEventListener('click', expandMobileHeader);
  header.addEventListener('click', minimizeMobileHeader);
}

function minimizeMobileHeader() {
  const headerMenu = document.getElementsByClassName('user-main-page-header-menu')[0];
  const header = document.getElementsByClassName('user-main-page-header')[0];
  const expandIcon = document.getElementsByClassName('expand-icon')[0];
  expandIcon.classList.replace('fa-caret-up', 'fa-caret-down');
  headerMenu.style.height = '30px';
  headerMenu.style.overflow = 'hidden';

  const searchBar = document.getElementsByClassName('user-main-page-header-search')[0];
  searchBar.style.display = 'none';
  header.removeEventListener('click', minimizeMobileHeader);
  header.addEventListener('click', expandMobileHeader);
}

function addLinksToHeaderMobile() {
  const mobileDevice = window.matchMedia('(max-width: 500px)');
  if (mobileDevice.matches) {
    promiseOfCurrentUser().then((userId) => {
      const headerMenuList = document.querySelector('.user-main-page-header-menu ul');
      if (headerMenuList !== null) {
        const logoutLink = document.createElement('li');
        logoutLink.innerHTML = '<div class="background"><span><a href="/logout">Log out</a></span></div>';
        const friendRequestLink = document.createElement('li');
        friendRequestLink.innerHTML = `<div class="background">
        <span><a href="/users/${userId}/friend_requests">Friend requests</a></span>
        </div>`;
        const aboutLink = document.createElement('li');
        aboutLink.innerHTML = `<div class="background">
        <span><a href="/users/${userId}/about">About</a></span>
        </div>`;
        const expandIcon = document.createElement('i');
        expandIcon.classList.add('fas');
        expandIcon.classList.add('fa-caret-down');
        expandIcon.classList.add('expand-icon');
        expandIcon.style.cssText = 'position: fixed; top: 10px; left: 120px';
        headerMenuList.appendChild(friendRequestLink);
        headerMenuList.appendChild(aboutLink);
        headerMenuList.appendChild(logoutLink);
        headerMenuList.appendChild(expandIcon);
      }
    });
  }
}

function resizeMainPageColumnsMobile(element) {
  const middleBar = document.getElementsByClassName('user-main-page-middle-bar')[0];
  const tabletDevice = window.matchMedia('(max-width: 950px)');

  if (element.matches && middleBar !== undefined) {
    middleBar.classList.replace('column-9', 'column-12');
  } else if (tabletDevice.matches && middleBar !== undefined) {
    middleBar.classList.replace('column-12', 'column-9');
  } else if (middleBar !== undefined) {
    middleBar.classList.replace('column-12', 'column-6');
  }
}

function resizeMainPageColumnsTablet(element) {
  if (document.getElementsByClassName('user-main-page-right-side-bar')[0] !== undefined) {
    const middleBar = document.getElementsByClassName('user-main-page-middle-bar')[0];
    const rightBar = document.getElementsByClassName('user-main-page-right-side-bar')[0];
    const sideBar = document.getElementsByClassName('user-main-page-left-side-bar')[0];

    if (element.matches) {
      sideBar.classList.replace('column-2', 'column-3');
      middleBar.classList.replace('column-6', 'column-9');
      rightBar.classList.remove('column-4');
    } else {
      sideBar.classList.replace('column-3', 'column-2');
      middleBar.classList.replace('column-9', 'column-6');
      rightBar.classList.add('column-4');
    }
  }
}

function changeTabletHeaderLayout() {
  const tabletDevice = window.matchMedia('(max-width: 950px)');

  if (tabletDevice.matches) {
    switchHeaderDivs(tabletDevice);
  }

  tabletDevice.addListener(switchHeaderDivs);
}

function switchHeaderDivs(element) {
  if (document.getElementsByClassName('user-main-page-header-menu')[0] !== undefined) {
    const headerContainer = document.querySelector('.user-main-page-header-container .wrap-for-flex .row');
    const search = headerContainer.getElementsByClassName('user-main-page-header-search')[0];
    const menu = headerContainer.getElementsByClassName('user-main-page-header-menu')[0];

    if (element.matches) {
      hideChildElements(headerContainer);
      clearChildNodesExcept(0, headerContainer);
      headerContainer.appendChild(menu);
      headerContainer.appendChild(search);
      displayChildElements(headerContainer);
    } else {
      hideChildElements(headerContainer);
      clearChildNodesExcept(0, headerContainer);
      headerContainer.appendChild(search);
      headerContainer.appendChild(menu);
      displayChildElements(headerContainer);
    }
  }
}

function hideChildElements(parent) {
  Array.from(parent.children).forEach((element) => {
    element.style.display = 'none';
  });
}

function displayChildElements(parent) {
  Array.from(parent.children).forEach((element) => {
    element.style.display = 'flex';
  });
}
