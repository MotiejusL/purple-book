class FriendsController < ApplicationController
  def index
    @user = User.find(session[:current_user_id])
    @friends = @user.friends
  end
end
