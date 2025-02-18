class SiteMonitorsController < ApplicationController
    before_action :set_site_monitor, only: [:show, :update, :destroy]
    
    # GET /site_monitors
    def index 
      render json: SiteMonitor.all
    end
  
    # GET /site_monitors/:id
    def show
      render json: @site_monitor, include: :checks
    end

    def create
        site_monitor = SiteMonitor.new(site_monitor_params)
        if site_monitor.save
            render json: site_monitor, status: :created
        else
            render json: site_monitor.errors, status: :unprocessable_entity
        end
    end

    def update
        if @site_monitor.update(site_monitor_params)
            render json: @site_monitor
        else
            render json: @site_monitor.errors, status: :unprocessable_entity
        end
    end

    def destroy
        @site_monitor.destroy
        head :no_content
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
  