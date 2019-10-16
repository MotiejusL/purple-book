import { clearChildNodesExcept } from './posts';

changeTabletLayoutNewsfeed();
changeTabletHeaderLayout();
changeMobileLayoutNewsfeed();

function changeTabletLayoutNewsfeed() {
  const tabletDevice = window.matchMedia('(max-width: 768px)');

  if (tabletDevice.matches) {
    resizeMainPageColumnsTablet(tabletDevice);
  }

  tabletDevice.addListener(resizeMainPageColumnsTablet);
}

function changeMobileLayoutNewsfeed() {
  const mobileDevice = window.matchMedia('(max-width: 426px)');

  if (mobileDevice.matches) {
    resizeMainPageColumnsMobile(mobileDevice);
  }

  mobileDevice.addListener(resizeMainPageColumnsMobile);
}

function resizeMainPageColumnsMobile(element) {
  const middleBar = document.getElementsByClassName('user-main-page-middle-bar')[0];
  const tabletDevice = window.matchMedia('(max-width: 768px)');

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
  const tabletDevice = window.matchMedia('(max-width: 768px)');

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
