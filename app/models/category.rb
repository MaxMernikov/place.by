class Category < ActiveRecord::Base
  has_many :categories
  belongs_to :category

  validates :title, uniqueness: true

  scope :main, -> { where('category_id IS NULL')}
end
