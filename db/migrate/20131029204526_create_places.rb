class CreatePlaces < ActiveRecord::Migration
  def change
    create_table :places do |t|
      t.string :title
      t.hstore :detail

      t.string :region
      t.string :address
      t.string :address_comment
      t.float :latitude, precision: 2, scale: 9
      t.float :longitude, precision: 2, scale: 9
      t.text :description

      t.decimal :category_id, precision: 4, scale: 0

      t.timestamps
    end
  end
end
