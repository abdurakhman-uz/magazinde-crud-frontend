import { Button, Modal } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { ExclamationCircleFilled } from "@ant-design/icons";
import "./Navbar.css";
import { useContext } from "react";
import { AuthContext } from "../../Context/authContext";
const { confirm } = Modal;

function Navbar() {
  const navigate = useNavigate();
  const {token, setToken} = useContext(AuthContext)
  const showExitConfirm = () => {
    confirm({
      title: "Are you sure to exit?",
      icon: <ExclamationCircleFilled />,
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk() {
        setToken(null)
        navigate("/");
      },
      onCancel() {
        console.log("Cencelled");
      },
    });
  };

  return (
    <>
      <div>
        {token ? (
          <div>
            <div className={`navbarLinks ${token ? "admin" : ""} `}>
              <Link to="/" className="link linkHome">
                {/* Home */}
              </Link>
              <Link to="/my_products" className="link linkProducts">
                {/* Products */}
              </Link>
              {token ? (
                <Link to="/add" className="link linkAdd">
                  {/* Add */}
                </Link>
              ) : null}
            </div>
            {token ? (
              <Button className="logout" onClick={showExitConfirm}>
                Logout
              </Button>
            ) : null}
          </div>
        ) : (
          <div className="navbarLinksUser">
            <Link to="/" className="link linkHome">
              {/* Home */}
            </Link>
            <Link to="/auth" className="link linkLogin">
              {/* Products */}
            </Link>
          </div>
        )}

        <span className="navLine"></span>
      </div>
    </>
  );
}

export default Navbar;
