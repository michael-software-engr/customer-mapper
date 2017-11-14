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

ActiveRecord::Schema.define(version: 20171113080920) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "customers", force: :cascade do |t|
    t.string "name"
    t.string "address"
    t.string "city"
    t.string "state"
    t.integer "zip"
    t.string "phone"
    t.string "email"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.decimal "latitude", precision: 11, scale: 8
    t.decimal "longitude", precision: 11, scale: 8
    t.string "job_id"
    t.index ["city"], name: "index_customers_on_city"
    t.index ["email"], name: "index_customers_on_email", unique: true
    t.index ["job_id"], name: "index_customers_on_job_id"
    t.index ["name"], name: "index_customers_on_name"
    t.index ["state"], name: "index_customers_on_state"
    t.index ["zip"], name: "index_customers_on_zip"
  end

  create_table "vehicles", force: :cascade do |t|
    t.integer "year"
    t.string "make"
    t.string "model"
    t.string "trim"
    t.string "style"
    t.string "vin"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.bigint "customer_id"
    t.index ["customer_id"], name: "index_vehicles_on_customer_id"
    t.index ["make"], name: "index_vehicles_on_make"
    t.index ["model"], name: "index_vehicles_on_model"
    t.index ["style"], name: "index_vehicles_on_style"
    t.index ["trim"], name: "index_vehicles_on_trim"
    t.index ["year"], name: "index_vehicles_on_year"
  end

  add_foreign_key "vehicles", "customers"
end
