
countFriendsInProfile();

function countFriendsInProfile() {
  let friendsCount = document.getElementsByClassName("user-profile-page-friends-count")[0];
    Rails.ajax({
      url: "/users/profile/get_friends_count",
      type: "GET",
      beforeSend: function() {
        return true;
      },
      success: function(response) {
        friendsCount.textContent = response.friendsCount;
      },
      error: function(response) {
        alert(response);
      }
    })
}
