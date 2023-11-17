class AddIsFavoriteToImageGroups < ActiveRecord::Migration[5.2]
  def change
    add_column :image_groups, :is_favorite, :boolean
  end
end
