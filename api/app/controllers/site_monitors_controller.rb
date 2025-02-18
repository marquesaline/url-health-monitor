class SiteMonitorsController < ApplicationController

    def index 
        render json: SiteMonitor.all
    end
end
