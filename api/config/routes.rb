Rails.application.routes.draw do
  resources :site_monitors, only: [:index, :show, :create, :update, :destroy]
end
