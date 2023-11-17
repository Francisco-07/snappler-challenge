// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, or any plugin's
// vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file. JavaScript code in this file should be added after the last require_* statement.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require rails-ujs
//= require activestorage
//= require turbolinks
//= require_tree .

document.addEventListener('DOMContentLoaded', function () {
  const sidebar = document.getElementById('sidebar')

  openButton.addEventListener('click', function () {
    if (sidebar.style.left === '0px') {
      // Cierra el sidebar
      sidebar.style.left = '-250px'
      content.classList.remove('sidebar-open')
    } else {
      // Abre el sidebar
      sidebar.style.left = '0px'
      content.classList.add('sidebar-open')
    }
  })
})

document.addEventListener('DOMContentLoaded', function () {
  setTimeout(function () {
    var flashMessages = document.getElementById('flash-messages')
    var productFlashMessages = document.getElementById('product-flash-messages')
    if (flashMessages || productFlashMessages) {
      flashMessages.remove()
      productFlashMessages.remove()
    }
  }, 2500)
})

document.addEventListener('turbolinks:load', function () {
  const sidebar = document.getElementById('sidebar')
  const toggleButton = document.getElementById('toggleSidebar')

  toggleButton.addEventListener('click', function () {
    if (sidebar.style.left === '0px') {
      sidebar.style.left = '-250px'
    } else {
      sidebar.style.left = '0px'
    }
  })
})
