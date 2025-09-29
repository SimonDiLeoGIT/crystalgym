import { Route, Routes, useLocation } from "react-router-dom"
import { lazy, Suspense } from "react"
import Dashboard from "../../pages/admin/Dashboard"
import Categories from "../../pages/admin/Category/Categories"
import CategoryCreate from "../../pages/admin/Category/CategoryCreate"
import CategoryUpdate from "../../pages/admin/Category/CategoryUpdate"
import Products from "../../pages/admin/Products/Products"
import {Navbar as AdminNavbar} from "../../pages/admin/Components/Navbar"
import {Create as ProductsCreate} from "../../pages/admin/Products/Create"
import {Update as ProductsUpdate} from "../../pages/admin/Products/Update"

const Home = lazy(() => import("../../pages/Home"))
const Women = lazy(() => import("../../pages/Women"))
const Men = lazy(() => import("../../pages/Men"))
const Accessories = lazy(() => import("../../pages/Accessories"))
const NewsProducts = lazy(() => import("../../pages/NewsProducts"))
const Accessory = lazy(() => import("../../pages/Accessory"))
const Product = lazy(() => import("../../pages/Product"))
const Category = lazy(() => import("../../pages/Category"))
const Profile = lazy(() => import("../../pages/Profile"))
const TerminosCondiciones = lazy(() => import("../../pages/TerminosCondiciones"))
const Navbar = lazy(() => import("../Navbar/Navbar"))
const Footer = lazy(() => import("../Footer/Footer"))
const Register = lazy(() => import("../../pages/Register"))
const Login = lazy(() => import("../../pages/Login"))
const Clothes = lazy(() => import ("../../pages/Clothes"))
// const AdminClothes = lazy(() => import("../../pages/admin/Clothes/AdminClothes"))

const Router = () => {

  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith("/dashboard")

  return (
    // <BrowserRouter>
    <Suspense fallback={<h3>Loading...</h3>}>
        {!isAdminRoute && (
        <header className="h-20">
          <Navbar />
        </header>
      )}

      {isAdminRoute && <AdminNavbar />}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/men" element={<Men />} />
          <Route path="/women" element={<Women />} />
          <Route path="/accessories" element={<Accessories />} />
          <Route path="/:type/all" element={<NewsProducts />} />
          <Route path="/accessories/:category" element={<Accessory />} />
          <Route path="/:sex/:category" element={<Category />} />
          <Route path="/:type/news/gym-clothes" element={<NewsProducts />} />
          <Route path="/:type" element={<NewsProducts />} />
          <Route path="/product/:id/:colorId" element={<Product />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/category/:catogoryId/clothes" element={<Clothes />} />
          <Route path="/terms&conditions" element={<TerminosCondiciones />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/dashboard/categories" element={<Categories />} />
          <Route path="/dashboard/categories/create" element={<CategoryCreate />} />
          <Route path="/dashboard/categories/edit/:categoryId" element={<CategoryUpdate />} />
          <Route path="/dashboard/products" element={<Products />} />
          <Route path="/dashboard/products/create" element={<ProductsCreate />} />
          <Route path="/dashboard/products/edit/:productId" element={<ProductsUpdate />} />
        </Routes>
        {
          !isAdminRoute &&
          <Footer />
        }
    </Suspense>
      // </BrowserRouter>
  )
}

export default Router