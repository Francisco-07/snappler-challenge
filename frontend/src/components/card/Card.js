import styled from './card.module.css'
import { Link } from 'react-router-dom'

const Card = ({ product }) => {
  const truncateDescription = (text, limit) => {
    const words = text.split(' ')
    if (words.length > limit) {
      return words.slice(0, limit).join(' ') + '...'
    }
    return text
  }
  return (
    <div className={styled.container}>
      <div className={styled.imgContainer}>
        <img src={product.main_image_link} alt={product.name} />
      </div>
      <div className={styled.productInfo}>
        <div className={styled.productName}>
          <h4>{product.name}</h4>
          <p>
            <strong>${product.price}</strong>
          </p>
        </div>

        <div className={styled.description}>
          <p>{truncateDescription(product.description, 15)}</p>
        </div>
        <div className={styled.category}>
          <strong>{product.category_name}</strong>
        </div>
        <div className={styled.tags}>
          {product.taginfo?.map((tag) => (
            <div className={styled.tag} key={tag.id}>
              <strong>{tag.name}</strong>
            </div>
          ))}
        </div>
      </div>
      <Link to={`/products/${product.id}`} className='btn-show'>
        Ver
      </Link>
    </div>
  )
}
export default Card
