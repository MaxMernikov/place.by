class Admin::DashboardsController < ApplicationController
  layout 'admin'

  def index
    unless current_admin.present?
      redirect_to new_admin_session_path
    end
  end
end
