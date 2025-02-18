require 'rails_helper'

RSpec.describe 'SiteMonitors', type: :request do
  let!(:site_monitor) { create(:site_monitor) }
  let(:site_monitor_id) { site_monitor.id }

  describe 'GET /site_monitors' do
    it 'Should return a list of site monitors' do
      get '/site_monitors'
      expect(response).to have_http_status(:success)
      expect(JSON.parse(response.body).size).to eq(1)
    end
  end

  describe 'GET /site_monitors/:id' do
    it 'Should return a site monitor' do
      get "/site_monitors/#{site_monitor_id}"
      expect(response).to have_http_status(:success)
      expect(JSON.parse(response.body)['id']).to eq(site_monitor_id)
    end

    it 'Should return status 404' do
      get '/site_monitors/100'
      expect(response).to have_http_status(:not_found)
      parsed_response = JSON.parse(response.body)
      expect(parsed_response['message']).to eq('Site monitor not found')
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
      post '/site_monitors', params: valid_attributes
      expect(response).to have_http_status(:created)
      expect(JSON.parse(response.body)['name']).to eq('Test')
    end

    it 'Should return status 422' do
      post '/site_monitors', params: invalid_attributes
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
      put "/site_monitors/#{site_monitor_id}", params: valid_attributes
      expect(response).to have_http_status(:success)
      expect(JSON.parse(response.body)['name']).to eq('Test')
    end

    it 'Should return status 404' do
      put '/site_monitors/100', params: valid_attributes
      expect(response).to have_http_status(:not_found)
      parsed_response = JSON.parse(response.body)
      expect(parsed_response['message']).to eq('Site monitor not found')
    end
  end

  describe 'DELETE /site_monitors/:id' do
    it 'Should delete a site monitor' do
      delete "/site_monitors/#{site_monitor_id}"
      expect(response).to have_http_status(:no_content)
    end

    it 'Should return status 404' do
      delete '/site_monitors/100'
      expect(response).to have_http_status(:not_found)
      parsed_response = JSON.parse(response.body)
      expect(parsed_response['message']).to eq('Site monitor not found')
    end
  end
end

