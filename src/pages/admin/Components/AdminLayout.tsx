import { useAuth0 } from "@auth0/auth0-react";
import Login from "../../Login";
import { ReactNode } from "react";
import { Link } from "react-router-dom";
import { MoonLoader } from "react-spinners";

const AdminLayout = ({children, title, head}: {children: ReactNode,title: string, head: ReactNode}) => {

  const { user, isLoading, isAuthenticated, logout } = useAuth0()



  
  if (!isLoading && !isAuthenticated) {
    return <Login />;
  }

  return (
    <main className="max-w-screen ml-[18%]">
      <header className="p-4 w-11/12 m-auto">
        <nav className="">
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
        <section className="w-5/6 m-auto py-4">
          <h1 className="font-bold text-2xl py-2">{title}</h1>
          <p className="text-slate-600 font-semibold py-2">
            <Link to="/dashboard">Dashboard</Link> · 
            {head}
          </p>
        </section>
      </header>
      {children}
    </main>
  );
}

export default AdminLayout