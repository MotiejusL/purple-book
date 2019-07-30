class UsersController < ApplicationController
  def index
  end

  def show
    @user = User.find(params[:id])
    @posts = @user.posts
  end

  def create
    @user = User.new(firstname: params[:firstname], lastname: params[:lastname], email: params[:email],birthday: Date.parse("" + params[:month] + " " + params[:day] + " " + params[:year]) , gender: params[:gender], password: params[:password])
    if @user.save
      redirect_to controller: 'users', action: 'show', id: @user.id
    else
    end
  end

  def update
  end

  def delete
  end

  def current_user
    @user = User.find(params[:id])
    render json: {id: @user.id}
  end

end
