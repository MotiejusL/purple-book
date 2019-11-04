class StaticPagesController < ApplicationController
  def main
  end

  def logincheck
    user = User.find_by_email(params[:emaillogin])
    if user != nil && user.password == params[:passwordlogin]
      session[:current_user_id] = user.id
      redirect_to controller: 'users', action: 'show', id: user.id
    else
      redirect_to controller: 'static_pages', action: 'main'
    end
  end

  def logout
    session[:current_user_id] = nil
    redirect_to controller: 'static_pages', action: 'main'
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
