class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception

  def after_sign_in_path_for(resource)
    admin_dashboards_path
  end

  def current_ability
    @current_ability ||= Ability.new(current_admin)
  end
end
