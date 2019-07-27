class StaticPagesController < ApplicationController
  def main
  end

  def logincheck
    user = User.find_by_email(params[:email])
    if user.password == params[:password]
      redirect_to controller: 'users', action: 'show', id: user.id
    end
  end
end
