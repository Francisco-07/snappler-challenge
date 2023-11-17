import styled from './pagination.module.css'

const Pagination = ({ currentPage, totalPages, onNextPage, onPrevPage }) => {
  return (
    <div className={styled.container}>
      <button
        onClick={onPrevPage}
        disabled={currentPage === 1}
        className={styled.pagBtn}
      >
        &lt;
      </button>
      <span>{`Pagina ${currentPage} de ${totalPages}`}</span>
      <button
        onClick={onNextPage}
        disabled={currentPage === totalPages}
        className={styled.pagBtn}
      >
        &gt;
      </button>
    </div>
  )
}

export default Pagination
