async function fetchData(endpoint) {
  try {
    const response = await fetch(endpoint)
    if (!response.ok) {
      throw new Error('Network response was not ok')
    }

    const data = await response.json()
    return data
  } catch (error) {
    console.error('Error fetching products:', error)
    throw error
  }
}

export async function fetchProducts(
  page,
  category,
  nameFilter,
  alfOrder,
  priceOrder
) {
  let endpoint = `/products?page=${page}`

  if (alfOrder) {
    endpoint = `/products?sort_order=${alfOrder}&page=${page}`
  } else if (category) {
    endpoint = `/products?category_id=${category}&page=${page}`
  } else if (nameFilter) {
    endpoint = `/products?name=${nameFilter}&page=${page}`
  } else if (priceOrder) {
    endpoint = `/products?sort_by_price=${priceOrder}&page=${page}`
  }

  return fetchData(endpoint)
}

export async function fetchFilteredProducts(category_id) {
  try {
    const response = await fetch(`/products?category_id=${category_id}&page=1`)
    if (!response.ok) {
      throw new Error('Network response was not ok')
    }

    const data = await response.json()
    return data
  } catch (error) {
    console.error('Error fetching products:', error)
    throw error
  }
}

export async function fetchFavorite() {
  try {
    const response = await fetch('/favorite')
    if (!response.ok) {
      throw new Error('Network response was not ok')
    }

    const data = await response.json()
    return data
  } catch (error) {
    console.error('Error fetching favorite:', error)
    throw error
  }
}

export async function fetchRandom() {
  try {
    const response = await fetch('/random_products')
    if (!response.ok) {
      throw new Error('Network response was not ok')
    }

    const data = await response.json()
    return data
  } catch (error) {
    console.error('Error fetching random product:', error)
    throw error
  }
}

export async function fetchCategories() {
  try {
    const response = await fetch('/categories')
    if (!response.ok) {
      throw new Error('Network response was not ok')
    }

    const data = await response.json()
    return data
  } catch (error) {
    console.error('Error fetching favorite:', error)
    throw error
  }
}

export async function fetchLogo() {
  try {
    const response = await fetch('/logo')
    if (!response.ok) {
      throw new Error('Network response was not ok')
    }

    const data = await response.json()
    return data
  } catch (error) {
    console.error('Error fetching logo:', error)
    throw error
  }
}

export async function fetchSingleProduct(id) {
  try {
    const response = await fetch(`/products/${id}`)
    if (!response.ok) {
      throw new Error('Network response was not ok')
    }

    const data = await response.json()
    return data
  } catch (error) {
    console.error('Error fetching product:', error)
    throw error
  }
}
