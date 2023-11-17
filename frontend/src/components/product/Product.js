import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { fetchSingleProduct } from '../../api/api'
import styled from './product.module.css'

const Product = () => {
  const { id } = useParams()

  const [product, setProduct] = useState({})
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    fetchSingleProduct(id)
      .then((data) => {
        setProduct(data.product)
        setLoading(false)
      })
      .catch((error) => {
        console.error('Error:', error)
      })
  }, [id])
  return (
    <>
      {loading ? (
        <div> loading</div>
      ) : (
        <div className='container-g'>
          <div className='wrapper-g-c'>
            <div className={styled.container}>
              <div className={styled.images}>
                <div className={styled.mainImg}>
                  <img src={product?.main_image_link} alt={product?.name} />
                </div>
                <div className={styled.secondaryImgs}>
                  {product.image_links?.map((link, i) => (
                    <img src={link} alt={product?.name} key={i} />
                  ))}
                </div>
              </div>
              <div className={styled.info}>
                <h3>{product?.name}</h3>
                <p>{product?.description}</p>
                <h4 className={styled.category}>{product?.category_name}</h4>
                <div className={styled.tags}>
                  {product.taginfo.name.map((tag, i) => (
                    <div className={styled.tag} key={i}>
                      {tag}
                    </div>
                  ))}
                </div>
                <strong>${product?.price}</strong>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
export default Product
