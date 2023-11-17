import styled from './cardSkeleton.module.css'

const CardSkeleton = ({ skeletonData }) => {
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
        <img src={skeletonData.main_image_link} alt={skeletonData.name} />
      </div>
      <div className={styled.skeletonDataInfo}>
        <div className={styled.skeletonDataName}>
          <h4>{skeletonData.name}</h4>
          <p>
            <strong>${skeletonData.price}</strong>
          </p>
        </div>

        <div className={styled.description}>
          <p>{truncateDescription(skeletonData.description, 15)}</p>
        </div>
        <div className={styled.category}>
          <strong>{skeletonData.category_name}</strong>
        </div>
        <div className={styled.tags}>
          {skeletonData.taginfo?.map((tag) => (
            <div className={styled.tag} key={tag.id}>
              <strong>{tag.name}</strong>
            </div>
          ))}
        </div>
      </div>
      <div to={`#`} className={styled.btnSkeleton}>
        Ver
      </div>
    </div>
  )
}
export default CardSkeleton
