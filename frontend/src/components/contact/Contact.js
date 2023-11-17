import styled from './contact.module.css'

const Contact = () => {
  const handleSubmit = (e) => {
    e.preventDefault()
  }

  return (
    <div className='container-g'>
      <div className='wrapper-g-c'>
        <form onSubmit={handleSubmit} className={styled.container}>
          <div className={styled.input}>
            <label>Nombre</label>
            <input type='text' name='name' />
          </div>
          <div className={styled.input}>
            <label>Email</label>
            <input type='email' name='email' />
          </div>
          <div className={styled.input}>
            <label>Mensaje</label>
            <textarea name='message' />
          </div>
          <div>
            <button className={styled.button} type='submit'>
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Contact
