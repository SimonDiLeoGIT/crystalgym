import { useAuth0 } from "@auth0/auth0-react";
import Login from "../Login";
import { ReactNode } from "react";

const AdminLayout = ({children}: {children: ReactNode}) => {

  const { isAuthenticated, isLoading} = useAuth0();

  if (isLoading) {
    return <div className="h-screen">Loading...</div>;
  }
  
  if (!isAuthenticated) {
    return <Login />;
  }

  return (
    <main className="max-w-screen ml-[18%] p-2">
      {children}
    </main>
  );
}

export default AdminLayout