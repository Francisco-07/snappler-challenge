class Admin::ConfiguracionSitioController < ApplicationController
    def index
      @logo = Logo.find_by(name: 'logo')
      @image_groups = ImageGroup.paginate(page: params[:page], per_page: 4)
    end
  end