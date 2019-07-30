document.addEventListener("turbolinks:load", function() {
  const posts = document.getElementsByClassName("user-main-page-post");

  Array.from(posts).forEach(function (element, index) {
    const postCreateCommentButton = element.getElementsByClassName("user-main-page-post-comment-button")[0];
    const postId = element.querySelectorAll("input")[0].value;
    postCreateCommentButton.post = element;
    postCreateCommentButton.postId = postId;
    postCreateCommentButton.addEventListener("click", showComments);
  })


  function showComments(element) {
    const postCommentsDiv = element.currentTarget.post.getElementsByClassName("user-main-page-post-comments")[0];
    postCommentsDiv.style.display = "block";
    const postCommentInput = postCommentsDiv.getElementsByClassName("user-main-page-post-create-comment-input-wrap")[0].querySelectorAll("input")[0];
    postCommentInput.postId = element.currentTarget.postId;

    postCommentInput.addEventListener("click", addComment);
  }

  function addComment(element) {
    Rails.ajax({
      url: window.location.href + '/current_user',
      type: 'GET',
      beforeSend: function () {
        return true;
      },
      success: function(response) {
        currentUserId = response.id;
        alert(currentUserId);
        alert(element.target.postId);
      },
      error: function(response) {
        alert(response);
      }
    })
  }
})
