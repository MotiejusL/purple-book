import { promiseOfCurrentUser } from './users';

let currentUserId;

function addListenersforComments(postId, post, postCommentsDiv) {
  promiseOfCurrentUser().then((userId) => {
    currentUserId = userId;
    const postComments = post.getElementsByClassName('main-page-post-comment');
    if (postComments.length !== 0) {
      Rails.ajax({
        url: `/comments/${postId}/check_likes`,
        type: 'GET',
        data: `[userId]=${currentUserId}`,
        beforeSend: function returnTrue() {
          return true;
        },
        success: function getResponse(res) {
          Array.from(postComments).forEach((ele, ind) => {
            const commentLikeButton = ele.getElementsByClassName('main-page-post-comment-like')[0];
            if (res.likedCommentsIds.includes(res.commentsIds[ind])) {
              commentLikeButton.style.fontWeight = 'bold';
              commentLikeButton.addEventListener('click', unLikeComment);
            } else {
              commentLikeButton.addEventListener('click', likeComment);
            }
            commentLikeButton.postId = postId;
            commentLikeButton.index = ind;
            if (ind === postComments.length - 1) {
              postCommentsDiv.style.display = 'block';
            }
          });
        },
        error: function getError(res) {
          console.error(res);
        },
      });
    } else {
      postCommentsDiv.style.display = 'block';
    }
  });
}

function likeComment(element) {
  const commentToLikeIndex = element.currentTarget.index;
  const currentElement = element.currentTarget;
  Rails.ajax({
    url: `/posts/${currentElement.postId}/comments`,
    type: 'GET',
    data: `[userId]=${currentUserId}`,
    beforeSend: function returnTrue() {
      return true;
    },
    success: function getResponse(response) {
      Rails.ajax({
        url: `/comments/${response.comments[commentToLikeIndex].id}/likes`,
        type: 'POST',
        data: `[userId]=${currentUserId}`,
        beforeSend: function returnTrue() {
          return true;
        },
        success: function getResponseNext() {
          currentElement.style.fontWeight = 'bold';
          currentElement.removeEventListener('click', likeComment);
          currentElement.addEventListener('click', unLikeComment);
        },
        error: function getError(res) {
          console.error(res);
        },
      });
    },
    error: function getErrorNext(response) {
      console.error(response);
    },
  });
}

function unLikeComment(element) {
  const commentToLikeIndex = element.currentTarget.index;
  const currentElement = element.currentTarget;
  Rails.ajax({
    url: `/posts/${currentElement.postId}/comments`,
    type: 'GET',
    data: `[userId]=${currentUserId}`,
    beforeSend: function returnTrue() {
      return true;
    },
    success: function getResponse(response) {
      Rails.ajax({
        url: `/comments/${response.comments[commentToLikeIndex].id}/likes`,
        type: 'DELETE',
        data: `[userId]=${currentUserId}`,
        beforeSend: function returnTrue() {
          return true;
        },
        success: function getResponseNext() {
          currentElement.style.fontWeight = 'normal';
          currentElement.removeEventListener('click', unLikeComment);
          currentElement.addEventListener('click', likeComment);
        },
        error: function getError(res) {
          console.error(res);
        },
      });
    },
    error: function getErrorNext(response) {
      console.error(response);
    },
  });
}

export { addListenersforComments, likeComment, unLikeComment };
