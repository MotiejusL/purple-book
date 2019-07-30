class PostsController < ApplicationController
  def index
  end

  def show
  end

  def create
    @user = User.find(params[:id])
    @post = @user.posts.build(content: params[:post_text])
    if @post.save
      redirect_to controller: 'users', action: 'show', id: @user.id
    end
  end

  def update
  end

  def delete
  end
end
