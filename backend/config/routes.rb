Rails.application.routes.draw do
  resources :vehicles
  resources :customers do
    collection do
      get 'search_by_job_id/:job_id', to: 'customers#search_by_job_id'
    end
  end

  require 'sidekiq/web'
  mount Sidekiq::Web => '/sidekiq'
end
