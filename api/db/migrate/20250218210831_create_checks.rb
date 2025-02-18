class CreateChecks < ActiveRecord::Migration[7.1]
  def change
    create_table :checks do |t|
      t.references :site_monitor, null: false, foreign_key: true
      t.integer :status_code
      t.integer :response_time
      t.datetime :checked_at
      t.boolean :sucess

      t.timestamps
    end
  end
end
