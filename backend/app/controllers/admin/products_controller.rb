class Admin::ProductsController < ApplicationController
    before_action :set_product, only: [:show, :edit, :update, :destroy]

    def index
      @products = Product.filtered_and_sorted(params)
    end
  
    def show
      @product = Product.find(params[:id])
    end
  
    def new
      @product = Product.new
    end
  
    def edit
    end
  
    def create
      @product = Product.new(product_params)
  
      @product.tags = Tag.where(id: params[:product][:tag_ids])
  
      if @product.save
        redirect_to admin_products_path, notice: "El producto fue creado con exito."
      else
        render :new, alert: "El producto no pudo ser creado."
      end
    end
  
    def update
      @product.category = Category.find(params[:product][:category_id])
      @product.tags = Tag.where(id: params[:product][:tag_ids])
  
      if @product.update(product_params)
        redirect_to admin_products_path, notice: "El producto fue actualizado con exito."
      else
        render :edit, alert: "El producto no pudo ser actualizado."
      end
    end
  

    def remove_image
      @product = Product.find(params[:id])
      image = @product.images.find(params[:image_id])
    
      if image.purge
        redirect_to edit_admin_product_path(@product), notice: 'Imagen removida con éxito.'
      else
        redirect_to edit_admin_product_path(@product), alert: 'Error al remover la imagen.'
      end
    rescue ActiveRecord::RecordNotFound
      redirect_to edit_admin_product_path(@product), alert: 'La imagen no pudo ser encontrada.'
    end

def remove_main_image
  @product = Product.find(params[:id])

  if @product.main_image.attached?
    if @product.main_image.purge
      redirect_to edit_admin_product_path(@product), notice: 'Imagen removida con éxito.'
    else
      redirect_to edit_admin_product_path(@product), notice: 'Imagen removida con éxito.'
    end
  else
    redirect_to edit_admin_product_path(@product), alert: 'La imagen no pudo ser encontrada.'
  end
rescue ActiveRecord::RecordNotFound
  redirect_to edit_admin_product_path(@product), alert: 'Product not found.'
end

    
  
    def destroy
      if @product.destroy
        redirect_to admin_products_url, notice: 'Producto removido con éxito.'
      else
        redirect_to admin_products_url, alert: 'Error al remover el producto.'
      end
    end
    
    private
  
    def set_product
      @product = Product.find(params[:id])
    end
  
    def product_params
      params.require(:product).permit(:name, :description, :internal_code,:main_image, :price, :cost, :active, :category_id, :sort_by_price, tag_ids: [], images: [])
    end
  end
  