module Geocode
  extend ActiveSupport::Concern
  require 'open-uri'

  included do
    # при изменении адреса делается запрос на получение координат
    after_validation :set_geocode, if: :address_changed?
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