class FriendRequestsController < ApplicationController
  def index
    @user = User.find(session[:current_user_id])
    @friendRequests = User.where(:id => FriendRequest.where(friend_id: @user.id))
    friendRequests = FriendRequest.where(friend_id: params[:id])
    friendRequestsUsers = []
    friendRequests.each do |request|
      friendRequestsUsers.push(requestId: request.id, img: request.user.image, name: request.user.firstname + " " + request.user.lastname)
    end

    respond_to do |format|
      format.html
      format.json { render json: {friendRequestsUsers: friendRequestsUsers} }
    end
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
