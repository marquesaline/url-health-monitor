class SiteMonitor < ApplicationRecord
    has_many :checks, dependent: :destroy
    enum status: { down: 0, up: 1 }

    validates :name, presence: true
    validates :url, presence: true
    validates :check_interval, numericality: { greater_than_or_equal_to: 5 }

    def uptime_percentage
        total_checks = checks.count
        return 0 if total_checks.zero?

        successful_checks = checks.where(success: true).count
        ((successful_checks.to_f / total_checks) * 100).round(2)
    end

    def average_response_time
        success_checks = checks.where(success: true)
        return 0 if success_checks.empty?

        checks.average(:response_time).to_f.round(2)
    end
end
