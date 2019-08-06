Rails.application.routes.draw do
  get 'comment_likes/controller'

  root 'static_pages#main'

  post '/users', to: 'users#create'

  get '/users/:id', to: 'users#show'

  get '/users', to: 'users#index'

  put '/users/:id', to: 'users#update'

  delete '/users/:id', to: 'users#delete'

  get '/logincheck', to: 'static_pages#logincheck'

  post '/users/:id/posts', to: 'posts#create'

  get '/users/:id/current_user', to: 'users#current_user'

  post '/posts/:id/comments', to: 'comments#create'

  get '/posts/:id/comments', to: 'comments#index'

  get '/get_user_info', to: 'users#get_user_info'

  post '/posts/:id/likes', to: 'post_likes#create'

  delete '/posts/:id/likes', to: 'post_likes#delete'

  post '/comments/:id/likes', to: 'comment_likes#create'

  delete '/comments/:id/likes', to: 'comment_likes#delete'

  get '/posts/:id/checkIfLiked', to: 'post_likes#check_if_liked_by_user'

  get '/comments/:id/checkIfLiked', to: 'comment_likes#check_if_liked_by_user'

end
