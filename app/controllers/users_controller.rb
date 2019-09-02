class UsersController < ApplicationController
  def index
  end

  def show
    @user = User.find(session[:current_user_id])
    @posts = Post.where(user_id: @user.friends).or(Post.where(user_id: @user.id)).sort_by(&:created_at).reverse
  end

  def create
    @user = User.new(firstname: params[:firstname], lastname: params[:lastname], email: params[:email],birthday: Date.parse("" + params[:month] + " " + params[:day] + " " + params[:year]) , gender: params[:gender], password: params[:password])
    @user.image = "default-profile.png"
    @user.coverphoto = "default-cover-img.png"
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
    @user = User.find(session[:current_user_id])
    render json: {id: @user.id}
  end

  def get_user_info
    @user = User.find(session[:current_user_id])
    render json: {firstname: @user.firstname, lastname: @user.lastname, image: @user.image}
  end

  def get_friends_count
    @user = User.find(session[:current_user_id])
    friendsCount = @user.friends.count
    render json: {friendsCount: friendsCount}
  end

end
