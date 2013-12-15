class ServiceController < ApplicationController
  def coordinate
    result = Geocoder.search(params[:address]+', Minsk, Belarus')
    if result.first.present?
      send = result.first.data['geometry']['location']
      render json: {
        latitude: send['lat'],
        longitude: send['lng']
      }
    else
      raise result.inspect
    end
  end
end