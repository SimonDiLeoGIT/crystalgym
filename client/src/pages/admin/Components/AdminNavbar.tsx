import { Link } from "react-router-dom"

const AdminNavbar = () => {
  return (
    <nav className="fixed top-0 left-0 h-screen z-10 border-r -border--color-very-light-grey shadow-md -shadow--color-greyest-violet w-[18%]">
      <section>
        <header>
          <h2 className="text-violet-900/60 font-bold p-4">
            MANAGEMENT
          </h2>
        </header>
        <ul className="text-slate-600">
          <li className="">
            <details className="">
              <summary className="font-semibold p-2 px-4 bg-slate-100 list-none hover:opacity-80 hover:cursor-pointer">Categories</summary>
              <ul className="p-2 px-8 bg-slate-50 shadow-inner shadow-slate-200">
                <li className="p-1">
                  <Link to="/admin/categories" className="font-semibold text-slate-500 hover:opacity-60">
                    List
                  </Link>
                </li>
                <li className="p-1">
                  <Link to="/admin/categories/create" className="font-semibold text-slate-500 hover:opacity-60">
                    Create
                  </Link>
                </li>
              </ul>
            </details>
          </li>
          <li>
            <details>
              <summary className="font-semibold p-2 px-4 bg-slate-100 list-none hover:opacity-80 hover:cursor-pointer">Products</summary>
              <ul className="p-2 px-4 bg-slate-50 shadow-inner shadow-slate-200">
                <li>Product List</li>
                <li>Create Product</li>
                <li>Update Product</li>
                <li>Product Details</li>
              </ul>
            </details>
          </li>
        </ul>
      </section>
    </nav>
  )
}

export default AdminNavbar