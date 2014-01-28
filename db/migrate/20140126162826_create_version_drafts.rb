class CreateVersionDrafts < ActiveRecord::Migration
  def self.up
    create_table :version_drafts do |t|
      t.string   :item_type, :null => false
      t.integer  :item_id,   :null => false
      t.text     :object
      t.datetime :created_at
      t.boolean  :approved, default: false
    end
    add_index :version_drafts, [:item_type, :item_id]
  end

  def self.down
    remove_index :version_drafts, [:item_type, :item_id]
    drop_table :version_drafts
  end
end
