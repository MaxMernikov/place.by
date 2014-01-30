set :stage, :production
set :branch, 'develop'
set :deploy_to, '/var/www/plce.by'
set :rails_env, 'production'

role :app, %w{root@82.196.1.8}
role :web, %w{root@82.196.1.8}
role :db,  %w{root@82.196.1.8}

server '82.196.1.8', user: 'root', roles: %w{app web db}
