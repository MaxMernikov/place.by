class Place < ActiveRecord::Base
  include Geocode
  # has_paper_trail

  has_many :version_drafts, as: :item
  # concerned_with :module_geo

  belongs_to :category
  has_many :hours_services
  has_many :services
  has_many :contacts, as: :contactable

  accepts_nested_attributes_for :services, reject_if: proc { |a| a['title'].blank? }, allow_destroy: true
  accepts_nested_attributes_for :contacts, reject_if: proc { |a| a['num'].blank? }, allow_destroy: true

  validates :category_id, :address, presence: true
  validates :title, uniqueness: { scope: :address }

  def address_with_country
    address + ', г. Минск, Беларусь' if address
  end

  def get_current
    if versions.size > 0
      self.versions.where(approved: true).last.present? ? self.versions.where(approved: true).last.reify : self.versions.first.reify
    end
  end

end
