class CategoriesController < ApplicationController
  def index
    render :blank
  end

  def show
    category = Category.find_by(slug: params[:id])
    respond_to do |format|
      format.html { render :blank }
      format.json { render json: category.to_json(only: [:title, :slug], include: :places, methods: [:elements_count, :hash]) }
    end
  end
end
