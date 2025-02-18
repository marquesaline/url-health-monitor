class CreateSiteMonitors < ActiveRecord::Migration[7.1]
  def change
    create_table :site_monitors do |t|
      t.string :name
      t.string :url
      t.integer :check_interval
      t.integer :status
      t.datetime :last_checked_at
      t.integer :user_id

      t.timestamps
    end
  end
end
