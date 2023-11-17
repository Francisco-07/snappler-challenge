class Admin::LogosController < ApplicationController
 
  def edit
    @logo = Logo.find_or_initialize_by(name: 'logo')
  end
  
  def show
    @logo = Logo.find_by(name: 'logo')
    @logo_image_url = url_for(@logo.file) if @logo.file.attached?
  
    respond_to do |format|
      format.html { render :show }
      format.json { render json: { logo: @logo, image_url: @logo_image_url } }
    end
  end
  
  

  def update
    @logo = Logo.find_or_initialize_by(name: 'logo')

    if params[:logo].present? && params[:logo][:file].present?
      if @logo.update(logo_params)
        redirect_to admin_configuracion_sitio_path(@logo), notice: 'Logo Actualizado.'
      else
        render :edit
      end
    else
      flash.now[:alert] = 'Selecciona un logo.'
      render :edit
    end
  end

  def destroy
    @logo = Logo.find_by(name: 'logo')
    @logo&.destroy
    redirect_to admin_configuracion_sitio_path, notice: 'Logo eliminado correctamente.'
  end

  private

  def logo_params
    params.require(:logo).permit(:file)
  end
end
