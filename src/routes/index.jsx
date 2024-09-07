import React from 'react'
import { Route, Routes } from 'react-router-dom'
import UsersPage from '../pages/UsersPage.JSX'
import CarsPage from '../pages/CarsPage'
import ProductPage from '../pages/ProductsPage'

function CustomRouter() {
  return (
    <Routes>
        <Route path='/' element={<UsersPage/>}/>
        <Route path='/car' element={<CarsPage/>}/>
        <Route path='/products' element={<ProductPage/>}/>
    </Routes>
  )
}

export default CustomRouter