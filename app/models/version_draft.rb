class VersionDraft < ActiveRecord::Base
  serialize :object, Hash

  belongs_to :item, polymorphic: true
  scope :not_approved, -> { where(approved: false) }

end
