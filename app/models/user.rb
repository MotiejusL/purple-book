class User < ApplicationRecord
  has_many :posts
  has_many :friend_requests
end
