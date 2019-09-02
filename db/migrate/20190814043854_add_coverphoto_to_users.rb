class AddCoverphotoToUsers < ActiveRecord::Migration[5.1]
  def change
    add_column :users, :coverphoto, :string
  end
end
