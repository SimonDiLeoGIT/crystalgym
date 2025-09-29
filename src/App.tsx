import { lazy } from "react"
import './styles/global/fonts.css'
import UserProvider from "./context/user"
import { BrowserRouter } from "react-router-dom"

const Router = lazy(() => import("./components/Router/Router"))
const CartProvider = lazy(() => import("./context/cart"))
const OrderProvider = lazy(() => import("./context/order"))

function App() {

  return (
    <UserProvider>
      <OrderProvider>
        <CartProvider>
          <BrowserRouter>
          <Router />
          </BrowserRouter>
        </CartProvider>
      </OrderProvider>
    </UserProvider>
  )
}

export default App
