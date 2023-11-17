import styled from './footer.module.css'
import {
  AiOutlineInstagram,
  AiOutlineFacebook,
  AiOutlineTwitter,
  AiOutlineLinkedin,
} from 'react-icons/ai'
import Contact from '../contact/Contact'
import Title from '../title/Title'

const Footer = () => {
  return (
    <div className={styled.container}>
      <Title>Contacto</Title>
      <Contact />
      <div className={styled.social}>
        <div className={styled.icon}>
          <AiOutlineInstagram />
        </div>
        <div className={styled.icon}>
          <AiOutlineTwitter />
        </div>
        <div className={styled.icon}>
          <AiOutlineLinkedin />
        </div>
        <div className={styled.icon}>
          <AiOutlineFacebook />
        </div>
      </div>
    </div>
  )
}
export default Footer
