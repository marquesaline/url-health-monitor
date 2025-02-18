class SiteMonitor < ApplicationRecord
    enum status: { down: 0, up: 1 }

    validates :name, presence: true
    validates :url, presence: true
    validates :check_interval, numericality: { greater_than_or_equal_to: 5 }
end
