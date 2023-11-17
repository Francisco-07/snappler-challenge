class Admin::TagsController < ApplicationController
  before_action :set_tag, only: [:show, :edit, :update, :destroy]

  def index
    @tags = Tag.paginate(page: params[:page])
  end

  def show
  end

  def new
    @tag = Tag.new
  end

  def edit
  end

  def create
    @tag = Tag.new(tag_params)
    if @tag.save
      redirect_to admin_tags_url, notice: 'Tag creado.'
    else
      flash[:alert] = 'No pudo crearse el tag'
      render :new
    end
  end

  def update
    respond_to do |format|
      if @tag.update(tag_params)
        format.html { redirect_to admin_tags_url, notice: "El tag fue actualizada." }
        format.json { render :index, status: :ok, location: @tag }
      else
        format.html { render :edit, status: :unprocessable_entity, error: 'No se pudo actualizadar.' }
        format.json { render json: @tag.errors, status: :unprocessable_entity }
      end
    end
  end

  def destroy
    @tag = Tag.find(params[:id])
    if @tag.destroy
      flash[:notice] = "Tag removido."
    else
      flash[:alert] = "Tag asignado a un producto"
    end
    redirect_to admin_tags_path
  end
  

  private

  def set_tag
    @tag = Tag.find(params[:id])
  end

  def tag_params
    params.require(:tag).permit(:tagname)
  end
end
