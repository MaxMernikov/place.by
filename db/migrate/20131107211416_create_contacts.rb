class CreateContacts < ActiveRecord::Migration
  def change
    create_table :contacts do |t|
      t.integer :contact_type
      t.string :num
      t.string :comment
      t.integer :contactable_id
      t.string :contactable_type

      t.timestamps
    end
  end
end
