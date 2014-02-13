class Category < ActiveRecord::Base
  has_ancestry

  attr_accessor :ancestry_id
  has_many :places

  validates :title, :slug, uniqueness: true
  before_save :set_ancestry

  scope :by_title, -> { order('title ASC') }
  scope :not_root, -> { where('ancestry IS NOT null') }

  def set_ancestry
    self.parent = Category.find(ancestry_id) if ancestry_id.present?
  end

  def hash
    rand(9999)
  end

  def elements_count
    places.size
  end
end
