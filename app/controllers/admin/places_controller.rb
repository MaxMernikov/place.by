class Admin::PlacesController < ApplicationController
  load_and_authorize_resource
  layout 'admin'
  before_action :set_place, only: [:show, :edit, :update, :destroy]

  def index
    @places = Place.all
  end

  def new
    @place = Place.new
  end

  def show
  end

  def edit
  end

  def create
    @place = Place.new(place_params)

    if @place.save
      redirect_to admin_places_path, notice: 'Place was successfully created.'
    else
      render action: 'new'
    end
  end

  def update
    if @place.update(place_params)
      redirect_to admin_places_path, notice: 'Place was successfully updated.'
    else
      render action: 'edit'
    end
  end

  def destroy
    @place.destroy
    redirect_to admin_places_path
  end

private
  def set_place
    @place = Place.find(params[:id])
  end

  def place_params
    params.require(:place).permit(:category_id, :title, :address, :address_comment, :description, :network, :time_work, contacts_attributes: [:id, :contact_type, :num, :comment, :_destroy], services_attributes: [:id, :title, :cost, :_destroy])
  end

end
