class PlaceController < ApplicationController
  def index

  end

  def show
    @place = Place.find params[:id]
  end

  def create
    # raise place_params.inspect
    place = Place.create(place_params)
    redirect_to place
  end

  def new
    @place = Place.new
  end

  def edit
    @place = Place.find params[:id]
  end

  def update
    @place = Place.find params[:id]
    @place.update_attributes(place_params)
    redirect_to @place
  end

private
  def place_params
    params.require(:place).permit(:title, :address, :overview, detail: [:how_to_catch])
  end
end
