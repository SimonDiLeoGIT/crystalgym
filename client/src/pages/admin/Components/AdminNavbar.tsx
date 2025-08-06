const AdminNavbar = () => {
  return (
    <nav className="fixed top-0 left-0 h-screen z-10 border-r -border--color-very-light-grey shadow-md -shadow--color-greyest-violet w-[18%] px-2">
      <section>
        <header>MANAGEMENT</header>
        <ul>
          <li>
            <details>
              <summary>Categories</summary>
              <ul>
                <li>Category List</li>
                <li>Create Category</li>
                <li>Update Category</li>
                <li>Category Details</li>
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