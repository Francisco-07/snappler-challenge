import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import { BrowserRouter } from 'react-router-dom'
import { CategoriesContextProvider } from './context/CategoriesContext'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <CategoriesContextProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </CategoriesContextProvider>
  </React.StrictMode>
)
