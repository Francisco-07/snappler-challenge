class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable, and :omniauthable
  self.per_page = 4
  validates :user_name, presence: true, uniqueness: true, length: { minimum: 2, maximum: 255 }
  # Configure Devise with the authentication key as :user_name
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable, authentication_keys: [:user_name]

  # Other model code...
end
