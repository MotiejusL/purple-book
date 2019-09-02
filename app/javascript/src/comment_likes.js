import { promiseOfCurrentUser } from './users'

  const posts = document.getElementsByClassName("user-main-page-post");
  let currentUserId;

  function addListenersforComments(postId, post, postCommentsDiv) {
      promiseOfCurrentUser().then(function(userId) {
        currentUserId = userId;
          let postComments = post.getElementsByClassName("main-page-post-comment");
          if (postComments.length != 0) {
                Rails.ajax({
                  url: "/comments/" + postId + "/check_likes",
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
                    commentLikeButton.postId = postId;
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
          } else {
            postCommentsDiv.style.display = "block";
          }
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

  export { addListenersforComments, likeComment, unLikeComment }
