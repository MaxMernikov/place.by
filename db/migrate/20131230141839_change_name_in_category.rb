class ChangeNameInCategory < ActiveRecord::Migration
  def change
    change_table :categories do |t|
      t.remove :category_id
      t.string :ancestry
      t.index :ancestry
    end
  end
end
