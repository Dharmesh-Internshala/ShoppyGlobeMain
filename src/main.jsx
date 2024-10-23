import { StrictMode } from 'react'
import { lazy, Suspense} from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {createBrowserRouter, RouterProvider} from "react-router-dom"
import {Provider} from "react-redux"
import store from './redux/store.js'
import Error from './component/Error.jsx'
import RegisterForm from './component/Register.jsx'
import LoginForm from './component/Login.jsx'


const HomePage = lazy(()=> import("./component/HomePage.jsx"))

const ProductDetails = lazy(()=> import("./component/ProductDetails.jsx"))

const ShoppingCart = lazy(()=> import("./component/ShoopingCart.jsx"))

const CategoriesProduct = lazy(()=> import("./component/CategoriesProduct.jsx"))

const approuter = createBrowserRouter([
  {
    path : "/",
    element : <App/>,
    errorElement: <Error/>,
    children : [
      {
        path: "/",
        element :<Suspense fallback= {<div>Loading...</div>}>
          <HomePage/>
        </Suspense> 
      },

      {
        path: "/productdetails/:id",
        element : <Suspense fallback={<div>Loading....</div>}>
                  <ProductDetails/>
                  </Suspense>
      },
      {
        path : "/ShoppingCart",
        element :<Suspense fallback={<div>Loading....</div>}>
                <ShoppingCart/>
                </Suspense>
      },
      {
        path : "/CategoriesProducts",
        element : <Suspense fallback={<div>Loading....</div>}>
                  <CategoriesProduct/>
                  </Suspense>
      },
      {
        path : "/api/register",
        element : <RegisterForm/>
      },
      {
        path : "/api/Login",
        element : <LoginForm/>
      }
    ]
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store = {store}>
    <RouterProvider router={approuter}/>
    </Provider>
  </StrictMode>,
)
