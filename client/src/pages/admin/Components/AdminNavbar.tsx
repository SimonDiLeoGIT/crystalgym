import { Link } from "react-router-dom"

const AdminNavbar = () => {
  return (
    <nav className="fixed top-0 left-0 h-screen z-10 border-r -border--color-very-light-grey shadow-md -shadow--color-greyest-violet w-[18%]">
      <section>
        <header>MANAGEMENT</header>
        <ul>
          <li className="">
            <details className="px-2">
              <summary className="px-2 hover:-text--color-very-light-grey hover:cursor-pointer">Categories</summary>
              <ul className="px-4">
                <li className="px-2">
                  <Link to="/admin/categories">
                    Category List
                  </Link>
                </li>
                <li className="px-2">
                  <Link to="/admin/categories/create">
                    Create Category
                  </Link>
                </li>
              </ul>
            </details>
          </li>
          <li>
            <details>
              <summary>Products</summary>
              <ul>
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