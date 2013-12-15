require 'open-uri'
class RoomsController < ApplicationController

  def index
    result = Room.all

    respond_to do |format|
      format.html { render :blank }
      format.json { render json: result,
        only: %w[id rooms_count diurnal price address latitude longitude],
        methods: %w[
          pet smoke
          gas_oven electric_oven
          washing_machine vacuum_cleaner microwave electric_iron dishes fridge deep_freeze tv furniture intenet phone protection cable_tv dishwasher air_conditioning
        ] }


      # {"id":4,"details":{"tv":"true","smoke":"true","cable_tv":"true","gas_oven":"true","microwave":"true","deep_freeze":"true","detail_info":"металлическая дверь, пол - линолеум, сантехника новая, счетчики","electric_iron":"true","electric_oven":"true","air_conditioning":"true"},"rooms_count":1,"diurnal":false,"price":350,"region":null,"address":"Алтайская ул., 102","address_comment":null,"latitude":27.671363,"longitude":53.872613,"created_at":"2013-12-11T13:49:20.000Z","updated_at":"2013-12-11T13:49:20.000Z"}

    end
  end

  def new
    respond_to do |format|
      format.html { render :blank }
      format.json { render json: nil }
    end
  end

  def create
    room = Room.create(room_params)
    render json: { room_id: room.id }
  end

  def show
    result = Room.find(params[:id])

    respond_to do |format|
      format.html { render :blank }
      format.json { render json: result.to_json }
    end
  end

  def parse
    (1..10).each do |i|
      url = "http://www.t-s.by/rent/flats/?price[min]=0&price[max]=2500&PAGEN_1=#{i}&ajax_pager=Y"
      html = open(url).read
      doc = Nokogiri::HTML(html)
      array = nil
      doc.css('.apart_item').each do |room|
        res = {}
        res[:rooms_count] = room.at_css('.rooms').text.to_i
        res[:address] = room.at_css('table .address').text
        res[:detail_info] = room.at_css('.item_descr p').text
        res[:price] = room.at_css('.price')['data-price'].to_i
        %w[pet smoke washing_machine vacuum_cleaner microwave electric_iron dishes fridge deep_freeze tv furniture intenet phone protection cable_tv dishwasher air_conditioning].each do |option|
          if rand(2) == 1
            res[option.to_sym] = true
          end
        rand(2) == 1 ? res[:gas_oven] = true : res[:electric_oven] = true

        end
        if Room.where("details -> 'detail_info' LIKE ?", res[:detail_info]).blank?
          Room.create(res)
        end
      end


    end
    render json: {rooms_count: Room.all.count, all_rooms: Room.all}
  end

private

  def room_params
    params.require(:room).permit(
      :address,
      :address_comment,
      :rooms_count,
      :diurnal,
      :cost,
      %w[
        pet smoke
        gas_oven electric_oven
        washing_machine vacuum_cleaner microwave electric_iron dishes fridge deep_freeze tv furniture intenet phone protection cable_tv dishwasher air_conditioning
        bed_count
        diurnal_name detail_info
      ],
     )
  end
end
