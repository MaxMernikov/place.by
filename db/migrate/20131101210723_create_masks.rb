class CreateMasks < ActiveRecord::Migration
  def change
    create_table :masks do |t|
      t.integer :place_id
      t.hstore :content
      t.hstore :detail

      t.timestamps
    end
  end
end
