class PartialController < ApplicationController
  layout false
  def show
    render "partials/#{params[:model]}/#{params[:view]}"
  end
end
