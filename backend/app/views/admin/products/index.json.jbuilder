json.array! @products do |product|
  json.id product.id
  json.name product.name
  json.description product.description
  json.price product.price
  json.category product.category
  json.active product.active
  json.image_links product.images.map { |image| url_for(image) }
  json.tags product.tags.map { |tag| { id: tag.id, tagname: tag.tagname } }
end