class CreateTemps < ActiveRecord::Migration
  def change
    create_table :temps do |t|
      t.hstore :detail

      t.timestamps
    end
  end
end
