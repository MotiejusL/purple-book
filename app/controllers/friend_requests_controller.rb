class FriendRequestsController < ApplicationController
  def index
    friendRequests = FriendRequest.where(friend_id: params[:id])
    friendRequestsUsers = []
    friendRequests.each do |request|
      friendRequestsUsers.push(userId: request.user.id, img: request.user.image, name: request.user.firstname + " " + request.user.lastname)
    end
    render json: {friendRequestsUsers: friendRequestsUsers}
  end
end
