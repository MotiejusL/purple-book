class ProfilesController < ApplicationController
  def show
    @user = User.find(session[:current_user_id])
    @profileUser = User.find(params[:id])
    @posts = Post.where(:user_id => @profileUser).sort_by(&:created_at).reverse
    @friends = User.where(:id => @profileUser.friends).first(6)
  end

  def friends
    @user = User.find(session[:current_user_id])
    @profileUser = User.find(params[:id])
    @friends = @profileUser.friends
  end

  def photos
    @user = User.find(session[:current_user_id])
    @profileUser = User.find(params[:id])
  end

  def about
    @user = User.find(session[:current_user_id])
    @profileUser = User.find(params[:id])
  end
end
