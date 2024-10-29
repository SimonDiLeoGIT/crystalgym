import { BrowserRouter, Route, Routes } from "react-router-dom"
import { lazy, Suspense } from "react"

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
const Register = lazy(() => import("../../pages/Register"))
const Login = lazy(() => import("../../pages/Login"))
const PostNewClothe = lazy(() => import("../../pages/admin/PostNewClothe/PostNewClothe"))
const ClotheCategories = lazy(() => import("../../pages/admin/ClotheCategories/ClotheCategories"))
const Clothes = lazy(() => import ("../../pages/Clothes"))
// const AdminClothes = lazy(() => import("../../pages/admin/Clothes/AdminClothes"))
const Footer = lazy(() => import("../Footer/Footer"))

const Router = () => {
  return (
    <Suspense fallback={<h3>Loading...</h3>}>
      <BrowserRouter>
        <header className="h-20">
          <Navbar />
        </header>
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
          <Route path="/category/:id_category/clothes" element={<Clothes />} />
          <Route path="/terms&conditions" element={<TerminosCondiciones />} />
          <Route path="/admin/clothe-form" element={<PostNewClothe />} />
          <Route path="/admin/categories" element={<ClotheCategories />} />
          {/* <Route path="/admin/categories/:categoryId" element={<AdminClothes />} /> */}
        </Routes>
        <Footer />
      </BrowserRouter>
    </Suspense>
  )
}

export default Router