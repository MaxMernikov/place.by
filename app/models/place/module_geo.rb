class Place < ActiveRecord::Base

  geocoded_by :address_with_country
  after_validation :geocode, if: :address_changed?

  def address_with_country
    address + ', г. Минск, Беларусь' if address
  end
end