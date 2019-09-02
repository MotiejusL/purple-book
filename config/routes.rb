Rails.application.routes.draw do
  get 'comment_likes/controller'

  root 'static_pages#main'

  post '/users', to: 'users#create'

  get '/users/:id', to: 'users#show'

  get '/users/:id/profile', to: 'profiles#show', as: 'profile'

  get '/users/:id/profile/friends', to: 'profiles#friends', as: 'profile_friends'

  get '/users/:id/profile/photos', to: 'profiles#photos', as: 'profile_photos'

  get '/users/:id/profile/about', to: 'profiles#about', as: 'profile_about'

  get '/users', to: 'users#index'

  put '/users/:id', to: 'users#update'

  delete '/users/:id', to: 'users#delete'

  get '/logincheck', to: 'static_pages#logincheck'

  post '/users/:id/posts', to: 'posts#create'

  get '/users/current_user', to: 'users#current_user'

  post '/posts/:id/comments', to: 'comments#create'

  get '/posts/:id/comments', to: 'comments#index'

  get '/get_user_info', to: 'users#get_user_info'

  post '/posts/:id/likes', to: 'post_likes#create'

  delete '/posts/:id/likes', to: 'post_likes#delete'

  post '/comments/:id/likes', to: 'comment_likes#create'

  delete '/comments/:id/likes', to: 'comment_likes#delete'

  get '/posts/:id/checkIfLiked', to: 'post_likes#check_if_liked_by_user'

  get '/comments/:postId/check_likes', to: 'comment_likes#check_likes'

  get '/users/:id/friend_requests', to: 'friend_requests#index'

  put 'users/friend_requests/:id/accept', to: 'friend_requests#accept_request'

  delete 'users/friend_requests/:id/delete', to: 'friend_requests#delete'

  get 'users/profile/get_friends_count', to: 'users#get_friends_count'

end
