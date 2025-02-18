require 'rest-client'

class MonitorCheckJob < ApplicationJob
  queue_as :default

  def perform(site_monitor_id)
    site_monitor = SiteMonitor.find_by(id: site_monitor_id)
    return unless site_monitor

    check_site(site_monitor)
  end

  private

  def check_site(site_monitor)
    start_time = Time.current

    begin
      response = RestClient.get(site_monitor.url)
      record_check(site_monitor, response.code, response_time(start_time), success: response.code == 200)
    rescue RestClient::ExceptionWithResponse => e
      handle_failure(site_monitor, e.response.code)
    rescue StandardError => e
      handle_failure(site_monitor, 0)
      logger.error "Error: #{site_monitor.url}: #{e.message}"
    end
  end

  def response_time(start_time)
    ((Time.current - start_time) * 1000).to_i
  end

  def record_check(site_monitor, status_code, response_time, success:)
    site_monitor.checks.create!(
      status_code: status_code,
      response_time: response_time,
      checked_at: Time.current,
      success: success
    )

    site_monitor.update!(
      status: success ? 'up' : 'down',
      last_checked_at: Time.current
    )
  end

  def handle_failure(site_monitor, status_code)
    record_check(site_monitor, status_code, 0, success: false)
  end
end
