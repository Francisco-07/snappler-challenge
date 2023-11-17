User.destroy_all
admin_user = User.create(user_name: "admin", email: 'admin@example.com', password: '123456', admin: true)
