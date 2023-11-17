import { createContext, useReducer } from 'react'

const categoriesReducer = (state, action) => {
  switch (action.type) {
    case 'SET_CATEGORY':
      return action.payload
    default:
      return state
  }
}
const CategoriesContext = createContext()

export const CategoriesContextProvider = (props) => {
  const [categories, categoriesDispatch] = useReducer(categoriesReducer, [])

  return (
    <CategoriesContext.Provider value={[categories, categoriesDispatch]}>
      {props.children}
    </CategoriesContext.Provider>
  )
}

export default CategoriesContext
