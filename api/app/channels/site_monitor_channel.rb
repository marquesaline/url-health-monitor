class SiteMonitorChannel < ApplicationCable::Channel
  def subscribed
    stream_from "site_monitors"
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end
end
