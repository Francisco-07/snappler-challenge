import { fetchRandom } from '../../api/api'
import React, { useState, useEffect } from 'react'
import Card from '../card/Card'
import styled from './random.module.css'
import Title from '../title/Title'
import RandomSkeleton from '../../skeleton/randomSkeleton/RandomSkeleton'

const Random = () => {
  const [productsData, setProductsData] = useState([])
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    fetchRandom()
      .then((data) => {
        setProductsData(data)
        setLoading(false)
      })
      .catch((error) => {
        console.error('Error:', error)
        setLoading(false)
      })
  }, [])
  return (
    <>
      <div className='container-g'>
        <div className='wrapper-g-c'>
          <Title>Mas Vendidos</Title>
          <div className={styled.container}>
            {loading ? (
              <RandomSkeleton />
            ) : (
              productsData.products?.map((product) => (
                <Card product={product} key={product.id} />
              ))
            )}
          </div>
        </div>
      </div>
    </>
  )
}
export default Random
