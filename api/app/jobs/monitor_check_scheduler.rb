class MonitorCheckScheduler
  include Sidekiq::Worker

  def perform
    Rails.logger.info "MonitorCheckScheduler running at #{Time.current}"
    
    SiteMonitor.find_each do |site_monitor|
      Rails.logger.info "Scheduling MonitorCheckJob for SiteMonitor #{site_monitor.id}"
      
      MonitorCheckJob.set(wait: 1.second).perform_later(site_monitor.id)
    end
  end
end
