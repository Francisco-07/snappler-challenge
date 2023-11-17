class Category < ApplicationRecord
    has_many :products
    before_destroy :ensure_not_referenced_by_products
    validates :name, presence: true, uniqueness: true, length: { minimum: 2, maximum: 255 }

    self.per_page = 4 

    private
  
    def ensure_not_referenced_by_products
      unless products.empty?
        errors.add(:base, "No puedes eliminar una categoría asociada a productos")
        throw :abort
      end
    end
  end
