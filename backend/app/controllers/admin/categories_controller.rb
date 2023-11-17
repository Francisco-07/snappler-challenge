class Admin::CategoriesController < ApplicationController
  before_action :set_category, only: %i[show edit update destroy]

  def index
    @categories = Category.paginate(page: params[:page])
  end

  def show
  end

  def new
    @category = Category.new
  end

  def edit
  end

  def create
    @category = Category.new(category_params)

    respond_to do |format|
      if @category.save
        flash[:notice] = 'La categoria fue creada.'
        format.html { redirect_to admin_categories_url }
        format.json { render :index, status: :created, location: @category }
      else
        flash[:alert] = 'No se pudo crear la categoria.'
        format.html { render :new, status: :unprocessable_entity }
        format.json { render json: @category.errors, status: :unprocessable_entity }
      end
    end
  end

  def update
    respond_to do |format|
      if @category.update(category_params)
        format.html { redirect_to admin_categories_url, notice: 'La categoria fue actualizada.' }
        format.json { render :index, status: :ok, location: @category }
      else
        format.html { render :edit, status: :unprocessable_entity, alert: 'No se pudo actualizadar.' }
        format.json { render json: @category.errors, status: :unprocessable_entity }
      end
    end
  end

  def destroy
    if @category.destroy
      respond_to do |format|
        format.html { redirect_to admin_categories_url, notice: 'Categoría removida.' }
        format.json { head :no_content }
      end
    else
      respond_to do |format|
        format.html { redirect_to admin_categories_url, alert: 'Error al remover la categoría.' }
        format.json { head :unprocessable_entity }
      end
    end
  end

  private

  def set_category
    @category = Category.find(params[:id])
  rescue ActiveRecord::RecordNotFound
    flash[:alert] = 'Categoria no encontrada.'
    redirect_to admin_categories_url
  end

  def category_params
    params.require(:category).permit(:name)
  end
end
