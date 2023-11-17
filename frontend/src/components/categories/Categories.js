import { fetchCategories } from '../../api/api'
import React, { useState, useEffect } from 'react'
import styled from './categories.module.css'

const Categories = ({ onCategoryChange }) => {
  const [categoriesData, setCategoriesData] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedCategoryId, setSelectedCategoryId] = useState(null)

  useEffect(() => {
    fetchCategories()
      .then((data) => {
        setCategoriesData(data)
        setLoading(false)
      })
      .catch((error) => {
        console.error('Error:', error)
        setLoading(false)
      })
  }, [])

  const handleCategoryChange = (e) => {
    const categoryId = e.target.value
    setSelectedCategoryId(categoryId)
    onCategoryChange(categoryId) // Invoke the callback with the selected category ID
  }

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
          <select
            className={styled.customSelect}
            onChange={handleCategoryChange}
            value={selectedCategoryId || ''}
          >
            <option value=''>Categorias</option>
            {categoriesData.categories?.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
      )}
    </div>
  )
}

export default Categories
