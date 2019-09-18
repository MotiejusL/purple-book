import { promiseOfCurrentUser } from './users';

let currentUserId;
const posts = document.getElementsByClassName('user-main-page-post');

Array.from(posts).forEach((element) => {
  const postLikeButton = element.getElementsByClassName('user-main-page-post-like-button')[0];
  const postId = element.querySelectorAll('input')[0].value;
  postLikeButton.postId = postId;
  postLikeButton.post = element;

  promiseOfCurrentUser().then((userId) => {
    currentUserId = userId;
    Rails.ajax({
      url: `/posts/${postId}/checkIfLiked`,
      type: 'GET',
      data: `[userId]=${currentUserId}`,
      beforeSend: function returnTrue() {
        return true;
      },
      success: function getResponse(response) {
        if (response.liked === true) {
          const buttonIcon = postLikeButton.querySelector('i');
          const buttonSpan = postLikeButton.querySelector('span');
          buttonIcon.style.color = 'rgb(138,43,226)';
          buttonSpan.style.color = 'rgb(138,43,226)';
          postLikeButton.addEventListener('click', unLikeItem);
        } else {
          postLikeButton.addEventListener('click', likeItem);
        }
      },
      error: function getError(response) {
        console.error(response);
      },
    });
  });
});

function likeItem(element) {
  const buttonIcon = element.currentTarget.querySelector('i');
  const buttonSpan = element.currentTarget.querySelector('span');
  buttonIcon.style.color = 'rgb(138,43,226)';
  buttonSpan.style.color = 'rgb(138,43,226)';
  const postLikeButton = element.currentTarget;
  const postLikesCount = postLikeButton.post.getElementsByClassName('user-main-page-post-likes')[0].querySelector('span');
  Rails.ajax({
    url: `/posts/${postLikeButton.postId}/likes`,
    type: 'POST',
    data: `[userId]=${currentUserId}`,
    beforeSend: function returnTrue() {
      return true;
    },
    success: function getResponse() {
      postLikesCount.innerHTML = parseInt(postLikesCount.innerHTML, 10) + 1;
      postLikeButton.removeEventListener('click', likeItem);
      postLikeButton.addEventListener('click', unLikeItem);
    },
    error: function getError(res) {
      console.error(res);
    },
  });
}

function unLikeItem(element) {
  const buttonIcon = element.currentTarget.querySelector('i');
  const buttonSpan = element.currentTarget.querySelector('span');
  buttonIcon.style.color = '#696969';
  buttonSpan.style.color = '#696969';
  const postLikeButton = element.currentTarget;
  const postLikesCount = postLikeButton.post.getElementsByClassName('user-main-page-post-likes')[0].querySelector('span');
  Rails.ajax({
    url: `/posts/${postLikeButton.postId}/likes`,
    type: 'DELETE',
    data: `[userId]=${currentUserId}`,
    beforeSend: function returnTrue() {
      return true;
    },
    success: function getResponse() {
      postLikesCount.innerHTML = parseInt(postLikesCount.innerHTML, 10) - 1;
      postLikeButton.removeEventListener('click', unLikeItem);
      postLikeButton.addEventListener('click', likeItem);
    },
    error: function getError(res) {
      console.error(res);
    },
  });
}
