import { Link, Outlet } from "react-router-dom";
import "../../global.css"

function AllUser() {


  return (
    <>
      <div className="nestedLinks">
        <Link className="nestedLink userLogin" to="/auth/login">
          Login
        </Link>
        <span>|</span>
        <Link className="nestedLink userRegister" to="/auth/register">
          Register
        </Link>
      </div>
      <Outlet/>
    </>
  );
}

export default AllUser;