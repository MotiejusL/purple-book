class CommentLikesController < ApplicationController
  def index
  end

  def show
  end

  def create
    @user = User.find(session[:current_user_id])
    @comment = Comment.find(params[:id])
    @like = @comment.comment_likes.build(user_id: @user.id)
    if @like.save
      render json: nil, status: :ok
    end
  end

  def update
  end

  def delete
    @user = User.find(session[:current_user_id])
    @comment = Comment.find(params[:id])
    @like = CommentLike.find_by(user_id: @user.id, comment_id: @comment.id)
    @like.destroy
    render json: nil, status: :ok
  end

  def check_likes
    comments = Comment.where(post_id: params[:postId])
    likedCommentsIds = []
    comments.each do |comment|
      comment.comment_likes.each do |like|
        if like.user.id == session[:current_user_id].to_i
          likedCommentsIds.push(comment.id)
        end
      end
    end
    render json: {likedCommentsIds: likedCommentsIds, commentsIds: comments.ids}
  end
end
