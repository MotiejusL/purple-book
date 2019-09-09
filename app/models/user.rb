class User < ApplicationRecord
  has_many :posts
  has_many :friend_requests
  has_many :pending_friends, through: :friend_requests, source: :friend
  has_many :friendships
  has_many :friends, through: :friendships
  has_many :photos
end
