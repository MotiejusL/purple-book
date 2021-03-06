const createPostDiv = document.getElementsByClassName('main-page-create-post')[0];
if (createPostDiv != null) {
  createPostDiv.addEventListener('click', enlargeAndFocus);
}

function enlargeAndFocus() {
  createPostDiv.removeEventListener('click', enlargeAndFocus);

  createPostDiv.style.zIndex = '5';
  const createPostFormText = document.getElementsByClassName('main-page-create-post-form')[0].querySelectorAll('input')[2];
  createPostFormText.style.fontSize = '1.4rem';

  const createPostFocus = document.getElementsByClassName('main-page-create-post-focus')[0];
  createPostFocus.style.display = 'block';

  const createPostHeader = createPostDiv.getElementsByClassName('main-page-create-post-header')[0];
  const exitButton = document.createElement('button');
  const exitIcon = document.createElement('i');
  exitIcon.classList.add('fas');
  exitIcon.classList.add('fa-times');
  exitButton.classList.add('main-page-create-post-exit');
  exitButton.appendChild(exitIcon);
  createPostHeader.appendChild(exitButton);

  const submitButton = document.getElementsByClassName('main-page-create-post-submit')[0];
  submitButton.hoverBackground = 'rgb(75,0,130)';
  submitButton.normalBackground = 'rgb(147,112,219)';
  setInterval(() => {
    if (createPostFormText.value !== '') {
      if (submitButton.style.pointerEvents !== 'auto') {
        submitButton.style.pointerEvents = 'auto';
        submitButton.style.backgroundColor = 'rgb(147,112,219)';
        submitButton.addEventListener('mouseover', changeBackgroundColorHover);
        submitButton.addEventListener('mouseleave', changeBackgroundColorNormal);
      }
    } else {
      submitButton.style.pointerEvents = 'none';
      submitButton.style.backgroundColor = 'rgba(147,112,219,0.5)';
      submitButton.removeEventListener('mouseover', changeBackgroundColorHover);
      submitButton.removeEventListener('mouseleave', changeBackgroundColorNormal);
    }
  }, 500);

  createPostDiv.style.boxShadow = '0 0 0 2000px rgba(0,0,0,0.55)';

  exitButton.addEventListener('click', undoEnlargeAndFocus);
}

function changeBackgroundColorHover(element) {
  element.target.style.backgroundColor = element.target.hoverBackground;
}

function changeBackgroundColorNormal(element) {
  element.target.style.backgroundColor = element.target.normalBackground;
}

function undoEnlargeAndFocus(event) {
  event.stopPropagation();

  createPostDiv.style.zIndex = '3';

  const createPostFormText = document.getElementsByClassName('main-page-create-post-form')[0].querySelectorAll('input')[2];
  createPostFormText.style.fontSize = '0.875rem';
  createPostFormText.value = '';

  const createPostFocus = document.getElementsByClassName('main-page-create-post-focus')[0];
  createPostFocus.style.display = 'none';

  const createPostForm = createPostDiv.getElementsByClassName('main-page-create-post-form')[0];
  createPostDiv.style.borderBottomLeftRadius = '4px';
  createPostDiv.style.borderBottomRightRadius = '4px';
  createPostForm.style.borderBottomLeftRadius = '4px';
  createPostForm.style.borderBottomRightRadius = '4px';

  const createPostHeader = createPostDiv.getElementsByClassName('main-page-create-post-header')[0];
  const exitButton = document.getElementsByClassName('main-page-create-post-exit')[0];
  createPostHeader.removeChild(exitButton);

  createPostDiv.style.boxShadow = 'none';

  createPostDiv.addEventListener('click', enlargeAndFocus);
}

function requestCurrentUser() {
  return new Promise((resolve) => {
    Rails.ajax({
      url: '/current_user',
      type: 'GET',
      beforeSend: function returnTrue() {
        return true;
      },
      success: function getResponse(response) {
        resolve(response.id);
      },
      error: function getError(response) {
        console.error(response);
      },
    });
  });
}

async function promiseOfCurrentUser() {
  const id = await requestCurrentUser();
  return id;
}

export { promiseOfCurrentUser };
