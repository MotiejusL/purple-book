import { promiseOfCurrentUser } from './users'

  const posts = document.getElementsByClassName("user-main-page-post");
  let currentUserId;

  Array.from(posts).forEach(function (element, index) {
    const postCommentButton = element.getElementsByClassName("user-main-page-post-comment-button")[0];
    const postCommentsCount = element.getElementsByClassName("user-main-page-post-comments-count")[0];
    const postId = element.querySelectorAll("input")[0].value;
    const postCommentsDiv = element.getElementsByClassName("user-main-page-post-comments")[0];
    postCommentButton.post = element;
    postCommentsCount.post = element;
    postCommentButton.postId = postId;
    postCommentsCount.postId = postId;
    postCommentButton.addEventListener("click", addListenersforComments);
    postCommentsCount.addEventListener("click", addListenersforComments);
  })

  function addListenersforComments(element) {
      const postCommentsDiv = element.currentTarget.post.getElementsByClassName("user-main-page-post-comments")[0];
      let buttonClicked = element.currentTarget;
      promiseOfCurrentUser().then(function(userId) {
        currentUserId = userId;
        setTimeout(function() {
          let postComments = buttonClicked.post.getElementsByClassName("main-page-post-comment");
          if (postComments.length != 0) {
                Rails.ajax({
                  url: "/comments/" + buttonClicked.postId + "/check_likes",
                  type: "GET",
                  data: "[userId]=" + currentUserId,
                  beforeSend: function() {
                    return true;
                  },
                  success: function(res) {
                    Array.from(postComments).forEach(function (ele, ind) {
                    const commentLikeButton = ele.getElementsByClassName("main-page-post-comment-like")[0];
                    if (res.likedCommentsIds.includes(res.commentsIds[ind])) {
                      commentLikeButton.style.fontWeight = "bold";
                      commentLikeButton.addEventListener("click", unLikeComment);
                    } else {
                      commentLikeButton.addEventListener("click", likeComment);
                    }
                    commentLikeButton.postId = buttonClicked.postId;
                    commentLikeButton.index = ind;
                    if (ind == postComments.length - 1) {
                      postCommentsDiv.style.display = "block";
                    }
                  })
                  },
                  error: function(res) {
                    alert(res);
                  }
                })
          }
        }, 100)
      })
  }

  function likeComment(element) {
    const commentToLikeIndex = element.currentTarget.index;
    const currentElement = element.currentTarget;
    Rails.ajax({
      url: "/posts/" + currentElement.postId + "/comments",
      type: "GET",
      data: "[userId]=" + currentUserId + "",
      beforeSend: function() {
        return true;
      },
      success: function (response) {
        Rails.ajax({
          url: "/comments/" + response.comments[commentToLikeIndex].id + "/likes",
          type: "POST",
          data: "[userId]=" + currentUserId + "",
          beforeSend: function() {
            return true;
          },
          success: function (res) {
            currentElement.style.fontWeight = "bold";
            currentElement.removeEventListener("click", likeComment);
            currentElement.addEventListener("click", unLikeComment);
          },
          error: function (res) {
            alert(res);
          }
        })
      },
      error: function (response) {
        alert(response);
      }
    })
  }

  function unLikeComment(element) {
    const commentToLikeIndex = element.currentTarget.index;
    const currentElement = element.currentTarget;
    Rails.ajax({
      url: "/posts/" + currentElement.postId + "/comments",
      type: "GET",
      data: "[userId]=" + currentUserId + "",
      beforeSend: function() {
        return true;
      },
      success: function (response) {
        Rails.ajax({
          url: "/comments/" + response.comments[commentToLikeIndex].id + "/likes",
          type: "DELETE",
          data: "[userId]=" + currentUserId + "",
          beforeSend: function() {
            return true;
          },
          success: function (res) {
            currentElement.style.fontWeight = "normal";
            currentElement.removeEventListener("click", unLikeComment);
            currentElement.addEventListener("click", likeComment);
          },
          error: function (res) {
            alert(res);
          }
        })
      },
      error: function (response) {
        alert(response);
      }
    })
  }
