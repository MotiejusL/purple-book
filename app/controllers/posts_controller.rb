class PostsController < ApplicationController
  def index
  end

  def show
  end

  def create
    @user = User.find(params[:id])
    @post = @user.posts.build(content: params[:post_text])
    if @post.save
      redirect_back(fallback_location: root_path)
    end
  end

  def update
  end

  def delete
    @user = User.find(params[:id])
    @post = Post.find(params[:post_id])
    @post.destroy
  end
end
