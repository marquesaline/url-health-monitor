class SiteMonitorsController < ApplicationController
    before_action :set_site_monitor, only: [:show]
    
    # GET /site_monitors
    def index 
      render json: SiteMonitor.all
    end
  
    # GET /site_monitors/:id
    def show
      render json: @site_monitor
    end
  
    private
    
 
    def set_site_monitor
      @site_monitor = SiteMonitor.find_by(id: params[:id]) 
      return render json: { message: 'Site monitor not found' }, status: :not_found unless @site_monitor
    end
  end
  