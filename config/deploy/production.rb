set :stage, :production
set :branch, 'master'
set :deploy_to, '~/www/plce.by/'
set :rails_env, 'production'

role :app, %w{root@95.85.12.211}
role :web, %w{root@95.85.12.211}
role :db,  %w{root@95.85.12.211}

server '95.85.12.211', user: 'root', roles: %w{app web db}
