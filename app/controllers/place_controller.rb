require 'open-uri'
class PlaceController < ApplicationController
  def index

  end

  def search
    render json: Place.limit(10).offset(3).to_json
  end

  def show
    place = Place.find(params[:id])

    # category = Category.find_by(slug: params[:category_id])
    # place = category.places.find params[:id]
    respond_to do |format|
      format.html { render :blank }
      format.json { render json: place.to_json(methods: [:contacts], include: { category: {only: [:title, :slug]} } ) }
    end
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


    # if @place.update_attributes(update_place_params)
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

  def place_params
    params.require(:place).permit(
      :title,
      :address,
      :overview,
      :category_id,
      detail: [
        :how_to_catch,
        :room_count,
        :wifi,
        :wash_mashine
      ]
    )
  end
end

class String
  def clean
    self.gsub(/\n/, ' ').tr_s(' ', ' ')
  end
end
