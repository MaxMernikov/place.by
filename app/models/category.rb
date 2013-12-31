class Category < ActiveRecord::Base
  has_ancestry
  attr_accessor :ancestry_id
  has_many :places

  validates :title, uniqueness: true
  before_save :set_ancestry

  scope :by_title, -> { order('title ASC') }
  scope :not_root, -> { where('ancestry IS NOT null') }

  def set_ancestry
    self.parent = Category.find(ancestry_id) if ancestry_id.present?
  end
end
