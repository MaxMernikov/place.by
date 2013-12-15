require 'rubygems'
require 'nokogiri'
require 'open-uri'

namespace :db do
  desc 'Migrate data from several partials: rake db:migrate_data task='
  task migrate_data: :environment do
    if ENV['task'].present?
      puts 'Выполняем ' + ENV['task']
      self.send(ENV['task'])
    else
      categories
      restorans
    end
  end
end

def categories
  puts 'Создаем категории'
  ActiveRecord::Base.connection.execute('TRUNCATE categories')
  [ { title: 'Квартиры', slug: 'flats', pos: 1 },
    { title: 'Общественное питание', slug: 'catering', pos: 1, subcategory: [
      { title: 'Рестораны', slug: 'restaurants', pos: 1 },
      { title: 'Закусочные', slug: 'fast_foods', pos: 2 },
      { title: 'Бары', slug: 'bars', pos: 3 },
      { title: 'Кафе', slug: 'cafe', pos: 4 },
      { title: 'Кофейни', slug: 'coffee', pos: 5 },
      { title: 'Столовые', slug: 'canteens', pos: 6 }
    ]},
    { title: 'Магазины', slug: '', pos: 1, subcategory: [
      { title: 'Продукты питания', slug: '', pos: 1 },
      { title: 'Бытовая химия', slug: '', pos: 2 },
      { title: 'Одежда', slug: '', pos: 2 }
    ]}
  ].each do |category|
    cat = Category.create(title: category[:title], pos: category[:pos], slug: category[:slug])
    if category[:subcategory].present?
      category[:subcategory].each do |sub|
        cat.categories.create(title: sub[:title], pos: sub[:pos], slug: sub[:slug])
      end
    end
  end
end

def counter(int)
  '?page=' + int.to_s
end
def restorans
  url = 'http://www.relax.by/cat/ent/restorans/'
  page_count = 8 #количество страниц с ссылками
  start_row = Temp.all.count

  # count_thr = 25
  not_save = []
  threads = []
  semaphore = Mutex.new

  (1..page_count).each do |page_num|
    threads << Thread.new(page_num) do |page_num|
      page = url + counter(page_num)
      doc = Nokogiri::HTML(open(page))
      doc.css('.b-institution').map do |block|
        if block.at_css('a.b-institution_description_name_line').present?
          link = block.at_css('a.b-institution_description_name_line')[:href]
          semaphore.synchronize {
            ActiveRecord::Base.connection_pool.with_connection do
              begin
                Temp.create(detail: {type: 'link', url: link})
              rescue => e
                not_save << { obj: link, error: e }
              end
            end
          }
        end
      end
    end
  end
  threads.each {|thr| thr.join }

  puts('Несохранено ' + not_save.inspect) if not_save.present
  puts 'Добавлено ' + (Temp.all.count - start_row).to_s + ' записей'
end

#   def relax_2
#     hash = {}
#     Relax.where( id: 45 ).each do |page|
#       doc = Nokogiri::HTML(open(page.url))

#       phones = []
#       adress = {}
#       opening_hours = []
#       doc.css('.b-institution-description_info_item').each do |r|
#         case r.at_css('b.b-institution-description_info_item_type').text.strip
#         when 'Телефоны'
#           phones = r.css('.b-institution-description_info_item_txt').map do |phone|
#             num = phone.at_css('[itemprop="telephone"]').text
#             comment = phone.at_css('[itemprop="telephone"]').next().text.strip
#             { num: num, comment: comment.present? ? comment : nil }
#           end

#         when 'Адрес'
#           adress = {
#             region: r.at_css('[itemprop="addressRegion"]').text,
#             street: r.at_css('[itemprop="streetAddress"]').text.clean.strip,
#             metro: r.at_css('.b-institution-description_info_item_metro').text
#             }

#         when 'Время работы'
#           opening_hours = r.css('.b-institution-description_info_item_txt').map do |hours|
#             # meta = house.at_css('[itemprop="openingHours"]').text
#             { hours: hours.text.clean.strip }
#           end
#         end
#       end

#       hash = {
#         title: doc.at_css('.b-institution-description_info_item_icos_title').text,
#         phones: phones,
#         adress: adress,
#         opening_hours: opening_hours
#       }
#     end
#     render json: hash
#   end
# end

class String
  def clean
    self.gsub(/\n/, ' ').tr_s(' ', ' ')
  end
end
