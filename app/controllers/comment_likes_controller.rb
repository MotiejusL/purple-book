class CommentLikesController < ApplicationController
  def index
  end

  def show
  end

  def create
    @user = User.find(params[:userId])
    @comment = Comment.find(params[:id])
    @like = @comment.comment_likes.build(user_id: @user.id)
    if @like.save
      render json: nil, status: :ok
    end
  end

  def update
  end

  def delete
    @user = User.find(params[:userId])
    @comment = Comment.find(params[:id])
    @like = CommentLike.find_by(user_id: @user.id, comment_id: @comment.id)
    @like.destroy
    render json: nil, status: :ok
  end

  def check_if_liked_by_user
    @commentLike = CommentLike.find_by(comment_id: params[:id], user_id: params[:userId])
    if @commentLike != nil
      render json: {liked: true}
    else
      render json: {liked: false}
    end
  end
end
