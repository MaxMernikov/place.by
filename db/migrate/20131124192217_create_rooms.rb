class CreateRooms < ActiveRecord::Migration
  def change
    create_table :rooms do |t|
      t.hstore :details
      t.integer :rooms_count
      t.boolean :diurnal, default: false

      t.integer :price

      t.string :region
      t.string :address
      t.string :address_comment
      t.float :latitude, precision: 2, scale: 12
      t.float :longitude, precision: 2, scale: 12

      t.timestamps
    end
  end
end
