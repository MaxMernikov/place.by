module VersionHelper
  def version_count(type, id)
    VersionDraft.where(item_type: type, item_id: id).size - 1
  end
end
