# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

# место расположения

# виды кухонь (итальянская, китайская, вегетарианская) делать тегами?
# категории цен (до 30, 30-50, 50-80, 80-150, от 150(показывать особые блюда наивысшей сложности) )

# показывать в зависимости от времени суток:
#   завтраки (специальное меню)
#   обеды (специальное меню)
#   ужины (живая музыка)
#   ночное питание (ночное время работы) заказать или где то посидеть

# категории блюд
#   шашлык, пицца, суши, паста

# заведения питания
[
  { title: 'Общественное питание', slug: '', subcategory: [
    { title: 'Рестораны', slug: '', pos: 1 },
    { title: 'Закусочные', slug: '', pos: 2 },
    { title: 'Бары', slug: '', pos: 3 },
    { title: 'Кафе', slug: '', pos: 4 },
    { title: 'Кофейни', slug: '', pos: 5 },
    { title: 'Столовые', slug: '', pos: 6 }
  ]},
  { title: 'Магазины', slug: '', subcategory: [
    { title: 'Продукты питания', slug: '', pos: 1 },
    { title: 'Бытовая химия', slug: '', pos: 2 },
    { title: 'Одежда', slug: '', pos: 2 }
  ]}
].each do |category|
  cat = Category.create(title: category[:title], pos: category[:pos])
  category[:subcategory].each do |sub|
    cat.categories.create(title: sub[:title], pos: sub[:pos])
  end
end