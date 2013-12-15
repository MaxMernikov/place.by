class Category < ActiveRecord::Base
  belongs_to :category

  has_many :categories
  has_many :places

  validates :title, uniqueness: true

  scope :main, -> { where('category_id IS NULL')}
end
