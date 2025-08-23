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
            <article className="font-semibold bg-slate-100">
                <header className="p-2 px-4">
                  Categories
                </header>
                <ul className="p-2 px-8 bg-slate-50 shadow-inner shadow-slate-200">
                  <li className="p-1">
                    <Link to="/admin/categories" className="font-semibold text-slate-500 hover:opacity-80">
                      List
                    </Link>
                  </li>
                  <li className="p-1">
                    <Link to="/admin/categories/create" className="font-semibold text-slate-500 hover:opacity-80">
                      Create
                    </Link>
                  </li>
                </ul>
            </article>
          </li>
          <li>
              <article className="font-semibold bg-slate-100">
                <header className="p-2 px-4">
                  Products
                </header>
                <ul className="p-2 px-8 bg-slate-50 shadow-inner shadow-slate-200">
                  <li className="p-1">
                    <Link to="/admin/products" className="font-semibold text-slate-500 hover:opacity-80">
                      List
                    </Link>
                  </li>
                  <li className="p-1">
                    <Link to="/admin/products/create" className="font-semibold text-slate-500 hover:opacity-80">
                      Create
                    </Link>
                  </li>
                </ul>
              </article>
          </li>
        </ul>
      </section>
    </nav>
  )
}

export default AdminNavbar