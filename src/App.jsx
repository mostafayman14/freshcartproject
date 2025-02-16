
import './App.css'
import { createBrowserRouter, createHashRouter, RouterProvider } from 'react-router-dom'
import Layout from './Components/Layout/Layout.jsx'
import Home from './Components/Home/Home.jsx'
import Cart from './Components/Cart/Cart.jsx'
import Categories from './Components/Categories/Categories.jsx'
import Brands from './Components/Brands/Brands.jsx'
import Products from './Components/Products/Products.jsx'
import Login from './Components/Login/Login.jsx'
import Register from './Components/Register/Register.jsx'
import NotFound from './Components/NotFound/NotFound.jsx'
import UserContextProvider, { userContext } from './context/UserContext.jsx'
import { useContext, useEffect } from 'react'
import ProtectedRoute from './Components/ProtectedRoute/ProtectedRoute.jsx'
import Productdetails from './Components/Productdetails/Productdetails.jsx'
import BrandRelated from './Components/BrandRelated/BrandRelated.jsx'
import { store } from './redux/store.js'
import { Provider } from 'react-redux'
import CategoryRelated from './Components/categoryRelated/ProductsRelatedByCategory.jsx'
import ProductsInSpecificCategories from './Components/productsInSpecificCategories/productsInSpecificCategories.jsx'
import CartContextProvider from './context/CartContext.jsx'
import { Toaster } from 'react-hot-toast'
import CheckOut from './Components/CheckOut/CheckOut.jsx'
import AllOrders from './Components/AllOrders/AllOrders.jsx'
import TryingArea from './Components/TryingArea/TryingArea.jsx'
import WishlistContextProvider, { WishlistContext } from './context/WishListContext.jsx'
import Wishlist from './Components/Wishlist/Wishlist.jsx'



let routers = createHashRouter([{
  path: '', element: <Layout />, children: [
    { patk: 'register', element: <Register /> },
    { path: 'login', element: <Login /> },
    { index: true, element: <ProtectedRoute> <Home /> </ProtectedRoute> },
    { path: 'cart', element: <ProtectedRoute> <Cart /> </ProtectedRoute> },
    { path: 'brands', element: <ProtectedRoute> <Brands /> </ProtectedRoute> },
    { path: 'brands/:id', element: <ProtectedRoute> <BrandRelated /> </ProtectedRoute> },
    { path: 'categories', element: <ProtectedRoute> <Categories /> </ProtectedRoute> },
    { path: 'categories/:id', element: <ProtectedRoute> <ProductsInSpecificCategories /> </ProtectedRoute> },
    { path: 'products', element: <ProtectedRoute> <Products /> </ProtectedRoute> },
    { path: 'productdetails/:id', element: <ProtectedRoute> <Productdetails /> </ProtectedRoute> },
    { path: 'checkout', element: <ProtectedRoute> <CheckOut /> </ProtectedRoute> },
    { path: 'allorders', element: <ProtectedRoute> <AllOrders /> </ProtectedRoute> },
    { path: 'wishlist', element: <ProtectedRoute> <Wishlist /> </ProtectedRoute> },
    { path: 'trying', element: <ProtectedRoute> <TryingArea /> </ProtectedRoute> },
    { path: '*', element: <NotFound /> },
  ]
}])
function App() {

  return <>

    <Provider store={store} >
      <WishlistContextProvider>
        <CartContextProvider>
          <UserContextProvider>
            <RouterProvider router={routers}></RouterProvider>
            <Toaster />
          </UserContextProvider>
        </CartContextProvider>
      </WishlistContextProvider>
    </Provider >
  </>
}

export default App
