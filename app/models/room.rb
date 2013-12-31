class Room < ActiveRecord::Base
  require 'open-uri'
  # при изменении адреса делается запрос на получение координат
  after_validation :set_geocode, if: :address_changed?

  # формируем методы для работы с данными в hstore
  # массивы boolean, integer, string позваляют разграничивать и преобразовывать данные в необходимые типы
  { boolean: %w[
      pet smoke
      gas_oven electric_oven
      washing_machine vacuum_cleaner microwave electric_iron dishes fridge deep_freeze tv furniture intenet phone protection cable_tv dishwasher air_conditioning
      part_apartment
    ],
    integer: %w[bed_count],
    string: %w[diurnal_name detail_info]
  } .each do |key, keys|
    # методы для чтения
    case key
    when :boolean
      keys.each do |key|
        define_method(key) do
          details && details[key] == 'true'
        end
      end
    when :integer
      keys.each do |key|
        define_method(key) do
          details && details[key].to_i
        end
      end
    when :string
      keys.each do |key|
        define_method(key) do
          details && details[key]
        end
      end
    end

    # методы для записи
    keys.each do |key|
      define_method("#{key}=") do |value|
        self.details = (details || {}).merge(key => value)
      end
    end
  end

  # метод для определения координат
  def set_geocode
    if address.present?
      result = get_geocode(address)
      if result[:response].present?
        self.latitude = result[:response][0]
        self.longitude = result[:response][1]
      else
        'координаты объекта не могут быть установлены'
      end
    end
  end

  # обращение к апи geocoder
  def get_geocode(address)
    # http://api.yandex.ru/maps/doc/geocoder/desc/concepts/input_params.xml

    full_address = URI::encode('Беларусь,+Минск,+' + address).gsub(' ', '+')
    response = open('http://geocode-maps.yandex.ru/1.x/?format=json&results=1&geocode=' + full_address).read
    json = JSON.parse(response)
    if json['response'].present?
      if json['response']['GeoObjectCollection']['metaDataProperty']['GeocoderResponseMetaData']['found'].to_i == 1
        coordinates = json['response']['GeoObjectCollection']['featureMember'].first['GeoObject']['Point']['pos']
        { response: coordinates.split(' ') }
      else
        { errors: ['место не определено']}
      end
    else
      Rails.logger.api_errors.debug('YandexGeocodder: ' + json.to_s)
      { errors: ['что то пошло не так']}
    end
  end
end
