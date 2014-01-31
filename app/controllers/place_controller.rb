require 'open-uri'
class PlaceController < ApplicationController

  def show
    place = Place.find(params[:id])
    respond_to do |format|
      format.html { render :blank }
      format.json { render json: place.to_json(methods: [:contacts], include: { category: { only: [:title, :slug] } } ) }
    end
  end

  def update
    @place = Place.find params[:id]
    if @place.version_drafts.create(object: update_place_params)
      render text: 'ok'
    else
      render text: 'уккщу'
    end
  end

private
  def update_place_params
    params.require(:place).permit(:address, :title, :address_comment, :description, :time_work)
  end
end

class String
  def clean
    self.gsub(/\n/, ' ').tr_s(' ', ' ')
  end
end
