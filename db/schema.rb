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

ActiveRecord::Schema.define(version: 20140203153441) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"
  enable_extension "hstore"

  create_table "admins", force: true do |t|
    t.string   "email",                  default: "", null: false
    t.string   "encrypted_password",     default: "", null: false
    t.string   "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer  "sign_in_count",          default: 0,  null: false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.string   "current_sign_in_ip"
    t.string   "last_sign_in_ip"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "admins", ["email"], name: "index_admins_on_email", unique: true, using: :btree
  add_index "admins", ["reset_password_token"], name: "index_admins_on_reset_password_token", unique: true, using: :btree

  create_table "categories", force: true do |t|
    t.string   "title"
    t.string   "slug"
    t.integer  "pos"
    t.hstore   "detail"
    t.boolean  "show"
    t.string   "ancestry"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "categories", ["ancestry"], name: "index_categories_on_ancestry", using: :btree

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
    t.string   "network"
    t.text     "time_work"
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

  create_table "services", force: true do |t|
    t.string   "title"
    t.integer  "cost"
    t.integer  "place_id"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "version_drafts", force: true do |t|
    t.string   "item_type",                  null: false
    t.integer  "item_id",                    null: false
    t.text     "object"
    t.datetime "created_at"
    t.boolean  "approved",   default: false
  end

  add_index "version_drafts", ["item_type", "item_id"], name: "index_version_drafts_on_item_type_and_item_id", using: :btree

end
