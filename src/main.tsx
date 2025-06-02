import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import { router } from './App'

import { ToastContainer } from "react-toastify";

import CartProvider from './context/CartIndex'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    
    <CartProvider>

   <RouterProvider router = {router}/>

<ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />

    </CartProvider>

  </StrictMode>,
)
