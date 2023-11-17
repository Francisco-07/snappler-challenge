import styled from './title.module.css'
const Title = ({ children }) => {
  return (
    <div className={styled.container}>
      <h2>{children}</h2>
    </div>
  )
}
export default Title
