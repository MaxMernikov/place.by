class CreateCategories < ActiveRecord::Migration
  def change
    create_table :categories do |t|
      t.string :title
      t.string :slug
      t.integer :pos
      t.hstore :detail
      t.boolean :show
      t.string :ancestry
      t.index :ancestry

      t.timestamps
    end
  end
end
