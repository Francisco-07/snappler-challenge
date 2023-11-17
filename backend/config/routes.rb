Rails.application.routes.draw do
  namespace :admin do
    get 'image_groups/index'
    get 'image_groups/show'
    get 'configuracion_sitio', to: 'configuracion_sitio#index'
    resources :users
    resources :products
    resources :categories
    resources :tags
    resource :logos, only: [:edit, :update, :destroy, :show]
    resources :image_groups
    resources :products do
      member do
        delete 'remove_image/:image_id', to: 'products#remove_image', as: 'remove_image'
        delete 'remove_main_image/:main_image_id', to: 'products#remove_main_image', as: 'remove_main_image'
      end
    end
    resources :image_groups do
      member do
        get 'view', to: 'image_groups#view'
        post 'select', to: 'image_groups#select'
        patch :update, to: 'image_groups#update'
        delete :remove_image, to: 'image_groups#remove_image'
      end
      get 'favorite_image_group', on: :collection, to: 'image_groups#show_favorite', defaults: { format: :json }
    end
  end
  get 'tags', to: 'public_routes#show_tags', defaults: { format: :json }
  get 'categories', to: 'public_routes#show_categories', defaults: { format: :json }
  get 'logo', to: 'public_routes#show_logo', defaults: { format: :json }
  get 'favorite', to: 'public_routes#show_favorite', defaults: { format: :json }
  get 'products', to: 'public_routes#products', defaults: { format: :json }
  get 'products/:id', to: 'public_routes#show_product', defaults: { format: :json }
  get 'random_products', to: 'public_routes#random_products', defaults: { format: :json }
  get 'total_pages', to: 'public_routes#total_pages', defaults: { format: :json }
  get 'pages/home'
  root to: 'pages#home' 
  devise_for :users, controllers: {
  registrations: 'users/registrations'
}

end
