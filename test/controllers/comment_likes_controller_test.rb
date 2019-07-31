require 'test_helper'

class CommentLikesControllerTest < ActionDispatch::IntegrationTest
  test "should get controller" do
    get comment_likes_controller_url
    assert_response :success
  end

end
