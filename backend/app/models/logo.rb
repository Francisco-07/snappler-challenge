class Logo < ApplicationRecord
    has_one_attached :file 
    validate :file_presence

    private
  
    def file_presence
      if !file.attached?
        errors.add(:file, 'debe adjuntar un archivo')
      end
    end
  end