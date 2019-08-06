class PostLikesController < ApplicationController
  def index
  end

  def show
  end

  def create
    @user = User.find(params[:userId])
    @post = Post.find(params[:id])
    @like = @post.post_likes.build(user_id: @user.id)
    if @like.save
      render json: nil, status: :ok
    end
  end

  def update
  end

  def delete
    @user = User.find(params[:userId])
    @post = Post.find(params[:id])
    @like = PostLike.find_by(user_id: @user.id, post_id: @post.id)
    @like.destroy
    render json: nil, status: :ok
  end

  def check_if_liked_by_user
    @postLike = PostLike.find_by(post_id: params[:id], user_id: params[:userId])
    if @postLike != nil
      render json: {liked: true}
    else
      render json: {liked: false}
    end
  end
end
