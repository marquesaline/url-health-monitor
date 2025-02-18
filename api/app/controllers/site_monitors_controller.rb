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

    def create
        site_monitor = SiteMonitor.new(site_monitor_params)
        if site_monitor.save
            render json: site_monitor, status: :created
        else
            render json: site_monitor.errors, status: :unprocessable_entity
        end
    end
  
    private
    
 
    def set_site_monitor
      @site_monitor = SiteMonitor.find_by(id: params[:id]) 
      return render json: { message: 'Site monitor not found' }, status: :not_found unless @site_monitor
    end

    def site_monitor_params
        params.permit(:name, :url, :check_interval, :status, :user_id)
    end
  end
  