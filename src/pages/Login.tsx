import { useEffect } from "react";
import logo from '/CrystalGymLogo.png'
import '../styles/form.css'
import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

const Login = () => {
  
  useEffect(() => {
    document.title = "Login | CrystalGym";
  })

  const { loginWithRedirect } = useAuth0();


  return (
    <section className="fixed top-0 left-0 w-screen h-screen -bg--color-white z-50 flex overflow-hidden">
      <section
        className="form flex flex-col gap-4 border -border--color-very-light-grey rounded-lg w-10/12 max-w-lg m-auto shadow-lg -shadow--color-very-light-grey p-4 pb-10 "
      >
        <figure className="m-auto">
          <image>
            <Link to="/" className=""><img src={logo} alt="Crystal Gym Logo" width={60} className="logo"/></Link>
          </image>
          <figcaption>
            <span className="hidden">Crystal Gym Logo</span>
          </figcaption>
        </figure>
        
        <button 
          onClick={() => loginWithRedirect()}
          className="w-9/12 m-auto p-2 -bg--color-black -text--color-light-grey-violet font-semibold rounded-lg hover:opacity-90 hover:scale-105 transition-transform duration-150"
        >
          Login
        </button>
      </section>
    </section>
  )

}

export default Login