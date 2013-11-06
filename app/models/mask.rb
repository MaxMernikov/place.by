class Mask < ActiveRecord::Base
  belongs_to :place

  scope :previous, ->(place_id, created_at) { where("created_at < ? AND place_id = ?", created_at, place_id).order('created_at DESC') }

  scope :next, ->(place_id, created_at) { where("created_at > ? AND place_id = ?", created_at + 1.second, place_id).order('created_at DESC') }

  # возвращаем id предыдущей маски
  def previous_mask_id
    Mask.previous(place_id, created_at).pluck(:id).first
  end

  def next_masks ds

  end

  def place_style
    content['detail'] = detail
    content
  end
end
