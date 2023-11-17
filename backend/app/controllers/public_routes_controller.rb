class PublicRoutesController < ApplicationController
def products
  @products = Product.filtered_and_sorted(params).where(active: 1)
  render json: {
    products: @products.map do |product|
      product_data = product.as_json
      product_data[:image_links] = product.images.map { |image| url_for(image) }
      product_data[:main_image_link] = url_for(product.main_image) if product.main_image.attached?
      product_data[:taginfo] = product.tags.map { |tag| { name: tag.tagname, id: tag.id } }
      product_data[:category_name] = product.category.name
      product_data
    end,
    total_pages: @products.total_pages 
  }
end

def show_product
    @product = Product.find(params[:id])
  product_data = @product.as_json
  product_data[:category_name] = @product.category.name
  product_data[:image_links] = @product.images.map { |image| url_for(image) }
  product_data[:main_image_link] = url_for(@product.main_image) if @product.main_image.attached?
  product_data[:taginfo] ={name: @product.tags.pluck(:tagname), id: @product.tags.ids}
  render json: { product: product_data }
  end


  def random_products
      random_products = Product.where(active: 1).order('RANDOM()').limit(4)
  
      response = random_products.map do |product|
        product_data = product.as_json
        product_data[:image_links] = product.images.map { |image| url_for(image) }
        product_data[:main_image_link] = url_for(product.main_image) if product.main_image.attached?
        product_data[:taginfo] = product.tags.map { |tag| { name: tag.tagname, id: tag.id } }
        product_data[:category_name] = product.category.name
        product_data
      end
  
      render json: { products: response }
    end
  
  

  def show_favorite
    @favorite_image_group = ImageGroup.find_by(is_favorite: true)

    if @favorite_image_group
      respond_to do |format|
        format.html { render :show } 

        format.json do
          json_data = {
            id: @favorite_image_group.id,
            name: @favorite_image_group.name,
            images: @favorite_image_group.images.map { |image| url_for(image) } 
          }

          render json: json_data
        end
      end
    else
      flash[:alert] = 'No se encontro ningun grupo de imagenes.'
      redirect_to admin_configuracion_sitio_path
    end
  end

  def show_logo
    @logo = Logo.find_or_initialize_by(name: 'logo')
    @logo_image_url = url_for(@logo.file) if @logo.file.attached?
  
    respond_to do |format|
      format.html { render :show }
      format.json { render json: { logo: @logo, image_url: @logo_image_url } }
    end
  end

  def show_categories
    @categories = Category.all
    render json: {
      categories: @categories.map { |category| category.as_json }
    }
  end
  def show_tags
    @tags = Tag.all
    render json: {
      tags: @tags.map { |tag| tag.as_json }
    }
  end
end
