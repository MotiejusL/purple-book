class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception

  before_action :verify_if_logged_in, except: [:logincheck, :main, :create]

  def verify_if_logged_in
    if session[:current_user_id] == nil
      redirect_to controller: 'static_pages', action: 'main'
    end
  end
end
