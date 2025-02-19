require 'rails_helper'

RSpec.describe 'SiteMonitors', type: :request do
  let!(:site_monitor) { create(:site_monitor) }
  let(:site_monitor_id) { site_monitor.id }
  let(:headers) { { 'Authorization' => ActionController::HttpAuthentication::Basic.encode_credentials('admin', 'supersecurepassword') } }
  
  describe 'GET /site_monitors' do
    it 'Should return a list of site monitors' do
      get '/site_monitors', headers: headers
      expect(response).to have_http_status(:success)
    
      parsed_response = JSON.parse(response.body)
      expect(parsed_response).not_to be_empty
      expect(parsed_response.first).to include('id', 'name', 'url', 'status')
    end
    
  end

  describe 'GET /site_monitors/:id' do
    it 'Should return a site monitor' do
      get "/site_monitors/#{site_monitor_id}", headers: headers
      expect(response).to have_http_status(:success)
      expect(JSON.parse(response.body)['id']).to eq(site_monitor_id)
    end

    it 'Should return status 404' do
      get '/site_monitors/9999', headers: headers
      expect(response).to have_http_status(:not_found)
      parsed_response = JSON.parse(response.body)
      expect(parsed_response['error']).to eq('Site monitor not found')

    end

    it 'Should return a site monitor with checks' do
      site_monitor = create(:site_monitor)
      create_list(:check, 3, site_monitor: site_monitor)
      
      get "/site_monitors/#{site_monitor.id}", headers: headers
      expect(response).to have_http_status(:success)
      parsed_response = JSON.parse(response.body)
      expect(parsed_response['checks'].size).to eq(3)
    end
    
  end

  describe 'POST /site_monitors' do
    let(:valid_attributes) do 
      { 
        name: 'Test', 
        url: 'http://test.com', 
        check_interval: 5,
        status: 'up',
        user_id: 1
      } 
    end

    let(:invalid_attributes) do
      {
        name: 'Test',
        url: 'http://test.com',
        check_interval: 1,
        status: 'up',
        user_id: 1
      }
    end

    it 'Should create a site monitor' do
      post '/site_monitors', params: valid_attributes, headers: headers
      expect(response).to have_http_status(:created)
      expect(JSON.parse(response.body)['name']).to eq('Test')
    end

    it 'Should return status 422' do
      post '/site_monitors', params: invalid_attributes, headers: headers
      expect(response).to have_http_status(:unprocessable_entity)
      parsed_response = JSON.parse(response.body)
      expect(parsed_response['check_interval']).to include('must be greater than or equal to 5')
    end
  end

  describe 'PUT /site_monitors/:id' do
    let(:valid_attributes) do
      { name: 'Test' }
    end

    it 'Should update a site monitor' do
      put "/site_monitors/#{site_monitor_id}", params: valid_attributes, headers: headers
      expect(response).to have_http_status(:success)
      expect(JSON.parse(response.body)['name']).to eq('Test')
    end

    it 'Should return status 404' do
      put '/site_monitors/9999', params: valid_attributes, headers: headers
      expect(response).to have_http_status(:not_found)
      parsed_response = JSON.parse(response.body)
      expect(parsed_response['error']).to eq('Site monitor not found')
    end
  end

  describe 'DELETE /site_monitors/:id' do
    it 'Should delete a site monitor' do
      delete "/site_monitors/#{site_monitor_id}", headers: headers
      expect(response).to have_http_status(:no_content)
    end

    it 'Should return status 404' do
      delete '/site_monitors/100', headers: headers
      expect(response).to have_http_status(:not_found)
      parsed_response = JSON.parse(response.body)
      expect(parsed_response['error']).to eq('Site monitor not found')

    end
  end

  describe '#uptime_percentage' do
    it 'returns 100% when all checks are successful' do
      create_list(:check, 5, site_monitor: site_monitor, success: true)
      expect(site_monitor.uptime_percentage).to eq(100.0)
    end

    it 'returns 50% when half of the checks failed' do
      create_list(:check, 3, site_monitor: site_monitor, success: true)
      create_list(:check, 3, site_monitor: site_monitor, success: false)
      expect(site_monitor.uptime_percentage).to eq(50.0)
    end

    it 'returns 0% when there are no successful checks' do
      create_list(:check, 5, site_monitor: site_monitor, success: false)
      expect(site_monitor.uptime_percentage).to eq(0.0)
    end
  end

  describe '#average_response_time' do
    it 'calculates the correct average response time' do
      create(:check, site_monitor: site_monitor, response_time: 100, success: true)
      create(:check, site_monitor: site_monitor, response_time: 200, success: true)
      create(:check, site_monitor: site_monitor, response_time: 300, success: true)

      expect(site_monitor.average_response_time).to eq(200.0)
    end

    it 'returns 0 when there are no successful checks' do
      create_list(:check, 3, site_monitor: site_monitor, response_time: 500, success: false)
      expect(site_monitor.average_response_time).to eq(0.0)
    end
  end
end

