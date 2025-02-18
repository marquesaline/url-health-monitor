# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[7.1].define(version: 2025_02_18_211830) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "checks", force: :cascade do |t|
    t.bigint "site_monitor_id", null: false
    t.integer "status_code"
    t.integer "response_time"
    t.datetime "checked_at"
    t.boolean "success"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["site_monitor_id"], name: "index_checks_on_site_monitor_id"
  end

  create_table "monitors", force: :cascade do |t|
    t.string "name"
    t.string "url"
    t.integer "check_interval"
    t.integer "status"
    t.datetime "last_checked_at"
    t.integer "user_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "site_monitors", force: :cascade do |t|
    t.string "name"
    t.string "url"
    t.integer "check_interval"
    t.integer "status"
    t.datetime "last_checked_at"
    t.integer "user_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_foreign_key "checks", "site_monitors"
end
