import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom"
import { lazy, Suspense } from "react"
import AdminHome from "../../pages/admin/AdminHome"
import AdminNavbar from "../../pages/admin/Components/AdminNavbar"
import Products from "../../pages/admin/Products/Products"
import AdminCategories from "../../pages/admin/Category/AdminCategories"
import AdminCategoryCreate from "../../pages/admin/Category/AdminCategoryCreate"
import AdminCategoryUpdate from "../../pages/admin/Category/AdminCategoryUpdate"

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
const ClotheCategories = lazy(() => import("../../pages/admin/ClotheCategories/ClotheCategories"))
const Clothes = lazy(() => import ("../../pages/Clothes"))
// const AdminClothes = lazy(() => import("../../pages/admin/Clothes/AdminClothes"))

const Router = () => {

  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith("/admin")

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
          <Route path="/admin" element={<AdminHome />} />
          <Route path="/admin/products" element={<Products />} />
          <Route path="/admin/categories" element={<AdminCategories />} />
          <Route path="/admin/categories/create" element={<AdminCategoryCreate />} />
          <Route path="/admin/categories/edit/:categoryId" element={<AdminCategoryUpdate />} />
          {/* <Route path="/admin/categories/:categoryId" element={<AdminClothes />} /> */}
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