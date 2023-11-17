import styled from './navbar.module.css'
import { Link, useNavigate } from 'react-router-dom'
import { fetchLogo } from '../../api/api'
import React, { useState, useEffect, useContext } from 'react'
import Categories from '../categories/Categories'
import CategoriesContext from '../../context/CategoriesContext'

const Navbar = () => {
  let navigate = useNavigate()
  const [category, categoriesDispatch] = useContext(CategoriesContext)
  const [logo, setLogo] = useState([])
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    fetchLogo()
      .then((data) => {
        setLogo(data)
        setLoading(false)
      })
      .catch((error) => {
        console.error('Error:', error)
        setLoading(false)
      })
  }, [])

  const handleCategoryChange = (categoryId) => {
    categoriesDispatch({ type: 'SET_CATEGORY', payload: categoryId })
    console.log(category)
    navigate(`/products?page=1&filtered`)
  }
  const handleClick = () => {
    categoriesDispatch({ type: 'SET_CATEGORY', payload: '' })
    navigate(`/products`)
  }

  return (
    <div className={styled.container}>
      <div className={styled.wrapper}>
        <div className={styled.brand}>
          <Link to='/'>
            {loading ? (
              <img
                src='https://user-images.githubusercontent.com/20684618/31289519-9ebdbe1a-aae6-11e7-8f82-bf794fdd9d1a.png'
                alt='placeholder'
              />
            ) : (
              <img src={logo?.image_url} alt={logo.logo?.name} />
            )}
          </Link>
        </div>
        <div className={styled.links}>
          <a href='/products' onClick={handleClick}>
            Productos
          </a>
          <Categories onCategoryChange={handleCategoryChange} />
        </div>
      </div>
    </div>
  )
}

export default Navbar
