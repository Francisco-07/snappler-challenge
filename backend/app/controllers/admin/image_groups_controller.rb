class Admin::ImageGroupsController < ApplicationController
  before_action :set_image_group, only: [:show, :edit, :update, :destroy]

  def index
    @image_groups = ImageGroup.all
  end

  def show
    respond_to do |format|
      format.html 
      format.json { render json: @image_group, include: { images: { methods: :image_links } } }
    end
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

  def remove_image
    @image_group = ImageGroup.find(params[:id])
    image = @image_group.images.find(params[:image_id])
  
    if image.purge
      flash[:notice] = 'Imagen removida con éxito.'
      redirect_to edit_admin_image_group_path(@image_group)
    else
      flash[:alert] = 'Error al remover la imagen.'
      redirect_to edit_admin_image_group_path(@image_group)
    end
  rescue ActiveRecord::RecordNotFound
    redirect_to edit_admin_product_path(@product), alert: 'La imagen no pudo ser encontrada.'
  end
  

  def view
    respond_to do |format|
      format.html 
      format.json { render json: @image_group.images }
    end
  end

  def new
    @image_group = ImageGroup.new
  end

  def select
    if set_favorite_image_group
      flash[:notice] = 'Grupo de imagenes marcado como favorito'
    else
      flash[:alert] = 'Grupo de imagenes no encontrado'
    end

    redirect_to admin_configuracion_sitio_path
  end

  def create
    @image_group = ImageGroup.new(image_group_params)
  
    if @image_group.save
      redirect_to admin_configuracion_sitio_path, notice: 'Grupo de imágenes creado con éxito.'
    else
        flash.now[:alert] = 'elija una imagen y nombre'
        render :new
    end
  end
  

  def edit
    @images = @image_group.images
  end

  def update
    if @image_group.update(image_group_params)
      redirect_to admin_configuracion_sitio_path, notice: 'Grupo de imágenes fue actualizado con éxito.'
    else
      flash[:alert] = 'Error al editar el grupo de imágenes.'
      render 'edit'
    end
  end
  

  def destroy
    begin
      @image_group.destroy
      redirect_to admin_configuracion_sitio_path, notice: 'Grupo de imágenes removido con éxito.'
    rescue StandardError => e
      redirect_to admin_configuracion_sitio_path, alert: "Error al remover el grupo de imágenes: #{e.message}"
    end
  end

  private

  def set_image_group
    @image_group = ImageGroup.find(params[:id])
  end

  def set_favorite_image_group
    @image_group = ImageGroup.find(params[:id])
    return false unless @image_group
    ImageGroup.where(is_favorite: true).update_all(is_favorite: false)

    @image_group.update(is_favorite: true)

    true
  end

  def image_group_params
    params.require(:image_group).permit(:name, images: [])
  end
end
