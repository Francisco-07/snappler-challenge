require_relative 'boot'

require 'rails/all'

Bundler.require(*Rails.groups)

module Backend
  class Application < Rails::Application
    config.i18n.default_locale = :es
  end
end
