class Place < ActiveRecord::Base
  include Geocode
  # concerned_with :module_geo

  belongs_to :category
  has_many :hours_services
  has_many :contacts, as: :contactable
  accepts_nested_attributes_for :contacts, reject_if: proc { |a| a['num'].blank? }, allow_destroy: true

  validates :category_id, :address, presence: true

  def address_with_country
    address + ', г. Минск, Беларусь' if address
  end
end
