set :application, 'plce'
set :repo_url, 'git@github.com:MaxMernikov/place.by.git'

set :deploy_to, '/var/www/plce.by'
set :scm, :git
set :user, 'root'
set :ssh_options, { :forward_agent => true }
set :rails_env, 'staging'
set :deploy_via, :copy

set :keep_releases, 5

set :linked_dirs, %w{bin log tmp/pids tmp/cache tmp/sockets vendor/bundle public/system}

set :bundle_gemfile, -> { release_path.join('Gemfile') }
set :bundle_dir, -> { shared_path.join('bundle') }
set :bundle_flags, '--deployment --quiet'
set :bundle_without, %w{development test}.join(' ')
set :bundle_binstubs, -> { shared_path.join('bin') }
set :bundle_roles, :all
