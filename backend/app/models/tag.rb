class Tag < ApplicationRecord
    has_and_belongs_to_many :products
    validates :tagname, presence: true, uniqueness: true, length: { minimum: 2, maximum: 255 }
    before_destroy :ensure_not_referenced_by_products

    self.per_page = 4 
    
    private
  
    def ensure_not_referenced_by_products
      unless products.empty?
        throw :abort
      end
    end
  end
