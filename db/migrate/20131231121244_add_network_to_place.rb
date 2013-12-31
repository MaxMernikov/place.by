class AddNetworkToPlace < ActiveRecord::Migration
  def change
    add_column :places, :network, :string
    add_column :places, :time_work, :text
  end
end
