import styled from './slider.module.css'
import { useState, useEffect } from 'react'
import { AiOutlineArrowLeft, AiOutlineArrowRight } from 'react-icons/ai'
import { fetchFavorite } from '../../api/api'
import Title from '../title/Title'

const Slider = () => {
  const [slideIndex, setSlideIndex] = useState(0)
  const [favorite, setFavorite] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchFavorite()
      .then((data) => {
        setFavorite(data)
        setLoading(false)
      })
      .catch((error) => {
        console.error('Error:', error)
        setLoading(false)
      })
  }, [])

  const handleClick = (direction) => {
    if (direction === 'left') {
      setSlideIndex(
        slideIndex > 0
          ? slideIndex - 1
          : favorite.images
          ? favorite.images.length - 1
          : 0
      )
    } else {
      setSlideIndex(
        slideIndex < (favorite.images ? favorite.images.length : 0) - 1
          ? slideIndex + 1
          : 0
      )
    }
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      if (slideIndex >= (favorite.images ? favorite.images.length : 0) - 1) {
        setSlideIndex(0)
      } else {
        setSlideIndex(slideIndex + 1)
      }
    }, 2000)
    return () => clearTimeout(timer)
  }, [slideIndex, favorite.images])

  return (
    <>
      <div className={styled.container}>
        <Title>Nuevos Productos</Title>
        <div className={styled.wrapper}>
          <div
            direction='left'
            onClick={() => handleClick('left')}
            style={{ left: '10px' }}
            className={styled.arrow}
          >
            <AiOutlineArrowLeft />
          </div>
          <div
            style={{ transform: `translateX(${slideIndex * -100}vw)` }}
            className={styled.content}
          >
            {loading ? (
              <div className={styled.slide}>
                <div className={styled.slideContainer}>
                  <img
                    src='https://user-images.githubusercontent.com/20684618/31289519-9ebdbe1a-aae6-11e7-8f82-bf794fdd9d1a.png'
                    alt='placeholder'
                  />
                </div>
              </div>
            ) : (
              favorite.images?.map((image, i) => (
                <div key={i} className={styled.slide}>
                  <div className={styled.slideContainer}>
                    <img src={image} alt={`${i}`} />
                  </div>
                </div>
              ))
            )}
          </div>
          <div
            direction='right'
            onClick={() => handleClick('right')}
            style={{ right: '10px' }}
            className={styled.arrow}
          >
            <AiOutlineArrowRight />
          </div>
        </div>
      </div>
    </>
  )
}

export default Slider
