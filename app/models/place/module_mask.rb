class Place < ActiveRecord::Base
  has_many :masks

  after_update :create_mask

  # создаем слепок если произведены изменения
  def create_mask
    # обрабатываем изменения с целью получить Hash только подвергшихся изменениям источников
    change_detail = {}
    result = changes.inject({}) do |hash, (k, v)|

      # для detail у нас особый алгоритм извлечения подвергшихся изменениям источников
      if k == 'detail'

        # проверяем действительно ли были изменения
        if changes['detail'][0] != changes['detail'][1]

          # забираем первое значение changes для detail
          change_detail = changes['detail'][0].select do |key, val|
            changes['detail'][1][key] != val
          end
        end
        hash

      # для всего остального забираем первое значение changes
      else
        hash[k] = v[0]; hash
      end
    end

    # проверяем если result имеет что нибудь кроме updated_at то создаем слепок (Mask)
    # TODO делать каждые 10-ый слепок целым, c параметром full
    if change_detail.present? || result.select{|k, v| k != 'updated_at'}.present?
      self.masks.create(content: result, detail: change_detail)
    end
  end

end