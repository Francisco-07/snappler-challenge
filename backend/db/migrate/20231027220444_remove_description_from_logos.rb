class RemoveDescriptionFromLogos < ActiveRecord::Migration[5.2]
  def change
    remove_column :logos, :description
  end
end
