class ImageGroup < ApplicationRecord
  has_many_attached :images 
  validates :name, presence: true, uniqueness: true, length: { minimum: 2, maximum: 255 }
  validate :image_presence_on_create, on: :create

  def image_presence_on_create
    if new_record? && !images.attached?
      errors.add(:images, "Almenos una imagen debe ser seleccionada.")
    end
  end
end