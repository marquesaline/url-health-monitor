require 'rails_helper'

RSpec.describe 'SiteMonitors', type: :request do
  describe 'GET /index' do
    it 'Should return a list of monitors' do
      create(:site_monitor)
      get '/site_monitors'
      expect(response).to have_http_status(:success)
      expect(JSON.parse(response.body).size).to eq(1)
    end
  end
end
