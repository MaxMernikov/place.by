class CategoriesController < ApplicationController
  def index

  end

  def show
    category = Category.find_by(slug: params[:id])
    # render json: category.to_json(include: :places)
    respond_to do |format|
      format.html { render :blank }
      format.json { render json: category.places.to_json }
    end
  end
end
