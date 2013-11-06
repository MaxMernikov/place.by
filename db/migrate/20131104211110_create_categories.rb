class CreateCategories < ActiveRecord::Migration
  def change
    create_table :categories do |t|
      t.string :title
      t.string :slug
      t.decimal :category_id, precision: 4, scale: 0
      t.decimal :pos, precision: 3, scale: 0
      t.hstore :detail

      t.timestamps
    end
  end
end
