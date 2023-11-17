class ApplicationController < ActionController::Base
    before_action :authorize_admin!, if: :admin_controller?

    private
  
    def admin_controller?
      controller_path.start_with?('admin/')
    end
  
    def authorize_admin!
      unless current_user.admin?
        redirect_to root_path, alert: 'Necesitas ser admin para esta accion'
      end
    end
end
