set :stage, :production
set :branch, 'master'
set :deploy_to, '/www/plce.by/'
set :rails_env, 'production'

role :app, %w{root@162.243.33.247}
role :web, %w{root@162.243.33.247}
role :db,  %w{root@162.243.33.247}

server '162.243.33.247', user: 'root', roles: %w{app web db}
