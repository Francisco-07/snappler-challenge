import { Route, Routes } from 'react-router-dom'
import Navbar from './components/navbar/Navbar'
import Footer from './components/footer/Footer'
import HomePage from './pages/home/HomePage'
import ProductsPage from './pages/products/ProductsPage'
import ProductPage from './pages/product/ProductPage'

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/products' element={<ProductsPage />} />
        <Route path='/products/:id' element={<ProductPage />} />
      </Routes>
      <Footer />
    </>
  )
}

export default App
