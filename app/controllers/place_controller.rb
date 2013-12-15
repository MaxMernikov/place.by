require 'open-uri'
class PlaceController < ApplicationController
  def index

  end

  def search
    render json: Place.limit(10).offset(3).to_json
  end

  def show
    place = Place.find params[:id]
    respond_to do |format|
      format.html { @place = place }
      format.json { render json: place.to_json }
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
    @place.update_attributes(place_params)
    redirect_to @place
  end

  def test2
    render json: Temp.last.to_json
  end

  def test
    time_stump = Time.now.to_i # параметр по которому можно будет удалить все коллекцию
    Temp.where("detail @> 'type=>link'").limit(10).each do |page|
      hash = {}
      doc = Nokogiri::HTML(open(page.detail['url']))

      phones = []
      opening_hours = [];
      region, metro, street = nil

      place = Place.new

      doc.css('.b-institution-description_info_item').each do |r|
        case r.at_css('b.b-institution-description_info_item_type').text.strip
        when 'Телефоны'
          phones = r.css('.b-institution-description_info_item_txt').map do |phone|
            num = phone.at_css('[itemprop="telephone"]').text
            comment = phone.at_css('[itemprop="telephone"]').next().text.strip

            place.contacts.build(num: num, comment: comment.present? ? comment : nil)
          end

        when 'Адрес'
          # region = r.at_css('[itemprop="addressRegion"]').text
          # metro = r.at_css('.b-institution-description_info_item_metro').try(:text)
          street = r.at_css('[itemprop="streetAddress"]').try(:text).try(:clean).try(:strip)

          place.address = street

        when 'Время работы'
          opening_hours = r.css('.b-institution-description_info_item_txt').map do |hours|
            # meta = house.at_css('[itemprop="openingHours"]').text

            place.hours_services.build(text: hours.text.clean.strip)
          end
        end
      end

      # info_hash = info doc.at_css('.b-ps-features')
      # description = doc.at_css('.b-ps-content').text if doc.at_css('.b-ps-content')

      place.title = doc.at_css('.b-institution-description_info_item_icos_title').text
      # phones: phones,
      # region: region,
      # street: street,
      # metro: metro,
      # opening_hours: opening_hours,

      # url: page.detail['url']

      # hash = hash.merge(info_hash)
      # hash[:type] = 'content'
      # hash[:category] = 'restorans'
      # hash[:time_stump] = time_stump

      # result = Temp.create(detail: hash)
      place.save
    end


    render json: hash.to_json
  end

  def info(doc)
    result = {}
    doc.css('li').each do |r|
      result[r.at_css('.b-ps-features_left-txt').text.strip] = r.at_css('.b-ps-features_right-txt').text.clean.strip if r.at_css('.b-ps-features_left-txt').present?
    end
    result
  end

private
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
