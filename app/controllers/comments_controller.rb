include ActionView::Helpers::DateHelper

class CommentsController < ApplicationController
  def index
    @post = Post.find(params[:id])
    comments = @post.comments
    comments_time_agos = []
    users = []
    comments.each do |comment|
      comments_time_agos.push(time_ago_in_words(comment.created_at) + " ago")
      user = User.find(comment.user_id)
      users.push(firstname: user.firstname, lastname: user.lastname, img_path: view_context.image_path(user.image), id: user.id);
    end
    render json: {comments: comments, comments_time_agos: comments_time_agos, users: users}
  end

  def show
  end

  def create
    @post = Post.find(params[:id])
    @user = User.find(session[:current_user_id])
    @comment = @post.comments.build(content: params[:content], user_id: @user.id)
    if @comment.save
      render json: nil, status: :ok
    end
  end

  def update
  end

  def delete
  end
end
