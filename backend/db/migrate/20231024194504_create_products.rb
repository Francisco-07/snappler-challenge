class CreateProducts < ActiveRecord::Migration[5.2]
  def change
    create_table :products do |t|
      t.string :name, limit: 255
      t.text :description
      t.string :internal_code, limit: 255
      t.decimal :price
      t.decimal :cost
      t.boolean :active
      t.references :category, foreign_key: true

      t.timestamps
    end
  end
end
