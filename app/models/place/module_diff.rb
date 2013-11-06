class Place < ActiveRecord::Base
  def get_next mask
    masks = Mask.next(mask.place_id, mask.created_at).select(:id, :content, :detail)
    previous = mask.place_style
    keys = previous.keys
    detail_keys = previous['detail'].keys if keys.include?('detail')

    # чистим исходные данные от неизмененных полей
    new_mask = self.attributes.select{ |k, v| keys.include? k }
    new_mask['detail'] = new_mask['detail'].select{ |k, v| detail_keys.include? k }
    # raise new_mask.inspect

    keys = keys - ['updated_at']
    # получаем массив изменений
    changes = masks.map do |mask|
      change = mask.content.select{ |k, v| keys.include? k }
      change['detail'] = mask.detail.select{ |k, v| detail_keys.include? k } if detail_keys.present?
      change['updated_at'] = mask.content['updated_at'] if change.present?
      change
    end
# raise changes.inspect


    changes.each do |ver|
      new_mask = new_mask.merge(ver)
    end

    new_mask

    # raise keys.inspect

    # res
    # raise new_mask.inspect
  end

end
