class FriendRequestsController < ApplicationController
  def index
    @user = User.find(session[:current_user_id])
    @friendRequests = User.where(:id => FriendRequest.where(friend_id: @user.id))
    friendRequests = FriendRequest.where(friend_id: params[:id])
    @friendRequestsUsers = []
    friendRequests.each do |request|
      @friendRequestsUsers.push(requestId: request.id, img_path: view_context.image_path(request.user.image), name: request.user.firstname + " " + request.user.lastname, userId: request.user.id)
    end

    respond_to do |format|
      format.html
      format.json { render json: {friendRequestsUsers: @friendRequestsUsers} }
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

  def create
    user = User.find(session[:current_user_id]);
    friendToSendRequest = User.find(params[:friendId]);
    friendRequest = FriendRequest.new(user_id: user.id, friend_id: friendToSendRequest.id)
    if friendRequest.save
      render json: nil, status: :ok
    end
  end
end
