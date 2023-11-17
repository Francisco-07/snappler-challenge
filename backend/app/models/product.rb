class Product < ApplicationRecord
   # Validaciones
   validates :name, presence: true, uniqueness: true, if: :name_changed?, length: { minimum: 2, maximum: 255 }
   validates :description, presence: true
   validate :at_least_one_tag_selected
   validate :main_image_presence_on_create, on: :create
   validate :category_must_be_present

   # Atributos por defecto
   attribute :price, default: 0.0
   attribute :cost, default: 0.0
   attribute :active, default: true
 
  # Asociaciones
  belongs_to :category
  has_and_belongs_to_many :tags
  has_many_attached :images
  has_one_attached :main_image

  # generate internal code
  before_create :generate_unique_code

  HUMANIZED_ATTRIBUTES = {
    :name => "Nombre", 
    :description => "Descripcion",
    :images => "",
    :tags => "",
    :category => "",
    :main_image => "",
}


def category_must_be_present
  if category_id.blank?
    errors.add(:category, "Selecciona una categoria.")
  end
end

def self.human_attribute_name(attr, options={})
  HUMANIZED_ATTRIBUTES[attr.to_sym] || super
end
  

def self.filtered_and_sorted(params)
  begin
    retries = 10  # Número de intentos permitidos en caso de error de la base de datos
    includes(:images).all
    products = includes(:tags).paginate(page: params[:page], per_page: 12)

    if params[:sort_by_price].present?
      products = products.sort_by_price(params[:sort_by_price])
    end

    if params[:category_id].present?
      products = products.filter_by_category(params[:category_id])
    end

    if params.dig(:product, :tag_ids).is_a?(Array)
      tag_ids = params.dig(:product, :tag_ids).reject(&:empty?)
      products = products.filter_by_tags(tag_ids) if tag_ids.any?
    end

    if params[:name].present?
      products = products.filter_by_name(params[:name])
    end

    if params[:sort_by_creation] == "newest_first"
      products = products.sort_by_creation("newest_first")
    elsif params[:sort_by_creation] == "oldest_first"
      products = products.sort_by_creation("oldest_first")
    end

    if params[:sort_order] == "asc"
      products = products.sort_by_name("asc")
    elsif params[:sort_order] == "desc"
      products = products.sort_by_name("desc")
    end

    return products
  rescue ActiveRecord::StatementInvalid => e
    Rails.logger.error("Error en la consulta de la base de datos: #{e.message}")
    Rails.logger.error(e.backtrace.join("\n"))
    if retries > 0
      retries -= 1
      sleep(1) # Agregar una pausa antes de intentar nuevamente
      retry
    else
      raise e  # Vuelve a lanzar la excepción en caso de agotar los intentos
    end
  end
end


# scope
scope :sort_by_price, ->(order) { order(price: (order == 'desc' ? :desc : :asc)) if order.present? }
scope :filter_by_category, ->(category_id) { where(category_id: category_id) if category_id.present? }
scope :filter_by_tags, ->(tag_ids) { joins(:tags).where(tags: { id: tag_ids }).distinct if tag_ids.is_a?(Array) && tag_ids.any? }
scope :filter_by_name, ->(name) { where("name LIKE ?", "%#{name}%") if name.present? }
scope :sort_by_creation, ->(order) { order(created_at: (order == "newest_first" ? :desc : :asc)) if order.present? }
scope :sort_by_name, ->(order) { order(name: (order == "asc" ? :asc : :desc)) if order.present? }

  private

  def generate_unique_code
    loop do
      self.internal_code = SecureRandom.hex(4).upcase
      break unless Product.exists?(internal_code: self.internal_code)
    end
  end
 
  def at_least_one_tag_selected
    if tag_ids.blank?
      errors.add(:base, "Almenos un tag debe ser seleccionado.")
    end
  end  
  def main_image_presence_on_create
    if  !main_image.attached?
      errors.add(:main_image, "Debe haber almenos una imagen principal")
    end
  end
end
