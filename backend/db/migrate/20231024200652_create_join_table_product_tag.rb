class CreateJoinTableProductTag < ActiveRecord::Migration[5.2]
  def change
    create_join_table :products, :tags do |t|
      t.references :product, foreign_key: true
      t.references :tag, foreign_key: true
    end
  end
end
