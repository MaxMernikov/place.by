class MaskController < ApplicationController
  def index
    place = Place.find(params[:place_id])
    mask = place.masks.last
    @mask = mask
    @place_next = Place.new place.get_next(mask)
    @place_prew = Place.new(mask.place_style)
    render :show
  end

  def show
    place = Place.find(params[:place_id])
    mask = place.masks.find(params[:id])
    @mask = mask

    @place_next = Place.new place.get_next(mask)
    @place_prew = Place.new(mask.place_style)
  end
end
