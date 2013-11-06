class CreatePlaces < ActiveRecord::Migration
  def change
    create_table :places do |t|
      t.string :title
      t.hstore :detail

      t.string :address, :string
      t.float :latitude, precision: 3, scale: 7
      t.float :longitude, precision: 3, scale: 7
      t.text :description

      t.decimal :category_id, precision: 4, scale: 0

      t.timestamps
    end
  end
end
