require 'rubygems'
require 'nokogiri'
require 'open-uri'

desc 'Migrate data from several partials: rake db:migrate_data task='
task map_by: :environment do
  url = 'http://map.by/stil-i-krasota/basseini.htm&page='
  page_count = 4
  category_id = Category.find_by(title: 'Бассейн').id

  (1..page_count).take(1).each do |page_num|
    page = url + counter(page_num)
    doc = Nokogiri::HTML(open(page))
    doc.css('.comshot').each do |block|
      place = Place.new(
        category_id: category_id,
        title: block.at_css('h2 a').text,
        address: block.at_css('.ico_adr a').text,
        time_work: block.at_css('.workhours strong').text
      )
      if place.save
        place.contacts.create(contact_type: 1, num: block.at_css('.ico_tel strong').text)
      end

    end
  end

end
