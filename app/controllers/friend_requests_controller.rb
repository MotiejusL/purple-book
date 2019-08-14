class FriendRequestsController < ApplicationController
  def index
    friendRequests = FriendRequest.where(friend_id: params[:id])
    friendRequestsUsers = []
    friendRequests.each do |request|
      friendRequestsUsers.push(requestId: request.id, img: request.user.image, name: request.user.firstname + " " + request.user.lastname)
    end
    render json: {friendRequestsUsers: friendRequestsUsers}
  end

  def accept_request
    friendRequest = FriendRequest.find(params[:id])
    friendRequest.accept
    render json: nil, status: :ok
  end

  def delete
    friendRequest = FriendRequest.find(params[:id])
    friendRequest.destroy
    render json: nil, status: :ok
  end
end
