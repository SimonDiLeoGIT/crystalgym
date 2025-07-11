import { lazy, useEffect, useState } from "react";
import { Orders } from "../components/Orders/Orders"
import { useUser } from "../hook/useUser";
import { UserDataInterface } from "../interfaces/UserInterface";

import { useAuth0 } from "@auth0/auth0-react"


const Login = lazy(() => import("./Login"))

export const Profile = () => {
  // const [user, setUser] = useState<UserDataInterface | null>(null);
  // const [loading, setLoading] = useState(true);
  
  // const { getUser } = useUser();

  const { isAuthenticated, user, isLoading } = useAuth0();

  useEffect(() => {
    document.title = "Profile | CrystalGym";
  }, []);
  
  // useEffect(() => {
  //   const fetchUser = async () => {
  //     const fetchedUser = await getUser();
  //     // setUser(fetchedUser);
  //     setLoading(false);
  //   };

  //   fetchUser();
  // }, [ getUser ]);

  if (isLoading) {
    return <div className="h-screen">Loading...</div>;
  }

  if (!isAuthenticated) {
    return <Login />;
  }

  return (
    <section className="p-2 -text--color-black max-w-md m-auto md:max-w-7xl lg:w-11/12 lg:m-auto xl:9/12">
      <article className="w-full">
        <h1 className="font-bold text-lg md:text-3xl my-4">
          Hello {user?.name}
        </h1>
      </article>
      <section className="w-full my-4">
        <h1 className="font-bold md:text-xl">
          Your Orders
        </h1>
        <Orders />
      </section>
    </section>
  )
}

export default Profile;