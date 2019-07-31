document.addEventListener("turbolinks:load", function() {
  const posts = document.getElementsByClassName("user-main-page-post");
  let currentUserId;

  Array.from(posts).forEach(function (element, index) {
    const postComments = element.getElementsByClassName("user-main-page-post-comment");
    const postId = element.querySelectorAll("input")[0].value;
    postComments.postId = postId;
    postComments.post = element;

    postCommentLike.addEventListener("click", likeComment);
  })

  function likeComment(element) {
    const postComments = element.currentTarget;
    Rails.ajax({
      url: window.location.href + '/current_user',
      type: 'GET',
      beforeSend: function () {
        return true;
      },
      success: function (response) {
        currentUserId = response.id;
        Rails.ajax({
          url: "/posts/" + postLikeButton.postId + "/comments",
          type: "GET",
          beforeSend: function () {
            return true;
          },
          success: function (res) {
            Array.from(postComments).forEach(function (element, index)) {
              targetCommentLikeButton = element.getElementsByClassName("main-page-post-comment-like");
              targetCommentLikeButton.addEventListener("click", )
            }
          },
          error: function (res) {

          }
        })
      },
      error: function (response) {

      }
    })
  }

  function unLikeItem(element) {
    const buttonIcon = element.currentTarget.querySelector("i");
    const buttonSpan = element.currentTarget.querySelector("span");
    buttonIcon.style.color = "#696969";
    buttonSpan.style.color = "#696969";
    const postLikeButton = element.currentTarget;
    const postLikesCount = postLikeButton.post.getElementsByClassName("user-main-page-post-likes")[0].querySelector("span");
    Rails.ajax({
      url: "/posts/" + postLikeButton.postId + "/likes",
      type: "DELETE",
      data: '[userId]=' + currentUserId + '',
      beforeSend: function () {
        return true;
      },
      success: function (res) {
        postLikesCount.innerHTML = parseInt(postLikesCount.innerHTML) - 1;
        postLikeButton.removeEventListener("click", unLikeItem);
        postLikeButton.addEventListener("click", likeItem);
      },
      error: function (res) {
      }
    })
  }
})
