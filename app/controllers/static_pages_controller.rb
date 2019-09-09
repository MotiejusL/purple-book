class StaticPagesController < ApplicationController
  def main
    @user = User.find(session[:current_user_id])
  end

  def logincheck
    user = User.find_by_email(params[:email])
    if user.password == params[:password]
      session[:current_user_id] = user.id
      redirect_to controller: 'users', action: 'show', id: user.id
    end
  end

  def about
    @user = User.find(session[:current_user_id])
  end

  def privacy
    @user = User.find(session[:current_user_id])
  end

  def terms
    @user = User.find(session[:current_user_id])
  end
end
