import { useAuth0 } from "@auth0/auth0-react";
import Login from "../Login";
import { ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";
import { MoonLoader } from "react-spinners";

const AdminLayout = ({children, head}: {children: ReactNode, head: ReactNode}) => {

  const { user, isLoading, isAuthenticated, logout } = useAuth0()

  const location = useLocation();

  // get pathname parts (filter removes empty strings)
  const parts = location.pathname.split("/").filter(Boolean);

  
  if (!isLoading && !isAuthenticated) {
    return <Login />;
  }

  return (
    <main className="max-w-screen ml-[18%]">
      <header className="w-4/6 m-auto">
        <nav className="py-6">
          <ul className="flex justify-end gap-6">
            <li className="flex items-center">
              <button className="w-6 h-6">
                <span className="hidden">settings</span>
                <img src="https://img.icons8.com/ios-glyphs/30/000000/settings.png" alt="settings icon" />
              </button>
            </li>
            <li>
              {
                isLoading ? (
                  <div className="w-10 h-10 -bg--color-very-light-grey rounded-full flex items-center justify-center">
                    <MoonLoader
                      color="white" 
                      size={20}
                      
                    />
                  </div>
                ) : (
                  <Link to="/profile" className="block rounded-full overflow-hidden w-10 h-10">
                    <img src={user?.picture} alt={user?.name} />
                  </Link> 
                )
              }
            </li>
          </ul>
        </nav>
        <section className="my-4">
          <p className="text-slate-600 font-semibold">
            <Link to="/admin">Dashboard</Link> · 
            {head}
          </p>
        </section>
      </header>
      {children}
    </main>
  );
}

export default AdminLayout