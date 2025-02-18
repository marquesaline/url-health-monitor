require 'rails_helper'

RSpec.describe 'SiteMonitors', type: :request do
  let!(:site_monitor) { create(:site_monitor) }
  let(:site_monitor_id) { site_monitor.id }

  describe 'GET /site_monitors' do
    it 'Should return a list of monitors' do
      get '/site_monitors'
      expect(response).to have_http_status(:success)
      expect(JSON.parse(response.body).size).to eq(1)
    end
  end

  describe 'GET /site_monitors/:id' do
    it 'Should return a monitor' do
      get "/site_monitors/#{site_monitor_id}"
      expect(response).to have_http_status(:success)
      expect(JSON.parse(response.body)['id']).to eq(site_monitor_id)
    end
  end

  describe 'GET /site_monitors/:id (not found)' do
    it 'Should return status 404' do
      get '/site_monitors/100'
      expect(response).to have_http_status(:not_found)
      parsed_response = JSON.parse(response.body)
      expect(parsed_response['message']).to eq('Site monitor not found')
    end
  end

end

