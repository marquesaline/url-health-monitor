class ApplicationController < ActionController::API
    include ActionController::HttpAuthentication::Basic::ControllerMethods  

    before_action :authenticate

    private

    def authenticate
        authenticate_or_request_with_http_basic do |username, password|
            username == ENV['VITE_API_USERNAME'] && password == ENV['VITE_API_PASSWORD']
        end
    end
end
