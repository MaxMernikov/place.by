PlaceBy::Application.routes.draw do

  devise_for :admins, skip: [:registrations, :passwords]
  namespace :admin do
    resources :dashboards, path: '', only: [:index]
    resources :categories
    resources :places
    resources :version_drafts
    resources :pops
  end

  get 'partials/:model/:view' => 'partial#show', as: :partial

  resources :categories, path: '', only: [:show] do
    resources :place, path: '', only: [:show, :update]
  end

  root 'home#index'

end