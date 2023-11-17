import styled from './products.module.css'
import React, { useState, useEffect, useContext } from 'react'
import { fetchProducts } from '../../api/api'
import Pagination from '../pagination/Pagination'
import { useNavigate } from 'react-router-dom'
import Card from '../card/Card'
import ProductsSkeleton from '../../skeleton/productsSkeleton/ProductsSkeleton'
import CategoriesContext from '../../context/CategoriesContext'

const Products = () => {
  let navigate = useNavigate()
  const [category, dispatch] = useContext(CategoriesContext)

  const [productsData, setProductsData] = useState([])
  const [loading, setLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(0)
  const [nameFilter, setNameFilter] = useState('')
  const [alfOrder, setAlfOrder] = useState('')
  const [priceOrder, setPriceOrder] = useState('')

  useEffect(() => {
    fetchProducts(currentPage, category, nameFilter, alfOrder, priceOrder)
      .then((data) => {
        setProductsData(data.products)
        setTotalPages(data.total_pages)
        setLoading(false)
      })
      .catch((error) => {
        console.error('Error:', error)
        setLoading(false)
      })
  }, [currentPage, navigate, category, nameFilter, alfOrder, priceOrder])

  const handleNextPage = () => {
    const nextPage = currentPage + 1
    setCurrentPage(nextPage)
    if (category || nameFilter || alfOrder || priceOrder) {
      navigate(`/products?page=${nextPage}&filtered`)
    } else {
      navigate(`/products?page=${nextPage}`)
    }
  }

  const handlePrevPage = () => {
    const prevPage = currentPage - 1
    setCurrentPage(prevPage)
    if (category || nameFilter || alfOrder || priceOrder) {
      navigate(`/products?page=${prevPage}&filtered`)
    } else {
      navigate(`/products?page=${prevPage}`)
    }
  }

  const handleNameFilterChange = (filter) => {
    setNameFilter(filter)
    dispatch({ type: 'SET_CATEGORY', payload: '' })
    setAlfOrder('')
    setPriceOrder('')
    setCurrentPage(1)
    navigate(`/products?page=1&filtered`)
  }

  const handleAlfOrderChange = (order) => {
    setAlfOrder(order)
    setNameFilter('')
    dispatch({ type: 'SET_CATEGORY', payload: '' })
    setPriceOrder('')
    setCurrentPage(1)
    navigate(`/products?page=1&filtered`)
  }

  const handlePriceOrderChange = (order) => {
    setPriceOrder(order)
    setAlfOrder('')
    setNameFilter('')
    dispatch({ type: 'SET_CATEGORY', payload: '' })
    setCurrentPage(1)
    navigate(`/products?page=1&filtered`)
  }

  return (
    <>
      <div className={styled.filtersContainer}>
        <div className={styled.filters}>
          <input
            type='text'
            placeholder='filtrar por nombre'
            value={nameFilter}
            onChange={(e) => handleNameFilterChange(e.target.value)}
          />
          <button onClick={() => handleAlfOrderChange('asc')}>
            Ordenar A-Z
          </button>
          <button onClick={() => handleAlfOrderChange('desc')}>
            Ordenar Z-A
          </button>

          <button onClick={() => handlePriceOrderChange('asc')}>
            Mas barato
          </button>
          <button onClick={() => handlePriceOrderChange('desc')}>
            Mas caro
          </button>
        </div>
      </div>
      <div className='container-g'>
        <div className='wrapper-g-c'>
          <div className={styled.container}>
            {loading ? (
              <ProductsSkeleton />
            ) : productsData.length > 0 ? (
              productsData.map((product) => (
                <Card product={product} key={product.id} />
              ))
            ) : (
              <div className={styled.empty}>
                <h2>No se encontro ningun producto :(</h2>
              </div>
            )}
          </div>
          <Pagination
            onNextPage={handleNextPage}
            onPrevPage={handlePrevPage}
            totalPages={totalPages}
            currentPage={currentPage}
          />
        </div>
      </div>
    </>
  )
}
export default Products
