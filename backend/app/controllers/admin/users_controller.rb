class Admin::UsersController < ApplicationController
  before_action :find_user, only: [:edit, :update, :show]

  def index
    @users = User.paginate(page: params[:page])
  end


  def show
    @user = User.find(params[:id])
  end

  def new
    @user = User.new
  end

  def create
    @user = User.new(user_params)
    if @user.save
      redirect_to admin_users_path, notice: 'Usuario creado con éxito.'
    else
      flash[:alert] = 'Error al crear usuario'
      render :new
    end
  end

  def edit
    @user = User.find(params[:id])
    if @user == current_user
      @require_current_password = true
    else
      @require_current_password = false
    end
  end
  
  def update
    @user = User.find(params[:id])
    
    if @user == current_user && params[:user][:current_password].present?
      if @user.valid_password?(params[:user][:current_password])
        if @user.update(user_params.except(:current_password))
          redirect_to root_path, notice: 'Usuario actualizado con éxito.'
        else
          flash[:alert] = 'Hubo un problema al actualizar el usuario.'
          render :edit
        end
      else
        flash[:alert] = 'Contraseña actual incorrecta'
        render :edit
      end
    else
      if @user.update(user_params)
        redirect_to root_path, notice: 'Usuario actualizado con éxito.'
      else
        flash[:alert] = 'Hubo un problema al actualizar el usuario.'
        render :edit
      end
    end
  end
  

  def destroy
    @user = User.find(params[:id])
  
    if @user == current_user
      redirect_to admin_users_path, alert: 'No puedes eliminarte a ti mismo.'
    else
      @user.destroy
      redirect_to admin_users_path, notice: 'Usuario eliminado con éxito.'
    end
  end

  private

  def find_user
    @user = User.find(params[:id])
  end

  def user_params
    permitted = [:user_name, :email, :admin]
    permitted << [:password, :password_confirmation] unless params[:user][:password].blank?
    params.require(:user).permit(permitted)
  end
end
