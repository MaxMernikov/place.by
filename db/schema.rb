# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20131124192217) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"
  enable_extension "hstore"

  create_table "categories", force: true do |t|
    t.string   "title"
    t.string   "slug"
    t.decimal  "category_id", precision: 4, scale: 0
    t.decimal  "pos",         precision: 3, scale: 0
    t.hstore   "detail"
    t.boolean  "show"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "contacts", force: true do |t|
    t.integer  "contact_type"
    t.string   "num"
    t.string   "comment"
    t.integer  "contactable_id"
    t.string   "contactable_type"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "hours_services", force: true do |t|
    t.boolean  "monday"
    t.boolean  "tuesday"
    t.boolean  "wednesday"
    t.boolean  "thursday"
    t.boolean  "friday"
    t.boolean  "saturday"
    t.boolean  "sunday"
    t.time     "start_at"
    t.time     "end_at"
    t.string   "text"
    t.integer  "place_id"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "masks", force: true do |t|
    t.integer  "place_id"
    t.hstore   "content"
    t.hstore   "detail"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "places", force: true do |t|
    t.string   "title"
    t.hstore   "detail"
    t.string   "region"
    t.string   "address"
    t.string   "address_comment"
    t.float    "latitude"
    t.float    "longitude"
    t.text     "description"
    t.decimal  "category_id",     precision: 4, scale: 0
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "rooms", force: true do |t|
    t.hstore   "details"
    t.integer  "rooms_count"
    t.boolean  "diurnal",         default: false
    t.integer  "price"
    t.string   "region"
    t.string   "address"
    t.string   "address_comment"
    t.float    "latitude"
    t.float    "longitude"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "temps", force: true do |t|
    t.hstore   "detail"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

end
