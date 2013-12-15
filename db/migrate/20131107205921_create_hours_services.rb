class CreateHoursServices < ActiveRecord::Migration
  def change
    create_table :hours_services do |t|
      t.boolean :monday
      t.boolean :tuesday
      t.boolean :wednesday
      t.boolean :thursday
      t.boolean :friday
      t.boolean :saturday
      t.boolean :sunday
      t.time :start_at
      t.time :end_at
      t.string :text
      t.integer :place_id

      t.timestamps
    end
  end
end
