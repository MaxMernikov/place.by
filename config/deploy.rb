set :application, 'plce.by'
set :repo_url, 'git@github.com:MaxMernikov/place.by.git'

set :deploy_to, '/www/plce.by'
set :scm, :git
set :user, 'root'
set :ssh_options, { :forward_agent => true }
# set :rails_env, 'staging'
set :deploy_via, :copy

set :keep_releases, 5

set :linked_dirs, %w{bin log tmp/pids tmp/cache tmp/sockets vendor/bundle public/system}

set :bundle_gemfile, -> { release_path.join('Gemfile') }
set :bundle_dir, -> { shared_path.join('bundle') }
set :bundle_flags, '--deployment --quiet'
set :bundle_without, %w{development test}.join(' ')
set :bundle_binstubs, -> { shared_path.join('bin') }
set :bundle_roles, :all

namespace :deploy do

  desc 'Restart application'
  task :restart do
    on roles(:app) do
      within release_path do
        # with rails_env: fetch(:stage) do
          # rake 'resque:restart_workers'
          # execute "thin restart -p 3000 -s1 -e production"
        # end
      end
    end

    # on roles(:app), in: :sequence, wait: 5 do
    #   within release_path do
    #     execute "thin restart -p 3000 -s1 -e production"
    #   end
    # end
  end
end