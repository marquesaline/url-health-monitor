require 'rails_helper'

RSpec.describe MonitorCheckJob, type: :job do
  let!(:site_monitor) { create(:site_monitor, url: 'https://example.com', check_interval: 5) }
  let(:response_mock) { double(code: 200) }

  before do
    allow(RestClient).to receive(:get).and_return(response_mock)
  end

  describe 'when the site is reachable' do
    it 'creates a new check entry' do
      expect {
        MonitorCheckJob.perform_now(site_monitor.id)
      }.to change { site_monitor.checks.count }.by(1)

      last_check = site_monitor.checks.last
      expect(last_check.status_code).to eq(200)
      expect(last_check.success).to be true
    end

    it 'updates site monitor status to up' do
      MonitorCheckJob.perform_now(site_monitor.id)
      site_monitor.reload

      expect(site_monitor.status).to eq('up')
    end
  end

  describe 'when the site is unreachable' do
    before do
      allow(RestClient).to receive(:get).and_raise(RestClient::ExceptionWithResponse.new(double(code: 500)))
    end

    it 'updates site monitor status to down' do
      MonitorCheckJob.perform_now(site_monitor.id)
      site_monitor.reload

      expect(site_monitor.status).to eq('down')
      expect(site_monitor.checks.last.status_code).to eq(500)
    end
  end
end
