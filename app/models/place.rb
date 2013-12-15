class Place < ActiveRecord::Base
  concerned_with :module_geo, :module_mask, :module_diff

  # validates :title, presence: true
  # validates :title, uniqueness: true

  has_many :hours_services
  has_many :contacts, as: :contactable
end
