class Admin::VersionDraftsController < ApplicationController
  layout 'admin'
  before_action :set_version, only: [:edit, :update, :destroy]

  def index
    @versions = VersionDraft.not_approved
  end

  def new
    @version = VersionDraft.new
  end

  def show
  end

  def edit
    get_new_version
    get_current_version
    # @item = @version.item.get_current

    # # @version_item = item.@version.
    # @version_item = VersionDraft.find(params[:id]).reify
    # @item = @version_item.get_current

    # .next_version
  end

  def create
    @version = VersionDraft.new(version_params)

    if @version.save
      redirect_to admin_versions_path, notice: 'VersionDraft was successfully created.'
    else
      render action: 'new'
    end
  end

  def update
    get_current_version
    get_new_version
    if @new_version.update(params[@version.item_type.underscore.to_sym].to_h)
      @version.destroy
      redirect_to admin_version_drafts_path, notice: 'Изменения добавлены'
    else
      render action: 'edit'
    end
  end

  def destroy
    @version.destroy
    redirect_to admin_version_drafts_path
  end

private
  def get_current_version
    @current_version = @version.item_type.classify.constantize.find(@version.item_id)
  end

  def get_new_version
    @new_version = @version.item
    @new_version.attributes = @version.object.to_h
  end

  def set_version
    @version = VersionDraft.find(params[:id])
  end

  def version_params
    params.require(:version).permit(:category_id, :title, :address, :address_comment, :description, :network, :time_work, contacts_attributes: [:id, :contact_type, :num, :comment, :_destroy], services_attributes: [:id, :title, :cost, :_destroy])
  end

end
