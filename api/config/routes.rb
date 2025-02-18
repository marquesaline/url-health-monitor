Rails.application.routes.draw do
  resources :site_monitors, only: [:index]
end
