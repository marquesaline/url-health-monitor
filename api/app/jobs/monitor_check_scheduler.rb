class MonitorCheckScheduler
    include Sidekiq::Worker
  
    def perform
      SiteMonitor.find_each do |site_monitor|
        MonitorCheckJob.perform_async(site_monitor.id)
      end
    end
end
  