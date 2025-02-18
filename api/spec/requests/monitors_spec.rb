require 'rails_helper'

RSpec.describe 'Monitors API', type: :request do
  describe 'GET /monitors' do
    it 'Should return a list of monitors' do
      get '/monitors'
      expect(response).to have_http_status(:success)
    end
  end
end
