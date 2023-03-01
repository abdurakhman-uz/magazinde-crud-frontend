import { Link, Outlet } from "react-router-dom";
import "../../global.css"

function Add() {


  return (
    <>
      <div className="nestedLinks">
        <Link className="nestedLink productAdd" to="/add/addProduct">
          Add Product
        </Link>
        {/* <span>|</span>
        <Link className="nestedLink userAdd" to="/add/addUser">
          Add User
        </Link> */}
      </div>
      <Outlet/>
    </>
  );
}

export default Add;
