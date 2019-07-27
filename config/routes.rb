Rails.application.routes.draw do
  root 'static_pages#main'

  post '/users', to: 'users#create'

  get '/users/:id', to: 'users#show'

  get '/users', to: 'users#index'

  put '/users/:id', to: 'users#update'

  delete '/users/:id', to: 'users#delete'

  get '/logincheck', to: 'static_pages#logincheck'
end
