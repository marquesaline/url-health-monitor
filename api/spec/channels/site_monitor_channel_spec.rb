require 'rails_helper'

RSpec.describe SiteMonitorChannel, type: :channel do
  before do
    stub_connection
    subscribe
  end

  it "subscribes successfully" do
    expect(subscription).to be_confirmed
    expect(subscription).to have_stream_from("site_monitors")
  end

  it "broadcasts a message successfully" do
    message = { message: "WebSocket Test Passed!" }
    
    expect {
      ActionCable.server.broadcast("site_monitors", message)
    }.to have_broadcasted_to("site_monitors").with(message)
  end
end
