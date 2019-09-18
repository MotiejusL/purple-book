class ProfilesController < ApplicationController
  def show
    @user = User.find(session[:current_user_id])
    @profileUser = User.find(params[:id])
    @posts = Post.where(:user_id => @profileUser).sort_by(&:created_at).reverse
    @friends = User.where(:id => @profileUser.friends).first(9)
    @photos = Photo.where(:user_id => @profileUser.id).first(9)
  end

  def friends
    @user = User.find(session[:current_user_id])
    @profileUser = User.find(params[:id])
    @friends = @profileUser.friends
  end

  def photos
    @user = User.find(session[:current_user_id])
    @profileUser = User.find(params[:id])
    @photos = Photo.where(:user_id => @profileUser.id)
  end

  def about
    @user = User.find(session[:current_user_id])
    @profileUser = User.find(params[:id])
  end

  def get_current_user_friends
    @user = User.find(session[:current_user_id])
    @currentUserFriendsIds = @user.friends.ids
    @pendingFriendsIds = @user.pending_friends.ids
    render json: {friendsIds: @currentUserFriendsIds, pendingFriendsIds: @pendingFriendsIds}
  end

  def get_profile_user_info
    @profileUser = User.find(params[:id])
    render json: {email: @profileUser.email, birthday: @profileUser.birthday, gender: @profileUser.gender, school: @profileUser.school}
  end
end
