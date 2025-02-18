class Check < ApplicationRecord
  belongs_to :site_monitor

  validates :status_code, presence: true
  validates :response_time, numericality: { greater_than_or_equal_to: 0 }
  validates :checked_at, presence: true
  validates :success, inclusion: { in: [true, false] }
end
