class Place < ActiveRecord::Base
  concerned_with :module_geo, :module_mask, :module_diff

  validates :title, :detail, presence: true

end
