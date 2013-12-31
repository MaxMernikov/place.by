class CreateServices < ActiveRecord::Migration
  def change
    create_table :services do |t|
      t.string :title
      t.integer :cost
      t.integer :place_id

      t.timestamps
    end
  end
end
