PlaceBy::Application.routes.draw do
  namespace :admin do
    resources :dashboards, path: '', except: [:show]
    resources :categories
    resources :places
    resources :version_drafts
  end

  get 'partials/:model/:view' => 'partial#show', as: :partial

  resources :categories, path: '', only: [:show] do
    resources :place, path: '', only: [:show, :update]
  end

  root 'home#index'

end