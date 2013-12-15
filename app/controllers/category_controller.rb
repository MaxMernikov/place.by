class CategoryController < ApplicationController
  def show
    category = Category.find_by(slug: params[:id])
    # render json: category.to_json(include: :places)
    respond_to do |format|
      format.html { render nil }
      format.json { render json: category.places.to_json }
    end
  end
end
