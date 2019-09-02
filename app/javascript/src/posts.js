import { promiseOfCurrentUser } from './users'
import { addListenersforComments, likeComment, unLikeComment } from './comment_likes'

  const posts = document.getElementsByClassName("user-main-page-post");
  let currentUserId;

  Array.from(posts).forEach(function (element, index) {
    const postCreateCommentButton = element.getElementsByClassName("user-main-page-post-comment-button")[0];
    const postCommentsCount = element.getElementsByClassName("user-main-page-post-comments-count")[0];
    const postId = element.querySelectorAll("input")[0].value;
    postCreateCommentButton.post = element;
    postCreateCommentButton.postId = postId;
    postCreateCommentButton.undo = false;
    postCommentsCount.post = element;
    postCommentsCount.postId = postId;
    postCommentsCount.undo = true;
    postCreateCommentButton.addEventListener("click", showComments);
    postCommentsCount.addEventListener("click", showComments);
  })


  function showComments(element) {
    const postCommentsDiv = element.currentTarget.post.getElementsByClassName("user-main-page-post-comments")[0];
    getAllComments(element.currentTarget.postId, element.currentTarget.post, postCommentsDiv);

    const postCommentInput = postCommentsDiv.getElementsByClassName("user-main-page-post-create-comment-input-wrap")[0].querySelectorAll("input")[0];
    postCommentInput.postId = element.currentTarget.postId;
    postCommentInput.commentsDiv = postCommentsDiv;
    postCommentInput.post = element.currentTarget.post;

    postCommentInput.addEventListener("keyup", addCommentIfEnter);

    if (element.currentTarget.undo == false) {
      element.currentTarget.removeEventListener("click", showComments);
      const postCommentsCount = element.currentTarget.post.getElementsByClassName("user-main-page-post-comments-count")[0];
      postCommentsCount.removeEventListener("click", showComments);
      postCommentsCount.addEventListener("click", removeComments);
    } else {
      element.currentTarget.removeEventListener("click", showComments);
      element.currentTarget.addEventListener("click", removeComments);
      const postCreateCommentButton = element.currentTarget.post.getElementsByClassName("user-main-page-post-comment-button")[0];
      postCreateCommentButton.removeEventListener("click", showComments);
    }
  }

  function addCommentIfEnter(event) {
    if (event.key === "Enter") {
      addComment(event, event.currentTarget.commentsDiv);
    }
  }

  function removeComments(element) {
    const postCommentsDiv = element.currentTarget.post.getElementsByClassName("user-main-page-post-comments")[0];
    clearChildNodesExcept(1, postCommentsDiv);
    postCommentsDiv.style.display = "none";

    element.currentTarget.addEventListener("click", showComments);

    const postCreateCommentButton = element.currentTarget.post.getElementsByClassName("user-main-page-post-comment-button")[0];
    postCreateCommentButton.addEventListener("click", showComments);

    const postCommentInput = postCommentsDiv.getElementsByClassName("user-main-page-post-create-comment-input-wrap")[0].querySelectorAll("input")[0];
    postCommentInput.removeEventListener("keyup", addCommentIfEnter);
  }

  function addComment(element, postCommentsDiv) {
    let targetInput = element.currentTarget;
    promiseOfCurrentUser().then(function(userId) {
      currentUserId = userId;
      Rails.ajax({
        url: "/posts/" + targetInput.postId + "/comments",
        type: "POST",
        data: '[userId]=' + currentUserId + '&[content]=' + element.target.value + '',
        beforeSend: function () {
          return true;
        },
        success: function (response) {
          getAllComments(targetInput.postId, targetInput.post, postCommentsDiv);
          const postCommentsCount = element.target.post.getElementsByClassName("user-main-page-post-comments-count")[0].querySelectorAll("span")[0];
          postCommentsCount.innerHTML = parseInt(postCommentsCount.innerHTML) + 1;
          element.target.value = "";
        },
        error: function (response) {
        }
      })
    })
  }

  function getAllComments(postId, post, postCommentsDiv) {
    Rails.ajax({
      url: "/posts/" + postId + "/comments",
      type: "GET",
      beforeSend: function() {
        return true;
      },
      success: function (response) {
        clearChildNodesExcept(1, postCommentsDiv);
        let allComments = document.createElement("div");
        response.comments.forEach( function(element, index) {
          const comment = createComment(element.content, response.users[index], response.comments_time_agos[index]);
          allComments.appendChild(comment);
        })
        postCommentsDiv.insertBefore(allComments, postCommentsDiv.lastElementChild);
        addListenersforComments(postId, post, postCommentsDiv);
      },
      error: function (response) {
      }
    })
  }

  function clearChildNodesExcept(exceptNumber, element) {
    while (element.childElementCount > exceptNumber) {
      element.removeChild(element.firstElementChild);
    }
  }

  function createComment(content, user, time_ago) {
    const comment = document.createElement("div");
    const commentText = document.createElement("div");
    const commentFooter = document.createElement("div");
    const likeButton = document.createElement("button");
    const replyButton = document.createElement("button");
    const createAgo = document.createElement("span");
    const userLink = document.createElement("a");
    const commentContent = document.createElement("span");
    const commentImage = document.createElement("img");
    userLink.innerHTML = user.firstname + " " + user.lastname;
    commentContent.innerHTML = content;
    likeButton.innerHTML = "Like";
    replyButton.innerHTML = "Reply";
    createAgo.innerHTML = time_ago;
    commentImage.src = "/assets/" + user.image + "";
    commentText.appendChild(userLink);
    commentText.appendChild(commentContent);
    commentFooter.appendChild(likeButton);
    commentFooter.appendChild(replyButton);
    commentFooter.appendChild(createAgo);
    comment.appendChild(commentImage);
    comment.appendChild(commentText);
    comment.appendChild(commentFooter);
    comment.classList.add("main-page-post-comment");
    commentText.classList.add("main-page-post-comment-text");
    userLink.classList.add("main-page-post-comment-user-link");
    commentContent.classList.add("main-page-post-comment-content");
    commentImage.classList.add("main-page-post-comment-image");
    commentFooter.classList.add("main-page-post-comment-footer");
    likeButton.classList.add("main-page-post-comment-like");
    replyButton.classList.add("main-page-post-comment-reply");
    createAgo.classList.add("main-page-post-comment-create-ago");
    return comment;
  }
